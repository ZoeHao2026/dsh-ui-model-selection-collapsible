import { describe, expect, it } from 'vitest'

import { choicesOf, currentChoiceOf, defaultExpanded, toggled } from '../src/client/model-state.js'
import { groups } from './helpers.js'

describe('model state selectors', () => {
  it('flattens provider models without changing adapter ids', () => {
    const choices = choicesOf(groups)
    expect(choices.map((choice) => choice.selection)).toEqual([
      { provider: 'provider-a', model: 'alpha' },
      { provider: 'provider-a', model: 'beta' },
      { provider: 'provider-b', model: 'gamma' },
    ])
  })

  it('expands only an exact advertised current model', () => {
    const choices = choicesOf(groups)
    const current = currentChoiceOf(choices, { provider: 'provider-b', model: 'gamma' })
    expect([...defaultExpanded(current, groups, 'current')]).toEqual(['provider-b'])
    expect(
      defaultExpanded(
        currentChoiceOf(choices, { provider: 'provider-b', model: 'not-advertised' }),
        groups,
        'current',
      ).size,
    ).toBe(0)
  })

  it('supports all disclosure defaults and accordion toggling', () => {
    const current = currentChoiceOf(choicesOf(groups), {
      provider: 'provider-a',
      model: 'alpha',
    })
    expect([...defaultExpanded(current, groups, 'all')]).toEqual(['provider-a', 'provider-b'])
    expect([...defaultExpanded(current, groups, 'none')]).toEqual([])
    expect([...defaultExpanded(current, groups, 'accordion')]).toEqual(['provider-a'])

    expect([...toggled(new Set(['provider-a']), 'provider-b', 'accordion')]).toEqual([
      'provider-b',
    ])
    expect([...toggled(new Set(['provider-b']), 'provider-b', 'accordion')]).toEqual([])
  })

  it('toggles providers independently without mutating the old set', () => {
    const before = new Set(['provider-a'])
    const after = toggled(before, 'provider-b', 'current')
    expect([...before]).toEqual(['provider-a'])
    expect([...after]).toEqual(['provider-a', 'provider-b'])
    expect([...toggled(after, 'provider-a', 'current')]).toEqual(['provider-b'])
  })
})
