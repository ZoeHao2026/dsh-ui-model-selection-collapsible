import type { LocaleDictOf } from '@deepseek-ai/dsh-client-ui-slots';
export declare const SETTINGS_LOCALE_NS = "settings.modelSelectionCollapsible";
export declare const en: {
    readonly nav: "Model selector";
    readonly title: "Model selector";
    readonly intro: "Tune how provider groups are presented without changing model configuration or calls.";
    readonly 'scope.browser': "Saved in this browser for the current DSH web address.";
    readonly 'scope.memory': "Browser storage is unavailable. Changes last until this page is refreshed or closed.";
    readonly 'disclosure.title': "Provider groups";
    readonly 'disclosure.description': "Choose which providers are expanded when you open the model list.";
    readonly 'disclosure.current': "Current provider";
    readonly 'disclosure.current.description': "Expand only the provider of the selected model.";
    readonly 'disclosure.all': "All providers";
    readonly 'disclosure.all.description': "Start with every provider expanded.";
    readonly 'disclosure.none': "All collapsed";
    readonly 'disclosure.none.description': "Start with a compact list of provider names.";
    readonly 'disclosure.accordion': "One at a time";
    readonly 'disclosure.accordion.description': "Keep at most one provider expanded.";
    readonly 'density.title': "List density";
    readonly 'density.description': "Adjust spacing in provider and model rows.";
    readonly 'density.comfortable': "Comfortable";
    readonly 'density.comfortable.description': "Roomier rows with model descriptions.";
    readonly 'density.compact': "Compact";
    readonly 'density.compact.description': "Shorter rows while keeping descriptions available to assistive technology.";
    readonly 'motion.title': "Animation";
    readonly 'motion.description': "Control provider expand and collapse motion.";
    readonly 'motion.system': "Follow system";
    readonly 'motion.system.description': "Use smooth motion unless reduced motion is enabled in the system.";
    readonly 'motion.none': "Off";
    readonly 'motion.none.description': "Apply expand and collapse changes immediately.";
    readonly reset: "Restore defaults";
};
export type SettingsLocaleKey = keyof typeof en;
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'settings.modelSelectionCollapsible': SettingsLocaleKey;
    }
}
export declare const zh: LocaleDictOf<typeof SETTINGS_LOCALE_NS>;
export declare const dictionaries: {
    zh: LocaleDictOf<"settings.modelSelectionCollapsible">;
    en: {
        readonly nav: "Model selector";
        readonly title: "Model selector";
        readonly intro: "Tune how provider groups are presented without changing model configuration or calls.";
        readonly 'scope.browser': "Saved in this browser for the current DSH web address.";
        readonly 'scope.memory': "Browser storage is unavailable. Changes last until this page is refreshed or closed.";
        readonly 'disclosure.title': "Provider groups";
        readonly 'disclosure.description': "Choose which providers are expanded when you open the model list.";
        readonly 'disclosure.current': "Current provider";
        readonly 'disclosure.current.description': "Expand only the provider of the selected model.";
        readonly 'disclosure.all': "All providers";
        readonly 'disclosure.all.description': "Start with every provider expanded.";
        readonly 'disclosure.none': "All collapsed";
        readonly 'disclosure.none.description': "Start with a compact list of provider names.";
        readonly 'disclosure.accordion': "One at a time";
        readonly 'disclosure.accordion.description': "Keep at most one provider expanded.";
        readonly 'density.title': "List density";
        readonly 'density.description': "Adjust spacing in provider and model rows.";
        readonly 'density.comfortable': "Comfortable";
        readonly 'density.comfortable.description': "Roomier rows with model descriptions.";
        readonly 'density.compact': "Compact";
        readonly 'density.compact.description': "Shorter rows while keeping descriptions available to assistive technology.";
        readonly 'motion.title': "Animation";
        readonly 'motion.description': "Control provider expand and collapse motion.";
        readonly 'motion.system': "Follow system";
        readonly 'motion.system.description': "Use smooth motion unless reduced motion is enabled in the system.";
        readonly 'motion.none': "Off";
        readonly 'motion.none.description': "Apply expand and collapse changes immediately.";
        readonly reset: "Restore defaults";
    };
};
//# sourceMappingURL=locales.d.ts.map