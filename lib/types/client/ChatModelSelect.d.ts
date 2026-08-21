import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client';
import type { ModelDirectoryState } from '@deepseek-ai/dsh-client-ui-model-selection/client';
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import type { PreferencesStore } from './preferences.js';
/**
 * Contract of the `chat.input.model` seat declared by the standalone chat
 * page (dsh-standalone-chat). The chat page supplies the inject face below;
 * this package only contributes the occupant, reusing CollapsibleModelSelect
 * against a directory adapter backed by the chat conversation's model state.
 */
export interface ChatModelDirectoryFace {
    getDirectory(): {
        subscribe(listener: () => void): () => void;
        getSnapshot(): {
            groups: ModelDirectoryState['groups'];
            current: ModelSelection | null;
            available: boolean;
            locked: boolean;
        };
    };
    load(): void;
    select(selection: ModelSelection): Promise<boolean>;
}
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface SlotMap {
        'chat.input.model': {
            kind: 'single';
            scope: 'root';
            owner: Record<never, never>;
            inject: ChatModelDirectoryFace;
        };
    }
}
export type ChatModelSelectProps = PropsLocale<'model'> & ChatModelDirectoryFace & {
    preferences: PreferencesStore;
};
/** Occupant of the standalone-chat model seat: collapsible UI over the chat directory. */
export declare function ChatModelSelect({ t, preferences, getDirectory, load, select }: ChatModelSelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatModelSelect.d.ts.map