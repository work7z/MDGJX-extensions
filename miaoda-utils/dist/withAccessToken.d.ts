import React from "react";
export declare function withAccessToken(options: {
    authorize: () => Promise<string>;
}): <T>(component: React.ComponentType<T>) => React.FunctionComponent<T>;
export declare function withAccessToken(options: {
    authorize: () => Promise<string>;
}): (fn: (() => Promise<void>) | (() => void)) => () => Promise<void>;
export declare function getAccessToken(): string;
//# sourceMappingURL=withAccessToken.d.ts.map