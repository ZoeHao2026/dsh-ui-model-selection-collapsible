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
    expect([...defaultExpanded(current)]).toEqual(['provider-b'])
    expect(
      defaultExpanded(
        currentChoiceOf(choices, { provider: 'provider-b', model: 'not-advertised' }),
      ).size,
    ).toBe(0)
  })

  it('toggles providers independently without mutating the old set', () => {
    const before = new Set(['provider-a'])
    const after = toggled(before, 'provider-b')
    expect([...before]).toEqual(['provider-a'])
    expect([...after]).toEqual(['provider-a', 'provider-b'])
    expect([...toggled(after, 'provider-a')]).toEqual(['provider-b'])
  })
})
