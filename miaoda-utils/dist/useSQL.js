"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSQL = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const api_1 = require("@raycast/api");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_os_1 = __importDefault(require("node:os"));
const node_child_process_1 = __importDefault(require("node:child_process"));
const node_path_1 = __importDefault(require("node:path"));
const object_hash_1 = __importDefault(require("object-hash"));
const react_1 = require("react");
const usePromise_1 = require("./usePromise");
const useLatest_1 = require("./useLatest");
const exec_utils_1 = require("./exec-utils");
const showFailureToast_1 = require("./showFailureToast");
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
function useSQL(databasePath, query, options) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { permissionPriming, ...usePromiseOptions } = options || {};
    const [permissionView, setPermissionView] = (0, react_1.useState)();
    const latestOptions = (0, useLatest_1.useLatest)(options || {});
    const abortable = (0, react_1.useRef)();
    const handleError = (0, react_1.useCallback)((_error) => {
        console.error(_error);
        const error = _error instanceof Error && _error.message.includes("authorization denied")
            ? new PermissionError("You do not have permission to access the database.")
            : _error;
        if (isPermissionError(error)) {
            setPermissionView((0, jsx_runtime_1.jsx)(PermissionErrorScreen, { priming: latestOptions.current.permissionPriming }));
        }
        else {
            if (latestOptions.current.onError) {
                latestOptions.current.onError(error);
            }
            else {
                if (api_1.environment.launchType !== api_1.LaunchType.Background) {
                    (0, showFailureToast_1.showFailureToast)(error, {
                        title: "Cannot query the data",
                    });
                }
            }
        }
    }, [latestOptions]);
    const fn = (0, react_1.useMemo)(() => {
        if (!(0, node_fs_1.existsSync)(databasePath)) {
            throw new Error("The database does not exist");
        }
        let workaroundCopiedDb = undefined;
        return async (databasePath, query) => {
            const abortSignal = abortable.current?.signal;
            const spawned = node_child_process_1.default.spawn("sqlite3", ["--json", "--readonly", databasePath, query], {
                signal: abortSignal,
            });
            const spawnedPromise = (0, exec_utils_1.getSpawnedPromise)(spawned);
            let [{ error, exitCode, signal }, stdoutResult, stderrResult] = await (0, exec_utils_1.getSpawnedResult)(spawned, { encoding: "utf-8" }, spawnedPromise);
            checkAborted(abortSignal);
            if (stderrResult.match("(5)") || stderrResult.match("(14)")) {
                // That means that the DB is busy because of another app is locking it
                // This happens when Chrome or Arc is opened: they lock the History db.
                // As an ugly workaround, we duplicate the file and read that instead
                // (with vfs unix - none to just not care about locks)
                if (!workaroundCopiedDb) {
                    const tempFolder = node_path_1.default.join(node_os_1.default.tmpdir(), "useSQL", (0, object_hash_1.default)(databasePath));
                    await (0, promises_1.mkdir)(tempFolder, { recursive: true });
                    checkAborted(abortSignal);
                    workaroundCopiedDb = node_path_1.default.join(tempFolder, "db.db");
                    await (0, promises_1.copyFile)(databasePath, workaroundCopiedDb);
                    // needed for certain db
                    await (0, promises_1.writeFile)(workaroundCopiedDb + "-shm", "");
                    await (0, promises_1.writeFile)(workaroundCopiedDb + "-wal", "");
                    checkAborted(abortSignal);
                }
                const spawned = node_child_process_1.default.spawn("sqlite3", ["--json", "--readonly", "--vfs", "unix-none", workaroundCopiedDb, query], {
                    signal: abortSignal,
                });
                const spawnedPromise = (0, exec_utils_1.getSpawnedPromise)(spawned);
                [{ error, exitCode, signal }, stdoutResult, stderrResult] = await (0, exec_utils_1.getSpawnedResult)(spawned, { encoding: "utf-8" }, spawnedPromise);
                checkAborted(abortSignal);
            }
            if (error || exitCode !== 0 || signal !== null) {
                throw new Error(stderrResult);
            }
            return JSON.parse(stdoutResult.trim() || "[]");
        };
    }, [databasePath]);
    return {
        ...(0, usePromise_1.usePromise)(fn, [databasePath, query], { ...usePromiseOptions, onError: handleError }),
        permissionView,
    };
}
exports.useSQL = useSQL;
class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = "PermissionError";
    }
}
function isPermissionError(error) {
    return error instanceof Error && error.name === "PermissionError";
}
const macosVenturaAndLater = parseInt(node_os_1.default.release().split(".")[0]) >= 22;
const preferencesString = macosVenturaAndLater ? "Settings" : "Preferences";
function PermissionErrorScreen(props) {
    const action = macosVenturaAndLater
        ? {
            title: "Open System Settings -> Privacy",
            target: "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles",
        }
        : {
            title: "Open System Preferences -> Security",
            target: "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles",
        };
    if (api_1.environment.commandMode === "menu-bar") {
        return ((0, jsx_runtime_1.jsxs)(api_1.MenuBarExtra, { icon: api_1.Icon.Warning, title: api_1.environment.commandName, children: [(0, jsx_runtime_1.jsx)(api_1.MenuBarExtra.Item, { title: "Raycast needs full disk access", tooltip: `You can revert this access in ${preferencesString} whenever you want` }), props.priming ? ((0, jsx_runtime_1.jsx)(api_1.MenuBarExtra.Item, { title: props.priming, tooltip: `You can revert this access in ${preferencesString} whenever you want` })) : null, (0, jsx_runtime_1.jsx)(api_1.MenuBarExtra.Separator, {}), (0, jsx_runtime_1.jsx)(api_1.MenuBarExtra.Item, { title: action.title, onAction: () => (0, api_1.open)(action.target) })] }));
    }
    return ((0, jsx_runtime_1.jsx)(api_1.List, { children: (0, jsx_runtime_1.jsx)(api_1.List.EmptyView, { icon: {
                source: {
                    light: "https://raycast.com/uploads/extensions-utils-security-permissions-light.png",
                    dark: "https://raycast.com/uploads/extensions-utils-security-permissions-dark.png",
                },
            }, title: "Raycast needs full disk access.", description: `${props.priming ? props.priming + "\n" : ""}You can revert this access in ${preferencesString} whenever you want.`, actions: (0, jsx_runtime_1.jsx)(api_1.ActionPanel, { children: (0, jsx_runtime_1.jsx)(api_1.Action.Open, { ...action }) }) }) }));
}
function checkAborted(signal) {
    if (signal?.aborted) {
        const error = new Error("aborted");
        error.name = "AbortError";
        throw error;
    }
}
