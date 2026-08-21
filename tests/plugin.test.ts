import { afterEach, describe, expect, it, vi } from 'vitest'

import { apply, inject } from '../src/client/index.js'
import { dictionaries, SETTINGS_LOCALE_NS } from '../src/client/locales.js'

interface Registration {
  options: Record<string, unknown>
  component: unknown
}

function applyHarness() {
  let dynamicDependencies: readonly string[] | undefined
  let dynamicMount: ((scope: unknown) => void) | undefined
  let settingsMount: (() => () => void) | undefined
  const effectCleanups: Array<() => void> = []
  const registrations: Registration[] = []
  const localeDisposer = vi.fn()
  const registerDisposer = vi.fn()
  const locale = {
    register: vi.fn((namespace: string) => {
      if (namespace === 'model') throw new Error('must never register the official model locale')
      return localeDisposer
    }),
    bind: vi.fn((namespace: string) => (key: string) => `${namespace}:${key}`),
  }
  const slots = {
    inject: vi.fn((name: string, mount: () => () => void) => {
      if (name === 'settings.section') settingsMount = mount
      return vi.fn()
    }),
    register: vi.fn((options: Record<string, unknown>, component: unknown) => {
      registrations.push({ options, component })
      return registerDisposer
    }),
  }
  const context = {
    locale,
    slots,
    effect: vi.fn((setup: () => void | (() => void)) => {
      const cleanup = setup()
      if (typeof cleanup === 'function') effectCleanups.push(cleanup)
      return vi.fn()
    }),
    inject: vi.fn((dependencies: readonly string[], mount: (scope: unknown) => void) => {
      dynamicDependencies = dependencies
      dynamicMount = mount
    }),
  }

  apply(context as never)

  return {
    context,
    dynamicDependencies: () => dynamicDependencies,
    dynamicMount: () => dynamicMount,
    settingsMount: () => settingsMount,
    registrations,
    localeDisposer,
    registerDisposer,
    dispose: () => {
      for (const cleanup of effectCleanups.reverse()) cleanup()
    },
  }
}

afterEach(() => window.localStorage.clear())

