import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
export declare const inject: string[];
/**
 * Mount the custom priority -1 seat only while the official model directory
 * service exists. The official priority 0 seat remains registered as fallback.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map