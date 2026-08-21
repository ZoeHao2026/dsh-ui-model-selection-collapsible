import type { SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'

import {
  DEFAULT_PREFERENCES,
  type ModelSelectorPreferences,
  type PreferencesPersistence,
  type PreferencesSnapshot,
  type PreferencesStore,
} from '../src/client/preferences.js'

export class TestStore<T> implements SnapshotStore<T> {
  readonly listeners = new Set<() => void>()

  constructor(private value: T) {}

  getSnapshot = (): T => this.value

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  set(next: T): void {
    this.value = next
    for (const listener of this.listeners) listener()
  }

  update(mutator: (draft: T) => void): void {
    const next = structuredClone(this.value)
    mutator(next)
    this.set(next)
  }
}

export class TestPreferencesStore implements PreferencesStore {
  readonly listeners = new Set<() => void>()
  private snapshot: PreferencesSnapshot

  constructor(
    value: Partial<ModelSelectorPreferences> = {},
    persistence: PreferencesPersistence = 'browser',
  ) {
    this.snapshot = {
      value: { ...DEFAULT_PREFERENCES, ...value },
      persistence,
    }
  }

  getSnapshot = (): PreferencesSnapshot => this.snapshot

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  setPreference<K extends keyof ModelSelectorPreferences>(
    field: K,
    value: ModelSelectorPreferences[K],
  ): void {
    this.set({ [field]: value })
  }

  reset(): void {
    this.set(DEFAULT_PREFERENCES)
  }

  set(value: Partial<ModelSelectorPreferences>): void {
    this.snapshot = {
      ...this.snapshot,
      value: { ...this.snapshot.value, ...value },
    }
    for (const listener of this.listeners) listener()
  }
}

export const groups: ModelDirectoryState['groups'] = [
  {
    id: 'provider-a',
    name: 'Provider A',
    models: [
      {
        id: 'alpha',
        name: 'Alpha',
        description: 'Fast model',
        reasoning: {
          efforts: [
            { id: 'low', name: 'Low' },
            { id: 'high', name: 'High', description: 'More thinking' },
          ],
        },
      },
      { id: 'beta', name: 'Beta' },
    ],
  },
  {
    id: 'provider-b',
    name: 'Provider B',
    models: [{ id: 'gamma', name: 'Gamma' }],
  },
]

export function stateOf(
  patch: Partial<ModelDirectoryState> = {},
): ModelDirectoryState {
  return {
    current: { provider: 'provider-a', model: 'alpha', reasoningEffort: 'high' },
    routable: true,
    groups,
    failures: [],
    status: 'ready',
    error: null,
    ...patch,
  }
}
