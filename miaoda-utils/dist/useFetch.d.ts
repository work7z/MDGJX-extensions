import { CachedPromiseOptions } from "../src/useCachedPromise";
import { UseCachedPromiseReturnType } from "../src/types";
type PaginatedRequestInfo = (pagination: {
    page: number;
    lastItem?: any;
    cursor?: any;
}) => RequestInfo;
/**
 * Fetches the paginatedURL and returns the {@link AsyncState} corresponding to the execution of the fetch. The last value will be kept between command runs.
 *
 * @remark This overload should be used when working with paginated data sources.
 * @remark When paginating, only the first page will be cached.
 *
 * @example
 * ```
 * import { Icon, Image, List } from "@raycast/api";
 * import { useFetch } from "@raycast/utils";
 * import { useState } from "react";
 *
 * type SearchResult = { companies: Company[]; page: number; totalPages: number };
 * type Company = { id: number; name: string; smallLogoUrl?: string };
 * export default function Command() {
 *   const [searchText, setSearchText] = useState("");
 *   const { isLoading, data, pagination } = useFetch(
 *     (options) =>
 *       "https://api.ycombinator.com/v0.1/companies?" +
 *       new URLSearchParams({ page: String(options.page + 1), q: searchText }).toString(),
 *     {
 *       mapResult(result: SearchResult) {
 *         return {
 *           data: result.companies,
 *           hasMore: result.page < result.totalPages,
 *         };
 *       },
 *       keepPreviousData: true,
 *       initialData: [],
 *     },
 *   );
 *
 *   return (
 *     <List isLoading={isLoading} pagination={pagination} onSearchTextChange={setSearchText}>
 *       {data.map((company) => (
 *         <List.Item
 *           key={company.id}
 *           icon={{ source: company.smallLogoUrl ?? Icon.MinusCircle, mask: Image.Mask.RoundedRectangle }}
 *           title={company.name}
 *         />
 *       ))}
 *     </List>
 *   );
 * }
 * ```
 */
export declare function useFetch<V = unknown, U = undefined, T extends unknown[] = unknown[]>(url: PaginatedRequestInfo, options: RequestInit & {
    mapResult: (result: V) => {
        data: T;
        hasMore?: boolean;
        cursor?: any;
    };
    parseResponse?: (response: Response) => Promise<V>;
} & Omit<CachedPromiseOptions<(url: RequestInfo, options?: RequestInit) => Promise<T>, U>, "abortable">): UseCachedPromiseReturnType<T, U>;
/**
 * Fetch the URL and returns the {@link AsyncState} corresponding to the execution of the fetch. The last value will be kept between command runs.
 *
 * @example
 * ```
 * import { useFetch } from '@raycast/utils';
 *
 * export default function Command() {
 *   const { isLoading, data, revalidate } = useFetch('https://api.example');
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
export declare function useFetch<V = unknown, U = undefined, T = V>(url: RequestInfo, options?: RequestInit & {
    mapResult?: (result: V) => {
        data: T;
        hasMore?: boolean;
        cursor?: any;
    };
    parseResponse?: (response: Response) => Promise<V>;
} & Omit<CachedPromiseOptions<(url: RequestInfo, options?: RequestInit) => Promise<T>, U>, "abortable">): UseCachedPromiseReturnType<T, U> & {
    pagination: undefined;
};
export {};
//# sourceMappingURL=useFetch.d.ts.map