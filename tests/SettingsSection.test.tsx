import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { SettingsSection, type SettingsSectionProps } from '../src/client/SettingsSection.js'
import { en } from '../src/client/locales.js'
import {
  BrowserPreferencesStore,
  PREFERENCES_STORAGE_KEY,
} from '../src/client/preferences.js'

const t = ((key: keyof typeof en) => en[key]) as SettingsSectionProps['t']

function renderSettings(): ReturnType<typeof render> & { store: BrowserPreferencesStore } {
  const store = new BrowserPreferencesStore(window.localStorage, window)
  const view = render(
    <SettingsSection
      close={vi.fn()}
      preferences={store}
      t={t}
      useSessions={vi.fn() as SettingsSectionProps['useSessions']}
      useWorkspaces={vi.fn() as SettingsSectionProps['useWorkspaces']}
    />,
  )
  return { ...view, store }
}

describe('SettingsSection', () => {
  beforeEach(() => window.localStorage.clear())
  afterEach(() => window.localStorage.clear())

  it('renders three fieldsets with native radio controls and default selections', () => {
    const { store, unmount } = renderSettings()
    const disclosure = screen.getByRole('group', { name: 'Provider groups' })
    const density = screen.getByRole('group', { name: 'List density' })
    const motion = screen.getByRole('group', { name: 'Animation' })

    expect(within(disclosure).getAllByRole('radio')).toHaveLength(4)
    expect(within(density).getAllByRole('radio')).toHaveLength(2)
    expect(within(motion).getAllByRole('radio')).toHaveLength(2)
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toBeInstanceOf(HTMLInputElement)
      expect(radio).toHaveAttribute('type', 'radio')
    }

    expect(screen.getByRole('radio', { name: /Current provider/ })).toBeChecked()
    expect(screen.getByRole('radio', { name: /Comfortable/ })).toBeChecked()
    expect(screen.getByRole('radio', { name: /Follow system/ })).toBeChecked()
    expect(screen.getByRole('button', { name: 'Restore defaults' })).toBeDisabled()

    unmount()
    store.dispose()
  })

  it('hydrates persisted choices and writes radio changes to localStorage', async () => {
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({ providerDisclosure: 'all', density: 'compact', motion: 'none' }),
    )
    const user = userEvent.setup()
    const { store, unmount } = renderSettings()

    expect(screen.getByRole('radio', { name: /All providers/ })).toBeChecked()
    expect(screen.getByRole('radio', { name: /Compact/ })).toBeChecked()
    expect(screen.getByRole('radio', { name: /^Off/ })).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Saved in this browser for the current DSH web address.',
    )

    await user.click(screen.getByRole('radio', { name: /One at a time/ }))

    expect(screen.getByRole('radio', { name: /One at a time/ })).toBeChecked()
    expect(JSON.parse(window.localStorage.getItem(PREFERENCES_STORAGE_KEY) ?? 'null')).toEqual({
      providerDisclosure: 'accordion',
      density: 'compact',
      motion: 'none',
    })

    unmount()
    store.dispose()
  })

  it('resets every group, clears persistence, and disables reset again', async () => {
    const user = userEvent.setup()
    const { store, unmount } = renderSettings()
    await user.click(screen.getByRole('radio', { name: /All collapsed/ }))
    await user.click(screen.getByRole('radio', { name: /Compact/ }))
    await user.click(screen.getByRole('radio', { name: /^Off/ }))
    const reset = screen.getByRole('button', { name: 'Restore defaults' })
    expect(reset).toBeEnabled()

    await user.click(reset)

    expect(screen.getByRole('radio', { name: /Current provider/ })).toBeChecked()
    expect(screen.getByRole('radio', { name: /Comfortable/ })).toBeChecked()
    expect(screen.getByRole('radio', { name: /Follow system/ })).toBeChecked()
    expect(window.localStorage.getItem(PREFERENCES_STORAGE_KEY)).toBeNull()
    expect(reset).toBeDisabled()

    unmount()
    store.dispose()
  })
})
