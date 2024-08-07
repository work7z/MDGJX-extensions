import { MutableRefObject } from "react";
import { Toast } from "@raycast/api";
import { FunctionReturningPromise, UsePromiseReturnType, FunctionReturningPaginatedPromise, UnwrapReturn, PaginationOptions } from "../src/types";
export type PromiseOptions<T extends FunctionReturningPromise | FunctionReturningPaginatedPromise> = {
    /**
     * A reference to an `AbortController` to cancel a previous call when triggering a new one
     */
    abortable?: MutableRefObject<AbortController | null | undefined>;
    /**
     * Whether to actually execute the function or not.
     * This is useful for cases where one of the function's arguments depends on something that
     * might not be available right away (for example, depends on some user inputs). Because React requires
     * every hooks to be defined on the render, this flag enables you to define the hook right away but
     * wait util you have all the arguments ready to execute the function.
     */
    execute?: boolean;
    /**
     * Options for the generic failure toast.
     * It allows you to customize the title, message, and primary action of the failure toast.
     */
    failureToastOptions?: Partial<Pick<Toast.Options, "title" | "primaryAction" | "message">>;
    /**
     * Called when an execution fails. By default it will log the error and show
     * a generic failure toast.
     */
    onError?: (error: Error) => void | Promise<void>;
    /**
     * Called when an execution succeeds.
     */
    onData?: (data: UnwrapReturn<T>, pagination?: PaginationOptions<UnwrapReturn<T>>) => void | Promise<void>;
    /**
     * Called when an execution will start
     */
    onWillExecute?: (parameters: Parameters<T>) => void;
};
/**
 * Wraps an asynchronous function or a function that returns a Promise in another function, and returns the {@link AsyncState} corresponding to the execution of the function.
 *
 * @remark This overload should be used when working with paginated data sources.
 *
 * @example
 * ```
 * import { setTimeout } from "node:timers/promises";
 * import { useState } from "react";
 * import { List } from "@raycast/api";
 * import { usePromise } from "@raycast/utils";
 *
 * export default function Command() {
 *   const [searchText, setSearchText] = useState("");
 *
 *   const { isLoading, data, pagination } = usePromise(
 *     (searchText: string) => async (options: { page: number }) => {
 *       await setTimeout(200);
 *       const newData = Array.from({ length: 25 }, (_v, index) => ({
 *         index,
 *         page: options.page,
 *         text: searchText,
 *       }));
 *       return { data: newData, hasMore: options.page < 10 };
 *     },
 *     [searchText]
 *   );
 *
 *   return (
 *     <List isLoading={isLoading} onSearchTextChange={setSearchText} pagination={pagination}>
 *       {data?.map((item) => (
 *         <List.Item
 *           key={`${item.page} ${item.index} ${item.text}`}
 *           title={`Page ${item.page} Item ${item.index}`}
 *           subtitle={item.text}
 *         />
 *       ))}
 *     </List>
 *   );
 * };
 * ```
 */
export declare function usePromise<T extends FunctionReturningPaginatedPromise<[]>>(fn: T): UsePromiseReturnType<UnwrapReturn<T>>;
export declare function usePromise<T extends FunctionReturningPaginatedPromise>(fn: T, args: Parameters<T>, options?: PromiseOptions<T>): UsePromiseReturnType<UnwrapReturn<T>>;
/**
 * Wraps an asynchronous function or a function that returns a Promise and returns the {@link AsyncState} corresponding to the execution of the function.
 *
 * @remark The function is assumed to be constant (eg. changing it won't trigger a revalidation).
 *
 * @example
 * ```
 * import { usePromise } from '@raycast/utils';
 *
 * export default function Command() {
 *   const abortable = useRef<AbortController>();
 *   const { isLoading, data, revalidate } = usePromise(async (url: string) => {
 *     const response = await fetch(url, { signal: abortable.current?.signal });
 *     const result = await response.text();
 *     return result
 *   },
 *   ['https://api.example'],
 *   {
 *     abortable
 *   });
 *
 *   return (
 *     <Detail
 *       isLoading={isLoading}
 *       markdown={data}
 *       actions={
 *         <ActionPanel>
 *           <Action title="Reload" onAction={() => revalidate()} />
 *         </ActionPanel>
 *       }
 *     />
 *   );
 * };
 * ```
 */
export declare function usePromise<T extends FunctionReturningPromise<[]>>(fn: T): UsePromiseReturnType<UnwrapReturn<T>>;
export declare function usePromise<T extends FunctionReturningPromise>(fn: T, args: Parameters<T>, options?: PromiseOptions<T>): UsePromiseReturnType<UnwrapReturn<T>>;
//# sourceMappingURL=usePromise.d.ts.map