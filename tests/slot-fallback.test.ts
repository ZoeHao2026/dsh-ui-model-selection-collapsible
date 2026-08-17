import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { SlotCore, type PropsRenderSlots } from '@deepseek-ai/dsh-client-ui-slots'
import { describe, expect, it } from 'vitest'

describe('slot fallback lifecycle', () => {
  it('renders custom -1 ahead of official 0 and restores official after disposal', () => {
    const core = new SlotCore()
    const root = (_props: PropsRenderSlots<'conversation.input.model'>) => null
    const official = () => null
    const custom = () => null
    const disposeDeclaration = core.register(
      {
        name: 'root',
        children: {
          'conversation.input.model': { kind: 'single', scope: 'session' },
        },
      },
      root,
    )
    const disposeOfficial = core.register(
      {
        name: 'conversation.input.model',
        registrant: '@deepseek-ai/dsh-client-ui-model-selection',
      },
      official,
    )
    const disposeCustom = core.register(
      {
        name: 'conversation.input.model',
        priority: -1,
        registrant: '@local/dsh-ui-model-selection-collapsible',
      },
      custom,
    )

    expect(core.entries('conversation.input.model').map((entry) => entry.options.priority ?? 0)).toEqual([
      -1,
      0,
    ])
    expect(core.entriesOfSlot('conversation.input.model')[0]?.component).toBe(custom)

    disposeCustom()
    expect(core.entriesOfSlot('conversation.input.model')[0]?.component).toBe(official)

    disposeOfficial()
    disposeDeclaration()
    expect(core.entries('conversation.input.model')).toEqual([])
  })
})
