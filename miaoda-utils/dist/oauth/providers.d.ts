import { OAuth } from "@raycast/api";
import { OAuthService } from "../../src/oauth/OAuthService";
import { OnAuthorizeParams } from "../../src/oauth/withAccessToken";
type BaseProviderOptions = {
    scope: string;
    personalAccessToken?: string;
    authorizeUrl?: string;
    tokenUrl?: string;
    refreshTokenUrl?: string;
    onAuthorize?: (params: OnAuthorizeParams) => void;
    bodyEncoding?: "json" | "url-encoded";
    tokenResponseParser?: (response: unknown) => OAuth.TokenResponse;
    tokenRefreshResponseParser?: (response: unknown) => OAuth.TokenResponse;
};
export type ProviderWithDefaultClientOptions = BaseProviderOptions & {
    clientId?: string;
};
export type ProviderOptions = BaseProviderOptions & {
    clientId: string;
};
export declare const asanaService: (options: ProviderWithDefaultClientOptions) => OAuthService;
export declare const githubService: (options: ProviderWithDefaultClientOptions) => OAuthService;
export declare const googleService: (options: ProviderOptions) => OAuthService;
export declare const jiraService: (options: ProviderOptions) => OAuthService;
export declare const linearService: (options: ProviderWithDefaultClientOptions) => OAuthService;
export declare const slackService: (options: ProviderWithDefaultClientOptions) => OAuthService;
export declare const zoomService: (options: ProviderOptions) => OAuthService;
export {};
//# sourceMappingURL=providers.d.ts.map