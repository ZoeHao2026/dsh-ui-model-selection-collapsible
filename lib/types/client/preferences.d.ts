export declare const PREFERENCES_STORAGE_KEY = "@local/dsh-ui-model-selection-collapsible/preferences/v1";
export declare const providerDisclosureValues: readonly ["current", "all", "none", "accordion"];
export declare const densityValues: readonly ["comfortable", "compact"];
export declare const motionValues: readonly ["system", "none"];
export type ProviderDisclosure = (typeof providerDisclosureValues)[number];
export type Density = (typeof densityValues)[number];
export type MotionPreference = (typeof motionValues)[number];
export interface ModelSelectorPreferences {
    providerDisclosure: ProviderDisclosure;
    density: Density;
    motion: MotionPreference;
}
export type PreferencesPersistence = 'browser' | 'memory';
export interface PreferencesSnapshot {
    value: ModelSelectorPreferences;
    persistence: PreferencesPersistence;
}
export interface PreferencesStore {
    getSnapshot(): PreferencesSnapshot;
    subscribe(listener: () => void): () => void;
    setPreference<K extends keyof ModelSelectorPreferences>(field: K, value: ModelSelectorPreferences[K]): void;
    reset(): void;
}
export declare const DEFAULT_PREFERENCES: Readonly<ModelSelectorPreferences>;
export declare function decodePreferences(input: unknown): ModelSelectorPreferences;
export declare function preferencesEqual(left: Readonly<ModelSelectorPreferences>, right: Readonly<ModelSelectorPreferences>): boolean;
export declare class BrowserPreferencesStore implements PreferencesStore {
    private readonly storage;
    private readonly eventTarget;
    private readonly listeners;
    private snapshot;
    constructor(storage?: Storage | undefined, eventTarget?: Window | undefined);
    readonly getSnapshot: () => PreferencesSnapshot;
    readonly subscribe: (listener: () => void) => (() => void);
    setPreference<K extends keyof ModelSelectorPreferences>(field: K, value: ModelSelectorPreferences[K]): void;
    reset(): void;
    dispose(): void;
    private readonly onStorage;
    private persist;
    private publish;
}
//# sourceMappingURL=preferences.d.ts.map