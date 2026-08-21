import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  BrowserPreferencesStore,
  decodePreferences,
  DEFAULT_PREFERENCES,
  PREFERENCES_STORAGE_KEY,
} from '../src/client/preferences.js'

function dispatchStorage(newValue: string | null, init: Partial<StorageEventInit> = {}): void {
  window.dispatchEvent(
    new StorageEvent('storage', {
      key: PREFERENCES_STORAGE_KEY,
      newValue,
      storageArea: window.localStorage,
      url: window.location.href,
      ...init,
    }),
  )
}

describe('model selector preferences', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  it('decodes each field independently and defaults malformed values', () => {
    expect(decodePreferences(null)).toEqual(DEFAULT_PREFERENCES)
    expect(decodePreferences('invalid')).toEqual(DEFAULT_PREFERENCES)
    expect(
      decodePreferences({
        providerDisclosure: 'all',
        density: 'unknown',
        motion: 'none',
        ignored: true,
      }),
    ).toEqual({
      providerDisclosure: 'all',
      density: 'comfortable',
      motion: 'none',
    })
  })

  it('loads and persists preferences while notifying only on changes', () => {
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({ providerDisclosure: 'none', density: 'compact', motion: 'system' }),
    )
    const store = new BrowserPreferencesStore(window.localStorage, window)
    const listener = vi.fn()
    const unsubscribe = store.subscribe(listener)

    expect(store.getSnapshot()).toEqual({
      value: { providerDisclosure: 'none', density: 'compact', motion: 'system' },
      persistence: 'browser',
    })

    store.setPreference('motion', 'none')
    expect(store.getSnapshot()).toEqual({
      value: { providerDisclosure: 'none', density: 'compact', motion: 'none' },
      persistence: 'browser',
    })
    expect(JSON.parse(window.localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? 'null')).toEqual(
      store.getSnapshot().value,
    )
    expect(listener).toHaveBeenCalledOnce()

    store.setPreference('motion', 'none')
    expect(listener).toHaveBeenCalledOnce()
    unsubscribe()
    store.setPreference('density', 'comfortable')
    expect(listener).toHaveBeenCalledOnce()
    store.dispose()
  })

  it('resets values and removes the persisted record', () => {
    const store = new BrowserPreferencesStore(window.localStorage, window)
    const listener = vi.fn()
    store.subscribe(listener)
    store.setPreference('providerDisclosure', 'all')

    store.reset()

    expect(store.getSnapshot()).toEqual({
      value: { ...DEFAULT_PREFERENCES },
      persistence: 'browser',
    })
    expect(window.localStorage.getItem(PREFERENCES_STORAGE_KEY)).toBeNull()
    expect(listener).toHaveBeenCalledTimes(2)
    store.dispose()
  })

  it('applies valid cross-tab storage events, reset events, and disposal', () => {
    const store = new BrowserPreferencesStore(window.localStorage, window)
    const listener = vi.fn()
    store.subscribe(listener)

    dispatchStorage(
      JSON.stringify({ providerDisclosure: 'accordion', density: 'compact', motion: 'none' }),
    )
    expect(store.getSnapshot()).toEqual({
      value: { providerDisclosure: 'accordion', density: 'compact', motion: 'none' },
      persistence: 'browser',
    })

    dispatchStorage(null)
    expect(store.getSnapshot()).toEqual({
      value: { ...DEFAULT_PREFERENCES },
      persistence: 'browser',
    })
    expect(listener).toHaveBeenCalledTimes(2)

    store.dispose()
    dispatchStorage(JSON.stringify({ providerDisclosure: 'all' }))
    expect(store.getSnapshot().value).toEqual(DEFAULT_PREFERENCES)
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('ignores malformed, unrelated, and foreign-storage events', () => {
    const store = new BrowserPreferencesStore(window.localStorage, window)
    const listener = vi.fn()
    store.subscribe(listener)

    dispatchStorage('{')
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'another-key',
        newValue: JSON.stringify({ density: 'compact' }),
        storageArea: window.localStorage,
      }),
    )
    dispatchStorage(JSON.stringify({ density: 'compact' }), {
      storageArea: window.sessionStorage,
    })

    expect(store.getSnapshot()).toEqual({
      value: { ...DEFAULT_PREFERENCES },
      persistence: 'browser',
    })
    expect(listener).not.toHaveBeenCalled()
    store.dispose()
  })

  it('falls back to memory when storage reads, writes, or resets fail', () => {
    const readFailure = {
      getItem: vi.fn(() => {
        throw new DOMException('denied')
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    } as unknown as Storage
    const readStore = new BrowserPreferencesStore(readFailure, undefined)
    expect(readStore.getSnapshot()).toEqual({
      value: { ...DEFAULT_PREFERENCES },
      persistence: 'memory',
    })

    const writeFailure = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => {
        throw new DOMException('quota')
      }),
      removeItem: vi.fn(() => {
        throw new DOMException('denied')
      }),
    } as unknown as Storage
    const writeStore = new BrowserPreferencesStore(writeFailure, undefined)
    expect(writeStore.getSnapshot().persistence).toBe('browser')

    writeStore.setPreference('density', 'compact')
    expect(writeStore.getSnapshot()).toEqual({
      value: { providerDisclosure: 'current', density: 'compact', motion: 'system' },
      persistence: 'memory',
    })

    writeStore.reset()
    expect(writeStore.getSnapshot()).toEqual({
      value: { ...DEFAULT_PREFERENCES },
      persistence: 'memory',
    })
  })
})
