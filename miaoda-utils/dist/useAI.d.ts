import { AI } from "@raycast/api";
import { PromiseOptions } from "../src/usePromise";
import { FunctionReturningPromise } from "../src/types";
/**
 * Stream a prompt completion.
 *
 * @example
 * ```typescript
 * import { Detail, LaunchProps } from "@raycast/api";
 * import { use AI } from "@raycast/utils";
 *
 * export default function Command(props: LaunchProps<{ arguments: { prompt: string } }>) {
 *   const { isLoading, data } = useAI(props.arguments.prompt);
 *
 *   return <Detail isLoading={isLoading} markdown={data} />;
 * }
 * ```
 */
export declare function useAI(prompt: string, options?: {
    /**
     * Concrete tasks, such as fixing grammar, require less creativity while open-ended questions, such as generating ideas, require more.
     * If a number is passed, it needs to be in the range 0-2. For larger values, 2 will be used. For lower values, 0 will be used.
     */
    creativity?: AI.Creativity;
    /**
     * The AI model to use to answer to the prompt.
     */
    model?: AI.Model;
    /**
     * Whether to stream the answer or only update the data when the entire answer has been received.
     */
    stream?: boolean;
} & Omit<PromiseOptions<FunctionReturningPromise>, "abortable">): {
    isLoading: boolean;
    data: string;
    error: Error | undefined;
    revalidate: () => Promise<void>;
};
//# sourceMappingURL=useAI.d.ts.map