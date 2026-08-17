import type { ModelSelectInjected } from '@deepseek-ai/dsh-client-ui-model-selection/client';
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import './styles.css';
export type CollapsibleModelSelectProps = ModelSelectInjected & {
    locked: boolean;
} & PropsLocale<'model'>;
export declare function CollapsibleModelSelect({ locked, available, directory, load, select, t, }: CollapsibleModelSelectProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=CollapsibleModelSelect.d.ts.map