/// <reference types="react" />
import { PromiseOptions } from "../src/usePromise";
/**
 * Executes a query on a local SQL database and returns the {@link AsyncState} corresponding to the query of the command. The last value will be kept between command runs.
 *
 * @example
 * ```
 * import { useSQL } from "@raycast/utils";
 * import { resolve } from "path";
 * import { homedir } from "os";
 *
 * const NOTES_DB = resolve(homedir(), "Library/Group Containers/group.com.apple.notes/NoteStore.sqlite");
 * const notesQuery = `SELECT id, title FROM ...`;
 * type NoteItem = {
 *   id: string;
 *   title: string;
 * };
 *
 * export default function Command() {
 *   const { isLoading, data, permissionView } = useSQL<NoteItem>(NOTES_DB, notesQuery);
 *
 *   if (permissionView) {
 *     return permissionView;
 *   }
 *
 *   return (
 *     <List isLoading={isLoading}>
 *       {(data || []).map((item) => (
 *         <List.Item key={item.id} title={item.title} />
 *       ))}
 *     </List>
 *  );
 * };
 * ```
 */
export declare function useSQL<T = unknown>(databasePath: string, query: string, options?: {
    /** A string explaining why the extension needs full disk access. For example, the Apple Notes extension uses `"This is required to search your Apple Notes."`. While it is optional, we recommend setting it to help users understand. */
    permissionPriming?: string;
} & Omit<PromiseOptions<(database: string, query: string) => Promise<T[]>>, "abortable">): {
    permissionView: JSX.Element | undefined;
    isLoading: boolean;
    error?: undefined;
    data?: undefined;
    pagination?: {
        pageSize: number;
        hasMore: boolean;
        onLoadMore: () => void;
    } | undefined;
    revalidate: () => Promise<T[]>;
    mutate: import("../src/types").MutatePromise<T[], undefined, any>;
} | {
    permissionView: JSX.Element | undefined;
    isLoading: false;
    error: Error;
    data?: undefined;
    pagination?: {
        pageSize: number;
        hasMore: boolean;
        onLoadMore: () => void;
    } | undefined;
    revalidate: () => Promise<T[]>;
    mutate: import("../src/types").MutatePromise<T[], undefined, any>;
} | {
    permissionView: JSX.Element | undefined;
    isLoading: true;
    error?: Error | undefined;
    data?: T[] | undefined;
    pagination?: {
        pageSize: number;
        hasMore: boolean;
        onLoadMore: () => void;
    } | undefined;
    revalidate: () => Promise<T[]>;
    mutate: import("../src/types").MutatePromise<T[], undefined, any>;
} | {
    permissionView: JSX.Element | undefined;
    isLoading: false;
    error?: undefined;
    data: T[];
    pagination?: {
        pageSize: number;
        hasMore: boolean;
        onLoadMore: () => void;
    } | undefined;
    revalidate: () => Promise<T[]>;
    mutate: import("../src/types").MutatePromise<T[], undefined, any>;
};
//# sourceMappingURL=useSQL.d.ts.map