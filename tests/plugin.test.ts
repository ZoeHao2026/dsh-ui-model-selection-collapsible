import { describe, expect, it, vi } from 'vitest'

import { apply, inject } from '../src/client/index.js'

describe('DSH client registration', () => {
  it('waits for the official directory, never registers locale, and mounts priority -1', async () => {
    let dynamicDependencies: readonly string[] | undefined
    let dynamicMount: ((scope: unknown) => void) | undefined
    const context = {
      locale: {
        register: vi.fn(() => {
          throw new Error('must not register locale')
        }),
      },
      inject: vi.fn((dependencies: readonly string[], mount: (scope: unknown) => void) => {
        dynamicDependencies = dependencies
        dynamicMount = mount
      }),
    }

    apply(context as never)
    expect(inject).toEqual(['slots', 'sessions', 'locale'])
    expect(context.locale.register).not.toHaveBeenCalled()
    expect(dynamicDependencies).toEqual(['modelDirectories'])

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
    let options: Record<string, unknown> | undefined
    let component: unknown
    const registerDisposer = vi.fn()
    const scope = {
      modelDirectories: { directoryFor },
      sessions: { subagentAddress: vi.fn(() => undefined) },
      slots: {
        inject: vi.fn((name: string, mount: () => () => void) => {
          expect(name).toBe('conversation.input.model')
          slotMount = mount
          return vi.fn()
        }),
        register: vi.fn((entry: Record<string, unknown>, seat: unknown) => {
          options = entry
          component = seat
          return registerDisposer
        }),
      },
    }

    dynamicMount?.(scope)
    expect(scope.slots.register).not.toHaveBeenCalled()
    const returnedDisposer = slotMount?.()
    expect(returnedDisposer).toBe(registerDisposer)
    expect(options).toMatchObject({
      name: 'conversation.input.model',
      locale: 'model',
      priority: -1,
    })
    expect(typeof component).toBe('function')

    const adapter = (options?.inject as (sessionId: string) => {
      available: boolean
      load: () => void
      select: (selection: { provider: string; model: string }) => Promise<boolean>
    })('session-1')
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
  })

  it('does not call model operations for an addressed subagent', async () => {
    let dynamicMount: ((scope: unknown) => void) | undefined
    apply({
      inject: (_dependencies: readonly string[], mount: (scope: unknown) => void) => {
        dynamicMount = mount
      },
    } as never)

    const load = vi.fn(async () => undefined)
    const select = vi.fn(async () => undefined)
    let options: Record<string, unknown> | undefined
    dynamicMount?.({
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
          options = entry
          return () => undefined
        },
      },
    })

    const adapter = (options?.inject as (sessionId: string) => {
      available: boolean
      load: () => void
      select: (selection: { provider: string; model: string }) => Promise<boolean>
    })('child')
    adapter.load()
    await expect(adapter.select({ provider: 'provider-a', model: 'alpha' })).resolves.toBe(false)
    expect(adapter.available).toBe(false)
    expect(load).not.toHaveBeenCalled()
    expect(select).not.toHaveBeenCalled()
  })

  it('does not mount a seat when an incompatible directory face is supplied', () => {
    let dynamicMount: ((scope: unknown) => void) | undefined
    apply({
      inject: (_dependencies: readonly string[], mount: (scope: unknown) => void) => {
        dynamicMount = mount
      },
    } as never)
    const injectSlot = vi.fn()
    dynamicMount?.({
      modelDirectories: {},
      sessions: {},
      slots: { inject: injectSlot },
    })
    expect(injectSlot).not.toHaveBeenCalled()
  })
})
