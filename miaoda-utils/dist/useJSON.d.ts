import { CachedPromiseOptions } from "./useCachedPromise";
import { FunctionReturningPaginatedPromise, UseCachedPromiseReturnType } from "./types";
type Options<T> = {
    /**
     * The name of the file where the JSON will be cached.
     * Defaults to `cache.json`.
     */
    fileName?: string;
    /**
     * The folder where the cache file should be saved.
     * Defaults to the extension's support `environment.supportPath`.
     *
     * @remark If the folder doesn't exist, the hook will try to create it, and any intermediate folders.
     */
    folder?: string;
    /**
     * A function to decide whether a particular item should be kept or not.
     * Defaults to `undefined`.
     *
     * @remark The hook will revalidate every time the filter function changes, so you need to use [useCallback](https://react.dev/reference/react/useCallback) to make sure it only changes when it needs to.
     */
    filter?: (item: T) => boolean;
    /**
     * The amount of items to return for each page.
     * Defaults to `20`.
     */
    pageSize?: number;
};
/**
 * Takes a `http://`, `https://` or `file:///` URL pointing to a JSON resource, caches it to the command's support
 * folder, and streams through its content. Useful when dealing with large JSON arrays which would be too big to fit
 * in the command's memory.
 *
 * @remark The JSON resource needs to consist of an array of objects
 *
 * @example
 * ```
 * import { List } from "@raycast/api";
 * import { useJSON } from "@raycast/utils";
 *
 * type Formula = { name: string; desc?: string };
 *
 * export default function Main(): JSX.Element {
 *   const { data, isLoading, pagination } = useJSON<Formula>("https://formulae.brew.sh/api/formula.json");
 *
 *   return (
 *     <List isLoading={isLoading} pagination={pagination}>
 *       <List.Section title="Formulae">
 *         {data?.map((d) => <List.Item key={d.name} title={d.name} subtitle={d.desc} />)}
 *       </List.Section>
 *     </List>
 *   );
 * }
 * ```
 *
 * @example
 * ```
 * import { List } from "@raycast/api";
 * import { useJSON } from "@raycast/utils";
 * import { homedir } from "os";
 * import { join } from "path";
 *
 * type Formula = { name: string; desc?: string };
 *
 * export default function Main(): JSX.Element {
 *   const { data, isLoading, pagination } = useJSON<Formula>(`file:///${join(homedir(), "Downloads", "formulae.json")}`);
 *
 *   return (
 *     <List isLoading={isLoading} pagination={pagination}>
 *       <List.Section title="Formulae">
 *         {data?.map((d) => <List.Item key={d.name} title={d.name} subtitle={d.desc} />)}
 *       </List.Section>
 *     </List>
 *   );
 * }
 * ```
 */
export declare function useJSON<T, U = unknown>(url: RequestInfo): UseCachedPromiseReturnType<T[], U>;
/**
 * Takes a `http://`, `https://` or `file:///` URL pointing to a JSON resource, caches it to the command's support
 * folder, and streams through its content. Useful when dealing with large JSON arrays which would be too big to fit
 * in the command's memory.
 *
 * @remark The JSON resource needs to consist of an array of objects
 *
 * @example
 * ```
 * import { List, environment } from "@raycast/api";
 * import { useJSON } from "@raycast/utils";
 * import { join } from 'path';
 * import { useCallback, useState } from "react";
 *
 * type Formula = { name: string; desc?: string };
 *
 * export default function Main(): JSX.Element {
 *   const [searchText, setSearchText] = useState("");
 *
 *   const formulaFilter = useCallback(
 *     (item: Formula) => {
 *       if (!searchText) return true;
 *       return item.name.toLocaleLowerCase().includes(searchText);
 *     },
 *     [searchText],
 *   );
 *
 *   const { data, isLoading, pagination } = useJSON("https://formulae.brew.sh/api/formula.json", {
 *     initialData: [] as Formula[],
 *     pageSize: 20,
 *     folder: join(environment.supportPath, "cache"),
 *     fileName: "formulae",
 *     filter: formulaFilter,
 *   });
 *
 *   return (
 *     <List isLoading={isLoading} pagination={pagination} onSearchTextChange={setSearchText}>
 *       <List.Section title="Formulae">
 *         {data.map((d) => (
 *           <List.Item key={d.name} title={d.name} subtitle={d.desc} />
 *         ))}
 *       </List.Section>
 *     </List>
 *   );
 * }
 * ``` support folder, and streams through its content.
 *
 * @example
 * ```
 * import { List, environment } from "@raycast/api";
 * import { useJSON } from "@raycast/utils";
 * import { join } from "path";
 * import { homedir } from "os";
 * import { useCallback, useState } from "react";
 *
 * type Formula = { name: string; desc?: string };
 *
 * export default function Main(): JSX.Element {
 *   const [searchText, setSearchText] = useState("");
 *
 *   const formulaFilter = useCallback(
 *     (item: Formula) => {
 *       if (!searchText) return true;
 *       return item.name.toLocaleLowerCase().includes(searchText);
 *     },
 *     [searchText],
 *   );
 *
 *   const { data, isLoading, pagination } = useJSON(`file:///${join(homedir(), "Downloads", "formulae.json")}`, {
 *     initialData: [] as Formula[],
 *     pageSize: 20,
 *     folder: join(environment.supportPath, "cache"),
 *     fileName: "formulae",
 *     filter: formulaFilter,
 *   });
 *
 *   return (
 *     <List isLoading={isLoading} pagination={pagination} onSearchTextChange={setSearchText}>
 *       <List.Section title="Formulae">
 *         {data.map((d) => (
 *           <List.Item key={d.name} title={d.name} subtitle={d.desc} />
 *         ))}
 *       </List.Section>
 *     </List>
 *   );
 * }
 * ```
 */
export declare function useJSON<T, U extends any[] = any[]>(url: RequestInfo, options: Options<T> & RequestInit & Omit<CachedPromiseOptions<FunctionReturningPaginatedPromise, U>, "abortable">): UseCachedPromiseReturnType<T[], U>;
export {};
//# sourceMappingURL=useJSON.d.ts.map