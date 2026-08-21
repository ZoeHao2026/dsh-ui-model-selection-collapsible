import type { ModelSelectInjected } from '@deepseek-ai/dsh-client-ui-model-selection/client';
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import './styles.css';
import type { PreferencesStore } from './preferences.js';
export type CollapsibleModelSelectProps = ModelSelectInjected & {
    locked: boolean;
    preferences: PreferencesStore;
} & PropsLocale<'model'>;
export declare function CollapsibleModelSelect({ locked, available, directory, load, select, preferences, t, }: CollapsibleModelSelectProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=CollapsibleModelSelect.d.ts.map