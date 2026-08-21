import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  CollapsibleModelSelect,
  type CollapsibleModelSelectProps,
} from '../src/client/CollapsibleModelSelect.js'
import type { ProviderDisclosure } from '../src/client/preferences.js'
import { groups, stateOf, TestPreferencesStore, TestStore } from './helpers.js'

const labels: Record<string, string> = {
  'trigger.fallback': 'Select model',
  'trigger.selectAria': 'Select model',
  'trigger.aria': 'Select model, current {model}',
  'trigger.ariaEffort': 'Select model, current {model}, effort {effort}',
  'menu.aria': 'Model and reasoning effort',
  'menu.model': 'Model',
  'menu.effort': 'Effort',
  'effort.providerDefault': 'Default',
  'status.loading': 'Loading models',
  'error.action': 'Model operation failed: {message}',
  'action.reload': 'Reload',
  'warning.groupLoad': '{name} failed: {message}',
  'empty.models': 'No models available',
  'empty.efforts': 'No efforts available',
}

const t = ((key: string, params?: Record<string, string>) => {
  let value = labels[key] ?? key
  for (const [name, replacement] of Object.entries(params ?? {})) {
    value = value.replace(`{${name}}`, replacement)
  }
  return value
}) as CollapsibleModelSelectProps['t']

function renderSeat(
  initial = stateOf(),
  overrides: Partial<CollapsibleModelSelectProps> = {},
) {
  const store = new TestStore(initial)
  const preferences = overrides.preferences ?? new TestPreferencesStore()
  const load = vi.fn()
  const select = vi.fn(async () => true)
  const props: CollapsibleModelSelectProps = {
    locked: false,
    available: true,
    directory: store,
    load,
    select,
    preferences,
    t,
    ...overrides,
  }
  const view = render(<CollapsibleModelSelect {...props} />)
  return { ...view, store, load, select, preferences, props }
}

async function enterModelPane(user: ReturnType<typeof userEvent.setup>) {
  const trigger = screen.getByRole('button', { name: /Select model/ })
  await user.click(trigger)
  await user.click(screen.getByRole('menuitem', { name: /^Model/ }))
  return trigger
}

