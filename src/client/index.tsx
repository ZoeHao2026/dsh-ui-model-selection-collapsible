import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'

import { CollapsibleModelSelect } from './CollapsibleModelSelect.js'
import { ChatModelSelect } from './ChatModelSelect.js'
import { SettingsSection } from './SettingsSection.js'
import { dictionaries, SETTINGS_LOCALE_NS } from './locales.js'
import { BrowserPreferencesStore } from './preferences.js'

export const inject = ['slots', 'sessions', 'locale']

/**
 * Mount the custom priority -1 seat only while the official model directory
 * service exists. The official priority 0 seat remains registered as fallback.
 */
export function apply(ctx: ClientContext): void {
  const preferences = new BrowserPreferencesStore()
  ctx.effect(
    () => () => preferences.dispose(),
    'ui-model-selection-collapsible: browser preference storage',
  )
  ctx.effect(
    () => ctx.locale.register(SETTINGS_LOCALE_NS, dictionaries),
    'ui-model-selection-collapsible: settings dictionaries',
  )

  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      {
        name: 'settings.section',
        id: 'model-selection-collapsible',
        order: 30,
        label: () => ctx.locale.bind(SETTINGS_LOCALE_NS)('nav'),
        locale: SETTINGS_LOCALE_NS,
        inject: () => ({ preferences }),
      },
      SettingsSection,
    ),
  )

  // Standalone-chat model seat (declared by dsh-standalone-chat): reuse the
  // collapsible selector against the chat page's directory adapter. The seat
  // is only declared while the chat plugin is installed, so this injection
  // waits for its declaration and stays inert otherwise.
  ctx.slots.inject('chat.input.model', () =>
    ctx.slots.register(
      {
        name: 'chat.input.model',
        locale: 'model',
        inject: () => ({ preferences }),
      },
      ChatModelSelect,
    ),
  )

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
              preferences,
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
