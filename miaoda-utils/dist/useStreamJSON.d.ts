import { Flatten, FunctionReturningPaginatedPromise, UseCachedPromiseReturnType } from "../src/types";
import { CachedPromiseOptions } from "../src/useCachedPromise";
type Options<T> = {
    /**
     * The hook expects to iterate through an array of data, so by default, it assumes the JSON it receives itself represents an array. However, sometimes the array of data is wrapped in an object,
     * i.e. `{ "success": true, "data": […] }`, or even `{ "success": true, "results": { "data": […] } }`. In those cases, you can use `dataPath` to specify where the data array can be found.
     *
     * @remark If your JSON object has multiple arrays that you want to stream data from, you can pass a regular expression to stream through all of them.
     *
     * @example For `{ "success": true, "data": […] }`, dataPath would be `data`
     * @example For `{ "success": true, "results": { "data": […] } }`, dataPath would be `results.data`
     * @example For `{ "success": true, "results": { "first_list": […], "second_list": […], "third_list": […] } }`, dataPath would be `/^results\.(first_list|second_list|third_list)$
  /`.
     */
    dataPath?: string | RegExp;
    /**
     * A function to decide whether a particular item should be kept or not.
     * Defaults to `undefined`, keeping any encountered item.
     *
     * @remark The hook will revalidate every time the filter function changes, so you need to use [useCallback](https://react.dev/reference/react/useCallback) to make sure it only changes when it needs to.
     */
    filter?: (item: Flatten<T>) => boolean;
    /**
     * A function to apply to each item as it is encountered. Useful for a couple of things:
     * 1. ensuring that all items have the expected properties, and, as on optimization, for getting rid of the properties that you don't care about.
     * 2. when top-level objects actually represent nested data, which should be flattened. In this case, `transform` can return an array of items, and the hook will stream through each one of those items,
     * passing them to `filter` etc.
     *
     * Defaults to a passthrough function if not provided.
     *
     * @remark The hook will revalidate every time the transform function changes, so it is important to use [useCallback](https://react.dev/reference/react/useCallback) to ensure it only changes when necessary to prevent unnecessary re-renders or computations.
     *
     * @example
     * ```
     * // For data: `{ "data": [ { "type": "folder", "name": "item 1", "children": [ { "type": "item", "name": "item 2" }, { "type": "item", "name": "item 3" } ] }, { "type": "folder", "name": "item 4", children: [] } ] }`
     *
     * type Item = {
     *  type: "item";
     *  name: string;
     * };
     *
     * type Folder = {
     *   type: "folder";
     *   name: string;
     *   children: (Item | Folder)[];
     * };
     *
     * function flatten(item: Item | Folder): { name: string }[] {
     *   const flattened: { name: string }[] = [];
     *   if (item.type === "folder") {
     *     flattened.push(...item.children.map(flatten).flat());
     *   }
     *   if (item.type === "item") {
     *     flattened.push({ name: item.name });
     *   }
     *   return flattened;
     * }
     *
     * const transform = useCallback(flatten, []);
     * const filter = useCallback((item: { name: string }) => {
     *   …
     * })
     * ```
     */
    transform?: (item: any) => T;
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
 * import { useStreamJSON } from "@raycast/utils";
 *
 * type Formula = { name: string; desc?: string };
 *
 * export default function Main(): JSX.Element {
 *   const { data, isLoading, pagination } = useStreamJSON<Formula>("https://formulae.brew.sh/api/formula.json");
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
 * import { useStreamJSON } from "@raycast/utils";
 * import { homedir } from "os";
 * import { join } from "path";
 *
 * type Formula = { name: string; desc?: string };
 *
 * export default function Main(): JSX.Element {
 *   const { data, isLoading, pagination } = useStreamJSON<Formula>(`file:///${join(homedir(), "Downloads", "formulae.json")}`);
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
export declare function useStreamJSON<T, U = unknown>(url: RequestInfo): UseCachedPromiseReturnType<T, U>;
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
 * import { useStreamJSON } from "@raycast/utils";
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
 *   const formulaTransform = useCallback((item: any): Formula => {
 *     return { name: item.name, desc: item.desc };
 *   }, []);
 *
 *   const { data, isLoading, pagination } = useStreamJSON("https://formulae.brew.sh/api/formula.json", {
 *     initialData: [] as Formula[],
 *     pageSize: 20,
 *     filter: formulaFilter,
 *     transform: formulaTransform,
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
 * import { useStreamJSON } from "@raycast/utils";
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
 *   const formulaTransform = useCallback((item: any): Formula => {
 *     return { name: item.name, desc: item.desc };
 *   }, []);
 *
 *   const { data, isLoading, pagination } = useStreamJSON(`file:///${join(homedir(), "Downloads", "formulae.json")}`, {
 *     initialData: [] as Formula[],
 *     pageSize: 20,
 *     filter: formulaFilter,
 *     transform: formulaTransform,
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
export declare function useStreamJSON<T, U extends any[] = any[]>(url: RequestInfo, options: Options<T> & RequestInit & Omit<CachedPromiseOptions<FunctionReturningPaginatedPromise, U>, "abortable">): UseCachedPromiseReturnType<T extends unknown[] ? T : T[], U>;
export {};
//# sourceMappingURL=useStreamJSON.d.ts.map