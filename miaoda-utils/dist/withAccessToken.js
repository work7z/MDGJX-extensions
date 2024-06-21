"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.withAccessToken = void 0;
/* eslint-disable react-hooks/rules-of-hooks */
const react_1 = __importStar(require("react"));
const api_1 = require("@raycast/api");
let token = null;
function withAccessToken(options) {
    if (api_1.environment.commandMode === "no-view") {
        return (fn) => {
            if (!token) {
                return options.authorize().then(() => fn);
            }
            return fn;
        };
    }
    return (Component) => {
        const WrappedComponent = (props) => {
            const [, forceRerender] = (0, react_1.useState)(0);
            // we use a `useMemo` instead of `useEffect` to avoid a render
            (0, react_1.useMemo)(() => {
                (async function () {
                    token = await options.authorize();
                    forceRerender((x) => x + 1);
                })();
            }, []);
            if (!token) {
                if (api_1.environment.commandMode === "view") {
                    // Using the <List /> component makes the placeholder buggy
                    return react_1.default.createElement(api_1.Detail, { isLoading: true });
                }
                else if (api_1.environment.commandMode === "menu-bar") {
                    return react_1.default.createElement(api_1.MenuBarExtra, { isLoading: true });
                }
                else {
                    throw new Error("Unknown command mode");
                }
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore too complicated for TS
            return react_1.default.createElement(Component, props);
        };
        WrappedComponent.displayName = `withAccessToken(${"displayName" in Component ? Component.displayName : Component.name})`;
        return WrappedComponent;
    };
}
exports.withAccessToken = withAccessToken;
function getAccessToken() {
    if (!token) {
        throw new Error("getAccessToken must be used when authenticated (eg. used inside `withAccessToken`)");
    }
    return token;
}
exports.getAccessToken = getAccessToken;
