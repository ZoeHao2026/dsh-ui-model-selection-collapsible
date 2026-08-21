export const PREFERENCES_STORAGE_KEY =
  '@local/dsh-ui-model-selection-collapsible/preferences/v1'

export const providerDisclosureValues = ['current', 'all', 'none', 'accordion'] as const
export const densityValues = ['comfortable', 'compact'] as const
export const motionValues = ['system', 'none'] as const

export type ProviderDisclosure = (typeof providerDisclosureValues)[number]
export type Density = (typeof densityValues)[number]
export type MotionPreference = (typeof motionValues)[number]

export interface ModelSelectorPreferences {
  providerDisclosure: ProviderDisclosure
  density: Density
  motion: MotionPreference
}

export type PreferencesPersistence = 'browser' | 'memory'

export interface PreferencesSnapshot {
  value: ModelSelectorPreferences
  persistence: PreferencesPersistence
}

export interface PreferencesStore {
  getSnapshot(): PreferencesSnapshot
  subscribe(listener: () => void): () => void
  setPreference<K extends keyof ModelSelectorPreferences>(
    field: K,
    value: ModelSelectorPreferences[K],
  ): void
  reset(): void
}

export const DEFAULT_PREFERENCES: Readonly<ModelSelectorPreferences> = Object.freeze({
  providerDisclosure: 'current',
  density: 'comfortable',
  motion: 'system',
})

function memberOf<const T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === 'string' && values.includes(value)
}

export function decodePreferences(input: unknown): ModelSelectorPreferences {
  if (typeof input !== 'object' || input === null) return { ...DEFAULT_PREFERENCES }
  const value = input as Record<string, unknown>
  return {
    providerDisclosure: memberOf(providerDisclosureValues, value.providerDisclosure)
      ? value.providerDisclosure
      : DEFAULT_PREFERENCES.providerDisclosure,
    density: memberOf(densityValues, value.density)
      ? value.density
      : DEFAULT_PREFERENCES.density,
    motion: memberOf(motionValues, value.motion)
      ? value.motion
      : DEFAULT_PREFERENCES.motion,
  }
}

export function preferencesEqual(
  left: Readonly<ModelSelectorPreferences>,
  right: Readonly<ModelSelectorPreferences>,
): boolean {
  return (
    left.providerDisclosure === right.providerDisclosure &&
    left.density === right.density &&
    left.motion === right.motion
  )
}

function parseStored(raw: string | null): ModelSelectorPreferences | undefined {
  if (raw === null) return { ...DEFAULT_PREFERENCES }
  try {
    return decodePreferences(JSON.parse(raw))
  } catch {
    return undefined
  }
}

function browserStorage(): Storage | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

function browserWindow(): Window | undefined {
  return typeof window === 'undefined' ? undefined : window
}

export class BrowserPreferencesStore implements PreferencesStore {
  private readonly listeners = new Set<() => void>()
  private snapshot: PreferencesSnapshot

  constructor(
    private readonly storage: Storage | undefined = browserStorage(),
    private readonly eventTarget: Window | undefined = browserWindow(),
  ) {
    let value = { ...DEFAULT_PREFERENCES }
    let persistence: PreferencesPersistence = 'memory'
    if (storage !== undefined) {
      try {
        value = parseStored(storage.getItem(PREFERENCES_STORAGE_KEY)) ?? {
          ...DEFAULT_PREFERENCES,
        }
        persistence = 'browser'
      } catch {
        persistence = 'memory'
      }
    }
    this.snapshot = { value, persistence }
    eventTarget?.addEventListener('storage', this.onStorage)
  }

  readonly getSnapshot = (): PreferencesSnapshot => this.snapshot

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  setPreference<K extends keyof ModelSelectorPreferences>(
    field: K,
    value: ModelSelectorPreferences[K],
  ): void {
    const next = { ...this.snapshot.value, [field]: value }
    if (preferencesEqual(next, this.snapshot.value)) return
    this.publish(next, this.persist(next))
  }

  reset(): void {
    let persistence: PreferencesPersistence = this.storage === undefined ? 'memory' : 'browser'
    if (this.storage !== undefined) {
      try {
        this.storage.removeItem(PREFERENCES_STORAGE_KEY)
      } catch {
        persistence = 'memory'
      }
    }
    this.publish({ ...DEFAULT_PREFERENCES }, persistence)
  }

  dispose(): void {
    this.eventTarget?.removeEventListener('storage', this.onStorage)
    this.listeners.clear()
  }

  private readonly onStorage = (event: StorageEvent): void => {
    if (this.storage === undefined) return
    if (event.key !== PREFERENCES_STORAGE_KEY && event.key !== null) return
    if (event.storageArea !== null && event.storageArea !== this.storage) {
      return
    }
    const next = parseStored(event.newValue)
    if (next === undefined) return
    if (preferencesEqual(next, this.snapshot.value) && this.snapshot.persistence === 'browser') {
      return
    }
    this.publish(next, 'browser')
  }

  private persist(value: ModelSelectorPreferences): PreferencesPersistence {
    if (this.storage === undefined) return 'memory'
    try {
      this.storage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(value))
      return 'browser'
    } catch {
      return 'memory'
    }
  }

  private publish(value: ModelSelectorPreferences, persistence: PreferencesPersistence): void {
    if (preferencesEqual(value, this.snapshot.value) && persistence === this.snapshot.persistence) {
      return
    }
    this.snapshot = { value, persistence }
    for (const listener of this.listeners) listener()
  }
}