describe('CollapsibleModelSelect', () => {
  it('does not render or load for an addressed subagent seat', () => {
    const load = vi.fn()
    const { container } = renderSeat(stateOf(), { available: false, load })
    expect(container).toBeEmptyDOMElement()
    expect(load).not.toHaveBeenCalled()
  })

  it('loads on mount and on open, and respects the locked owner state', async () => {
    const user = userEvent.setup()
    const { load, rerender, props } = renderSeat()
    expect(load).toHaveBeenCalledOnce()
    await user.click(screen.getByRole('button', { name: /Select model/ }))
    expect(load).toHaveBeenCalledTimes(2)

    rerender(<CollapsibleModelSelect {...props} locked />)
    expect(screen.getByRole('button', { name: /Select model/ })).toBeDisabled()
  })

  it('expands only the selected provider and lets groups toggle independently', async () => {
    const user = userEvent.setup()
    renderSeat()
    await enterModelPane(user)

    const providerA = screen.getByRole('menuitem', { name: 'Provider A 2' })
    const providerB = screen.getByRole('menuitem', { name: 'Provider B 1' })
    expect(providerA).toHaveAttribute('aria-expanded', 'true')
    expect(providerB).toHaveAttribute('aria-expanded', 'false')
    const providerABody = document.getElementById(providerA.getAttribute('aria-controls') ?? '')
    const providerBBody = document.getElementById(providerB.getAttribute('aria-controls') ?? '')
    expect(providerBBody).not.toHaveAttribute('hidden')
    expect(providerBBody).toHaveAttribute('data-expanded', 'false')
    expect(providerBBody).toHaveAttribute('aria-hidden', 'true')
    expect(providerBBody).toHaveAttribute('inert')
    expect(providerBBody).not.toBeVisible()
    expect(getComputedStyle(providerBBody as HTMLElement).display).toBe('grid')
    expect(getComputedStyle(providerBBody as HTMLElement).gridTemplateRows).toBe('0fr')
    expect(getComputedStyle(providerBBody as HTMLElement).opacity).toBe('0')
    expect(providerBBody?.querySelector('[aria-label="Gamma"]')).toHaveAttribute(
      'tabindex',
      '-1',
    )
    expect(screen.getByRole('menuitemradio', { name: 'Alpha' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(screen.queryByRole('menuitemradio', { name: 'Gamma' })).not.toBeInTheDocument()

    await user.click(providerB)
    expect(providerA).toHaveAttribute('aria-expanded', 'true')
    expect(providerB).toHaveAttribute('aria-expanded', 'true')
    expect(providerBBody).toHaveAttribute('data-expanded', 'true')
    expect(providerBBody).toHaveAttribute('aria-hidden', 'false')
    expect(providerBBody).not.toHaveAttribute('inert')
    expect(document.getElementById(providerB.getAttribute('aria-controls') ?? '')).toBe(providerBBody)
    expect(providerBBody).toBeVisible()
    expect(getComputedStyle(providerBBody as HTMLElement).gridTemplateRows).toBe('1fr')
    expect(getComputedStyle(providerBBody as HTMLElement).opacity).toBe('1')
    expect(screen.getByRole('menuitemradio', { name: 'Gamma' })).toBeVisible()

    await user.click(providerA)
    expect(providerA).toHaveAttribute('aria-expanded', 'false')
    expect(providerB).toHaveAttribute('aria-expanded', 'true')
    expect(providerABody).toHaveAttribute('data-expanded', 'false')
    expect(providerABody).toHaveAttribute('aria-hidden', 'true')
    expect(providerABody).toHaveAttribute('inert')
    expect(providerABody?.querySelector('[aria-label="Alpha"]')).toHaveAttribute(
      'tabindex',
      '-1',
    )
  })

  it.each<[
    disclosure: ProviderDisclosure,
    expectedA: boolean,
    expectedB: boolean,
  ]>([
    ['current', true, false],
    ['all', true, true],
    ['none', false, false],
    ['accordion', true, false],
  ])('applies the %s provider disclosure preference', async (disclosure, expectedA, expectedB) => {
    const user = userEvent.setup()
    renderSeat(stateOf(), {
      preferences: new TestPreferencesStore({ providerDisclosure: disclosure }),
    })
    await enterModelPane(user)

    const providerA = screen.getByRole('menuitem', { name: 'Provider A 2' })
    const providerB = screen.getByRole('menuitem', { name: 'Provider B 1' })
    expect(providerA).toHaveAttribute('aria-expanded', String(expectedA))
    expect(providerB).toHaveAttribute('aria-expanded', String(expectedB))

    if (disclosure === 'accordion') {
      await user.click(providerB)
      expect(providerA).toHaveAttribute('aria-expanded', 'false')
      expect(providerB).toHaveAttribute('aria-expanded', 'true')
      await user.click(providerB)
      expect(providerB).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('starts fully collapsed when the current model is absent from the catalog', async () => {
    const user = userEvent.setup()
    renderSeat(
      stateOf({ current: { provider: 'provider-a', model: 'retired-model' } }),
    )
    await enterModelPane(user)
    for (const header of screen.getAllByRole('menuitem', { name: /Provider [AB]/ })) {
      expect(header).toHaveAttribute('aria-expanded', 'false')
    }
    expect(screen.queryByRole('menuitemradio')).not.toBeInTheDocument()
  })

  it('applies the default expansion when a slow directory load arrives', async () => {
    const user = userEvent.setup()
    const { store } = renderSeat(stateOf({ current: null, groups: [], status: 'loading' }))
    await enterModelPane(user)
    expect(screen.queryByRole('menuitem', { name: /Provider/ })).not.toBeInTheDocument()

    act(() => store.set(stateOf({ current: { provider: 'provider-b', model: 'gamma' }, groups })))
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: 'Provider B 1' })).toHaveAttribute(
        'aria-expanded',
        'true',
      ),
    )
  })

  it('navigates only visible menu items and restores trigger focus on Escape', async () => {
    const user = userEvent.setup()
    renderSeat()
    const trigger = screen.getByRole('button', { name: /Select model/ })
    await user.click(trigger)
    await user.keyboard('{ArrowDown}')
    const modelCell = screen.getByRole('menuitem', { name: /^Model/ })
    expect(modelCell).toHaveFocus()

    await user.keyboard('{Enter}')
    const providerA = screen.getByRole('menuitem', { name: 'Provider A 2' })
    await waitFor(() => expect(providerA).toHaveFocus())
    const providerB = screen.getByRole('menuitem', { name: 'Provider B 1' })
    providerB.focus()
    await user.keyboard('{ArrowDown}')
    expect(providerA).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitemradio', { name: 'Alpha' })).toHaveFocus()
    expect(screen.queryByRole('menuitemradio', { name: 'Gamma' })).not.toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: /^Model/ })).toHaveFocus(),
    )
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('keeps partial provider failures visible while loaded groups remain selectable', async () => {
    const user = userEvent.setup()
    renderSeat(
      stateOf({
        failures: [{ id: 'provider-c', name: 'Provider C', message: 'timeout' }],
      }),
    )
    await enterModelPane(user)
    expect(screen.getByText('Provider C failed: timeout')).toBeVisible()
    expect(screen.getByRole('menuitem', { name: 'Reload' })).toBeVisible()
    expect(screen.getByRole('menuitemradio', { name: 'Alpha' })).toBeVisible()
  })

  it('shows loading, empty, and whole-request failure states', async () => {
    const user = userEvent.setup()
    const { store } = renderSeat(stateOf({ status: 'loading', groups: [] }))
    await enterModelPane(user)
    expect(screen.getByRole('menu')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Loading models')).toHaveAttribute('role', 'status')

    act(() => store.set(stateOf({ current: null, groups: [], status: 'ready' })))
    expect(screen.getByText('No models available')).toBeVisible()

    act(() =>
      store.set(stateOf({ current: null, groups: [], status: 'error', error: 'offline' })),
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Model operation failed: offline')
  })

  it('submits the official model payload and closes after acceptance', async () => {
    const user = userEvent.setup()
    const { select } = renderSeat()
    const trigger = await enterModelPane(user)
    await user.click(screen.getByRole('menuitemradio', { name: 'Beta' }))
    expect(select).toHaveBeenCalledWith({ provider: 'provider-a', model: 'beta' })
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('omits reasoningEffort when selecting the provider default', async () => {
    const user = userEvent.setup()
    const { select } = renderSeat()
    await user.click(screen.getByRole('button', { name: /Select model/ }))
    await user.click(screen.getByRole('menuitem', { name: /^Effort/ }))
    await user.click(screen.getByRole('menuitemradio', { name: 'Default' }))
    expect(select).toHaveBeenCalledWith({ provider: 'provider-a', model: 'alpha' })
  })

  it('submits an explicit adapter-owned reasoning effort', async () => {
    const user = userEvent.setup()
    const { select } = renderSeat()
    await user.click(screen.getByRole('button', { name: /Select model/ }))
    await user.click(screen.getByRole('menuitem', { name: /^Effort/ }))
    await user.click(screen.getByRole('menuitemradio', { name: 'Low' }))
    expect(select).toHaveBeenCalledWith({
      provider: 'provider-a',
      model: 'alpha',
      reasoningEffort: 'low',
    })
  })

  it('keeps the menu open and shows a toast after a rejected selection', async () => {
    const user = userEvent.setup()
    const initial = stateOf()
    const store = new TestStore(initial)
    const select = vi.fn(async () => {
      act(() => store.set({ ...initial, status: 'error', error: 'denied' }))
      return false
    })
    render(
      <CollapsibleModelSelect
        locked={false}
        available
        directory={store}
        load={vi.fn()}
        select={select}
        preferences={new TestPreferencesStore()}
        t={t}
      />,
    )
    await enterModelPane(user)
    await user.click(screen.getByRole('menuitemradio', { name: 'Beta' }))
    expect(await screen.findByTestId('toast')).toHaveTextContent(
      'Model operation failed: denied',
    )
    expect(screen.getByRole('menu')).toBeVisible()
  })

  it('wires aria-controls to a labelled group and disables choices while selecting', async () => {
    const user = userEvent.setup()
    renderSeat(stateOf({ status: 'selecting' }))
    await enterModelPane(user)
    const header = screen.getByRole('menuitem', { name: 'Provider A 2' })
    expect(header).toBeDisabled()
    const listId = header.getAttribute('aria-controls')
    expect(listId).not.toBeNull()
    const group = document.getElementById(listId ?? '')
    expect(group).toHaveAttribute('role', 'group')
    expect(group).toHaveAttribute('aria-labelledby', header.id)
    expect(within(group as HTMLElement).getAllByRole('menuitemradio')).toHaveLength(2)
    expect(within(group as HTMLElement).getAllByRole('menuitemradio')[0]).toBeDisabled()
  })

  it('applies density and motion preferences reactively', async () => {
    const user = userEvent.setup()
    const preferences = new TestPreferencesStore({ density: 'compact', motion: 'none' })
    const { container } = renderSeat(stateOf(), { preferences })
    const root = container.firstElementChild
    expect(root).toHaveAttribute('data-density', 'compact')
    expect(root).toHaveAttribute('data-motion', 'none')

    await enterModelPane(user)
    const description = screen.getByText('Fast model')
    expect(description).toHaveStyle({ width: '1px', height: '1px', position: 'absolute' })
    const providerA = screen.getByRole('menuitem', { name: 'Provider A 2' })
    const body = document.getElementById(providerA.getAttribute('aria-controls') ?? '')
    expect(getComputedStyle(body as HTMLElement).transition).toBe('none')

    act(() => preferences.set({ density: 'comfortable', motion: 'system' }))
    expect(root).toHaveAttribute('data-density', 'comfortable')
    expect(root).toHaveAttribute('data-motion', 'system')
  })

  it('opens from the trigger with ArrowDown and focuses the first menu item', async () => {
    const user = userEvent.setup()
    const { load } = renderSeat()
    const trigger = screen.getByRole('button', { name: /Select model/ })
    trigger.focus()

    await user.keyboard('{ArrowDown}')

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(load).toHaveBeenCalledTimes(2)
    await waitFor(() =>
      expect(screen.getByRole('menuitem', { name: /^Model/ })).toHaveFocus(),
    )
  })
})
