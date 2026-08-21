import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client';
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client';
import type { ProviderDisclosure } from './preferences.js';
export type ProviderGroup = ModelDirectoryState['groups'][number];
export type ProviderModel = ProviderGroup['models'][number];
export interface ModelChoice {
    group: ProviderGroup;
    model: ProviderModel;
    selection: ModelSelection;
}
export declare function choicesOf(groups: ModelDirectoryState['groups']): ModelChoice[];
export declare function currentChoiceOf(choices: readonly ModelChoice[], current: ModelSelection | null): ModelChoice | undefined;
export declare function defaultExpanded(current: ModelChoice | undefined, groups: ModelDirectoryState['groups'], disclosure: ProviderDisclosure): Set<string>;
export declare function toggled(expanded: ReadonlySet<string>, providerId: string, disclosure: ProviderDisclosure): Set<string>;
//# sourceMappingURL=model-state.d.ts.map