import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client'

export type ProviderGroup = ModelDirectoryState['groups'][number]
export type ProviderModel = ProviderGroup['models'][number]

export interface ModelChoice {
  group: ProviderGroup
  model: ProviderModel
  selection: ModelSelection
}

export function choicesOf(groups: ModelDirectoryState['groups']): ModelChoice[] {
  return groups.flatMap((group) =>
    group.models.map((model) => ({
      group,
      model,
      selection: {
        provider: group.id,
        model: model.id,
        ...(model.reasoning?.defaultEffort === undefined
          ? {}
          : { reasoningEffort: model.reasoning.defaultEffort }),
      },
    })),
  )
}

export function currentChoiceOf(
  choices: readonly ModelChoice[],
  current: ModelSelection | null,
): ModelChoice | undefined {
  if (current === null) return undefined
  return choices.find(
    (choice) =>
      choice.selection.provider === current.provider && choice.selection.model === current.model,
  )
}

export function defaultExpanded(current: ModelChoice | undefined): Set<string> {
  return current === undefined ? new Set() : new Set([current.group.id])
}

export function toggled(expanded: ReadonlySet<string>, providerId: string): Set<string> {
  const next = new Set(expanded)
  if (next.has(providerId)) next.delete(providerId)
  else next.add(providerId)
  return next
}
