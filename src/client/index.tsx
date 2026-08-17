import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-model-selection/client'

import { CollapsibleModelSelect } from './CollapsibleModelSelect.js'

export const inject = ['slots', 'sessions', 'locale']

/**
 * Mount the custom priority -1 seat only while the official model directory
 * service exists. The official priority 0 seat remains registered as fallback.
 */
export function apply(ctx: ClientContext): void {
  ctx.inject(['modelDirectories'], (scope) => {
    const models = scope.modelDirectories
    if (typeof models?.directoryFor !== 'function') return

    const sessions = scope.sessions
    scope.slots.inject('conversation.input.model', () =>
      scope.slots.register(
        {
          name: 'conversation.input.model',
          locale: 'model',
          priority: -1,
          inject: (sessionId) => {
            const directory = models.directoryFor(sessionId)
            const available = sessions.subagentAddress(sessionId) === undefined

            return {
              available,
              directory: directory.store,
              load: () => {
                if (available) void directory.load().catch(() => undefined)
              },
              select: (selection: ModelSelection) =>
                available
                  ? directory.select(selection).then(
                      () => true,
                      () => false,
                    )
                  : Promise.resolve(false),
            }
          },
        },
        CollapsibleModelSelect,
      ),
    )
  })
}