describe('DSH client registration', () => {
  it('registers one settings locale and section, never model locale, and mounts priority -1', async () => {
    const harness = applyHarness()
    expect(inject).toEqual(['slots', 'sessions', 'locale'])
    expect(harness.context.locale.register).toHaveBeenCalledExactlyOnceWith(
      SETTINGS_LOCALE_NS,
      dictionaries,
    )
    expect(harness.context.locale.register).not.toHaveBeenCalledWith(
      'model',
      expect.anything(),
    )
    expect(harness.dynamicDependencies()).toEqual(['modelDirectories'])
    expect(harness.context.slots.inject).toHaveBeenCalledTimes(2)
    expect(harness.context.slots.inject).toHaveBeenCalledWith(
      'settings.section',
      expect.any(Function),
    )
    expect(harness.context.slots.inject).toHaveBeenCalledWith(
      'chat.input.model',
      expect.any(Function),
    )

    const settingsDisposer = harness.settingsMount()?.()
    expect(settingsDisposer).toBe(harness.registerDisposer)
    const settingsRegistration = harness.registrations[0]
    expect(settingsRegistration?.options).toMatchObject({
      name: 'settings.section',
      id: 'model-selection-collapsible',
      order: 30,
      locale: SETTINGS_LOCALE_NS,
    })
    expect(typeof settingsRegistration?.component).toBe('function')
    expect(
      (settingsRegistration?.options.label as (() => string) | undefined)?.(),
    ).toBe(`${SETTINGS_LOCALE_NS}:nav`)
    const settingsInjected = (
      settingsRegistration?.options.inject as (() => { preferences: unknown }) | undefined
    )?.()
    expect(settingsInjected?.preferences).toBeDefined()

    const load = vi.fn(async () => ({ current: null, groups: [], failures: [] }))
    const select = vi.fn(async () => undefined)
    const directory = {
      store: {
        subscribe: () => () => undefined,
        getSnapshot: () => ({}),
        set: () => undefined,
        update: () => undefined,
      },
      load,
      select,
    }
    const directoryFor = vi.fn(() => directory)
    let slotMount: (() => () => void) | undefined
    let modelRegistration: Registration | undefined
    const modelRegisterDisposer = vi.fn()
    const scope = {
      modelDirectories: { directoryFor },
      sessions: { subagentAddress: vi.fn(() => undefined) },
      slots: {
        inject: vi.fn((name: string, mount: () => () => void) => {
          expect(name).toBe('conversation.input.model')
          slotMount = mount
          return vi.fn()
        }),
        register: vi.fn((options: Record<string, unknown>, component: unknown) => {
          modelRegistration = { options, component }
          return modelRegisterDisposer
        }),
      },
    }

    harness.dynamicMount()?.(scope)
    expect(scope.slots.register).not.toHaveBeenCalled()
    expect(slotMount?.()).toBe(modelRegisterDisposer)
    expect(modelRegistration?.options).toMatchObject({
      name: 'conversation.input.model',
      locale: 'model',
      priority: -1,
    })
    expect(typeof modelRegistration?.component).toBe('function')

    const adapter = (modelRegistration?.options.inject as (sessionId: string) => {
      available: boolean
      preferences: unknown
      load: () => void
      select: (selection: { provider: string; model: string }) => Promise<boolean>
    })('session-1')
    expect(adapter.preferences).toBe(settingsInjected?.preferences)
    expect(directoryFor).toHaveBeenCalledWith('session-1')
    expect(adapter.available).toBe(true)
    adapter.load()
    await Promise.resolve()
    expect(load).toHaveBeenCalledOnce()
    load.mockRejectedValueOnce(new Error('catalog offline'))
    adapter.load()
    await Promise.resolve()
    await Promise.resolve()
    expect(load).toHaveBeenCalledTimes(2)
    await expect(adapter.select({ provider: 'provider-a', model: 'alpha' })).resolves.toBe(true)
    expect(select).toHaveBeenCalledWith({ provider: 'provider-a', model: 'alpha' })
    select.mockRejectedValueOnce(new Error('selection rejected'))
    await expect(adapter.select({ provider: 'provider-a', model: 'beta' })).resolves.toBe(false)
    expect(harness.context.locale.register).toHaveBeenCalledTimes(1)
    harness.dispose()
    expect(harness.localeDisposer).toHaveBeenCalledOnce()
  })

  it('does not call model operations for an addressed subagent', async () => {
    const harness = applyHarness()
    const load = vi.fn(async () => undefined)
    const select = vi.fn(async () => undefined)
    let modelOptions: Record<string, unknown> | undefined
    harness.dynamicMount()?.({
      modelDirectories: {
        directoryFor: () => ({
          store: { subscribe: () => () => undefined, getSnapshot: () => ({}) },
          load,
          select,
        }),
      },
      sessions: { subagentAddress: () => ({ parentSessionId: 'parent' }) },
      slots: {
        inject: (_name: string, mount: () => () => void) => mount(),
        register: (entry: Record<string, unknown>) => {
          modelOptions = entry
          return () => undefined
        },
      },
    })

    const adapter = (modelOptions?.inject as (sessionId: string) => {
      available: boolean
      load: () => void
      select: (selection: { provider: string; model: string }) => Promise<boolean>
    })('child')
    adapter.load()
    await expect(adapter.select({ provider: 'provider-a', model: 'alpha' })).resolves.toBe(false)
    expect(adapter.available).toBe(false)
    expect(load).not.toHaveBeenCalled()
    expect(select).not.toHaveBeenCalled()
    harness.dispose()
  })

  it('registers the standalone-chat model seat reusing the collapsible selector', () => {
    const harness = applyHarness()
    const calls = harness.context.slots.inject.mock.calls as unknown as [
      string,
      () => () => void,
    ][]
    const chatCall = calls.find(([name]) => name === 'chat.input.model')
    expect(chatCall).toBeDefined()
    expect(chatCall?.[1]()).toBe(harness.registerDisposer)
    const chatRegistration = harness.registrations[0]
    expect(chatRegistration?.options).toMatchObject({
      name: 'chat.input.model',
      locale: 'model',
    })
    expect(typeof chatRegistration?.component).toBe('function')
    const adapter = (chatRegistration?.options.inject as () => {
      preferences: unknown
    })()
    expect(adapter.preferences).toBeDefined()
    harness.dispose()
  })

  it('keeps the settings section but does not mount a model seat for an incompatible directory', () => {
    const harness = applyHarness()
    const injectModelSlot = vi.fn()
    harness.dynamicMount()?.({
      modelDirectories: {},
      sessions: {},
      slots: { inject: injectModelSlot },
    })

    expect(harness.context.slots.inject).toHaveBeenCalledWith(
      'settings.section',
      expect.any(Function),
    )
    expect(harness.context.slots.inject).toHaveBeenCalledWith(
      'chat.input.model',
      expect.any(Function),
    )
    expect(injectModelSlot).not.toHaveBeenCalled()
    expect(harness.context.locale.register).toHaveBeenCalledTimes(1)
    harness.dispose()
  })
})
