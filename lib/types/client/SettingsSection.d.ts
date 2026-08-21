import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import { SETTINGS_LOCALE_NS } from './locales.js';
import { type PreferencesStore } from './preferences.js';
interface SettingsSectionInjected {
    preferences: PreferencesStore;
}
export type SettingsSectionProps = PropsRuntime<'settings.section'> & PropsLocale<typeof SETTINGS_LOCALE_NS> & InjectFace<SettingsSectionInjected>;
export declare function SettingsSection({ preferences, t }: SettingsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SettingsSection.d.ts.map