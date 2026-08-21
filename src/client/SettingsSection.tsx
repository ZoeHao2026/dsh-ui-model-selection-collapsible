import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {
  InjectFace,
  PropsLocale,
  PropsRuntime,
} from '@deepseek-ai/dsh-client-ui-slots'
import { IconCheckOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import { useId, useSyncExternalStore } from 'react'

import { SETTINGS_LOCALE_NS } from './locales.js'
import {
  DEFAULT_PREFERENCES,
  densityValues,
  motionValues,
  preferencesEqual,
  providerDisclosureValues,
  type ModelSelectorPreferences,
  type PreferencesStore,
} from './preferences.js'
import { styles } from './styles.js'

interface SettingsSectionInjected {
  preferences: PreferencesStore
}

export type SettingsSectionProps = PropsRuntime<'settings.section'> &
  PropsLocale<typeof SETTINGS_LOCALE_NS> &
  InjectFace<SettingsSectionInjected>

interface ChoiceGroupProps<K extends keyof ModelSelectorPreferences>
  extends PropsLocale<typeof SETTINGS_LOCALE_NS> {
  field: K
  titleKey: Parameters<SettingsSectionProps['t']>[0]
  descriptionKey: Parameters<SettingsSectionProps['t']>[0]
  values: readonly ModelSelectorPreferences[K][]
  value: ModelSelectorPreferences[K]
  preferences: PreferencesStore
  labelKey: (value: ModelSelectorPreferences[K]) => Parameters<SettingsSectionProps['t']>[0]
  optionDescriptionKey: (
    value: ModelSelectorPreferences[K],
  ) => Parameters<SettingsSectionProps['t']>[0]
}

function ChoiceGroup<K extends keyof ModelSelectorPreferences>({
  field,
  titleKey,
  descriptionKey,
  values,
  value,
  preferences,
  labelKey,
  optionDescriptionKey,
  t,
}: ChoiceGroupProps<K>) {
  const id = useId()
  return (
    <fieldset className={styles.settingsGroup} aria-describedby={`${id}-description`}>
      <legend className={styles.settingsLegend}>{t(titleKey)}</legend>
      <p id={`${id}-description`} className={styles.settingsDescription}>
        {t(descriptionKey)}
      </p>
      <div className={styles.settingsChoices}>
        {values.map((option) => {
          const selected = value === option
          return (
            <label className={styles.settingsChoice} data-selected={selected} key={String(option)}>
              <input
                className={styles.settingsRadio}
                type="radio"
                name={`${id}-${String(field)}`}
                value={String(option)}
                checked={selected}
                onChange={() => preferences.setPreference(field, option)}
              />
              <span className={styles.settingsChoiceCopy}>
                <span className={styles.settingsChoiceTitle}>{t(labelKey(option))}</span>
                <span className={styles.settingsChoiceDescription}>
                  {t(optionDescriptionKey(option))}
                </span>
              </span>
              <span className={styles.settingsChoiceCheck} aria-hidden="true">
                {selected ? <IconCheckOutline16 /> : null}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function SettingsSection({ preferences, t }: SettingsSectionProps) {
  const snapshot = useSyncExternalStore(preferences.subscribe, preferences.getSnapshot)
  const value = snapshot.value
  const isDefault = preferencesEqual(value, DEFAULT_PREFERENCES)

  return (
    <div className={styles.settingsSection}>
      <header className={styles.settingsHeader}>
        <h2 className={styles.settingsTitle}>{t('title')}</h2>
        <p className={styles.settingsIntro}>{t('intro')}</p>
        <p className={styles.settingsScope} role="status">
          {t(snapshot.persistence === 'browser' ? 'scope.browser' : 'scope.memory')}
        </p>
      </header>

      <ChoiceGroup
        field="providerDisclosure"
        titleKey="disclosure.title"
        descriptionKey="disclosure.description"
        values={providerDisclosureValues}
        value={value.providerDisclosure}
        preferences={preferences}
        labelKey={(option) => `disclosure.${option}`}
        optionDescriptionKey={(option) => `disclosure.${option}.description`}
        t={t}
      />
      <ChoiceGroup
        field="density"
        titleKey="density.title"
        descriptionKey="density.description"
        values={densityValues}
        value={value.density}
        preferences={preferences}
        labelKey={(option) => `density.${option}`}
        optionDescriptionKey={(option) => `density.${option}.description`}
        t={t}
      />
      <ChoiceGroup
        field="motion"
        titleKey="motion.title"
        descriptionKey="motion.description"
        values={motionValues}
        value={value.motion}
        preferences={preferences}
        labelKey={(option) => `motion.${option}`}
        optionDescriptionKey={(option) => `motion.${option}.description`}
        t={t}
      />

      <button
        type="button"
        className={styles.settingsReset}
        disabled={isDefault}
        onClick={() => preferences.reset()}
      >
        {t('reset')}
      </button>
    </div>
  )
}
