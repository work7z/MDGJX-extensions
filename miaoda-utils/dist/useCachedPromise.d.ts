import { FunctionReturningPromise, UseCachedPromiseReturnType, FunctionReturningPaginatedPromise, UnwrapReturn } from "../src/types";
import { PromiseOptions } from "../src/usePromise";
export type CachedPromiseOptions<T extends FunctionReturningPromise | FunctionReturningPaginatedPromise, U> = PromiseOptions<T> & {
    /**
     * The initial data if there aren't any in the Cache yet.
     */
    initialData?: U;
    /**
     * Tells the hook to keep the previous results instead of returning the initial value
     * if there aren't any in the cache for the new arguments.
     * This is particularly useful when used for data for a List to avoid flickering.
     */
    keepPreviousData?: boolean;
};
/**
 * Wraps an asynchronous function or a function that returns a Promise in another function, and returns the {@link AsyncState} corresponding to the execution of the function. The last value will be kept between command runs.
 *
 * @remark This overload should be used when working with paginated data sources.
 * @remark When paginating, only the first page will be cached.
 *
 * @example
 * ```
 * import { setTimeout } from "node:timers/promises";
 * import { useState } from "react";
 * import { List } from "@raycast/api";
 * import { useCachedPromise } from "@raycast/utils";
 *
 * export default function Command() {
 *   const [searchText, setSearchText] = useState("");
 *
 *   const { isLoading, data, pagination } = useCachedPromise(
 *     (searchText: string) => async (options: { page: number }) => {
 *       await setTimeout(200);
 *       const newData = Array.from({ length: 25 }, (_v, index) => ({
 *         index,
 *         page: options.page,
 *         text: searchText,
 *       }));
 *       return { data: newData, hasMore: options.page < 10 };
 *     },
 *     [searchText],
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
 * }
 * ```
 */
export declare function useCachedPromise<T extends FunctionReturningPaginatedPromise<[]>>(fn: T): UseCachedPromiseReturnType<UnwrapReturn<T>, undefined>;
export declare function useCachedPromise<T extends FunctionReturningPaginatedPromise, U extends any[] = any[]>(fn: T, args: Parameters<T>, options?: CachedPromiseOptions<T, U>): UseCachedPromiseReturnType<UnwrapReturn<T>, U>;
/**
 * Wraps an asynchronous function or a function that returns a Promise and returns the {@link AsyncState} corresponding to the execution of the function. The last value will be kept between command runs.
 *
 * @remark The value needs to be JSON serializable.
 * @remark The function is assumed to be constant (eg. changing it won't trigger a revalidation).
 *
 * @example
 * ```
 * import { useCachedPromise } from '@raycast/utils';
 *
 * export default function Command() {
 *   const abortable = useRef<AbortController>();
 *   const { isLoading, data, revalidate } = useCachedPromise(async (url: string) => {
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
export declare function useCachedPromise<T extends FunctionReturningPromise<[]>>(fn: T): UseCachedPromiseReturnType<UnwrapReturn<T>, undefined>;
export declare function useCachedPromise<T extends FunctionReturningPromise, U = undefined>(fn: T, args: Parameters<T>, options?: CachedPromiseOptions<T, U>): UseCachedPromiseReturnType<UnwrapReturn<T>, U>;
//# sourceMappingURL=useCachedPromise.d.ts.map