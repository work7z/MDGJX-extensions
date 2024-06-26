import { OAuth } from "@raycast/api";
import { OnAuthorizeParams } from "../../src/oauth/withAccessToken";
export interface OAuthServiceOptions {
    client: OAuth.PKCEClient;
    clientId: string;
    scope: string | string[];
    authorizeUrl: string;
    tokenUrl: string;
    refreshTokenUrl?: string;
    personalAccessToken?: string;
    bodyEncoding?: "json" | "url-encoded";
    extraParameters?: Record<string, string>;
    onAuthorize?: (params: OnAuthorizeParams) => void;
    tokenResponseParser?: (response: unknown) => OAuth.TokenResponse;
    tokenRefreshResponseParser?: (response: unknown) => OAuth.TokenResponse;
}
/**
 * Class allowing to create an OAuth service using the the PKCE (Proof Key for Code Exchange) flow.
 *
 * This service is capable of starting the authorization process, fetching and refreshing tokens,
 * as well as managing the authentication state.
 *
 * @example
 * ```typescript
 * const oauthClient = new OAuth.PKCEClient({ ... });
 * const oauthService = new OAuthService({
 *   client: oauthClient,
 *   clientId: 'your-client-id',
 *   scope: 'required scopes',
 *   authorizeUrl: 'https://provider.com/oauth/authorize',
 *   tokenUrl: 'https://provider.com/oauth/token',
 *   refreshTokenUrl: 'https://provider.com/oauth/token',
 *   extraParameters: { 'additional_param': 'value' }
 * });
 * ```
 */
export declare class OAuthService implements OAuthServiceOptions {
    clientId: string;
    scope: string;
    client: OAuth.PKCEClient;
    extraParameters?: Record<string, string>;
    authorizeUrl: string;
    tokenUrl: string;
    refreshTokenUrl?: string;
    bodyEncoding?: "json" | "url-encoded";
    personalAccessToken?: string;
    onAuthorize?: (params: OnAuthorizeParams) => void;
    tokenResponseParser: (response: unknown) => OAuth.TokenResponse;
    tokenRefreshResponseParser: (response: unknown) => OAuth.TokenResponse;
    constructor(options: OAuthServiceOptions);
    /**
     * Asana OAuth service provided out of the box.
     *
     * @example
     * ```typescript
     * const asana = OAuthService.asana({ scope: 'default' })
     * ```
     */
    static asana: (options: import("../../src/oauth/providers").ProviderWithDefaultClientOptions) => OAuthService;
    /**
     * GitHub OAuth service provided out of the box.
     *
     * @example
     * ```typescript
     * const github = OAuthService.github({ scope: 'repo user' })
     * ```
     */
    static github: (options: import("../../src/oauth/providers").ProviderWithDefaultClientOptions) => OAuthService;
    /**
     * Google OAuth service provided out of the box.
     *
     * @example
     * ```typescript
     * const google = OAuthService.google({
     *   clientId: 'custom-client-id',
     *   authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
     *   tokenUrl: 'https://oauth2.googleapis.com/token',
     *   scope: 'https://www.googleapis.com/auth/drive.readonly',
     * });
     * ```
     */
    static google: (options: import("../../src/oauth/providers").ProviderOptions) => OAuthService;
    /**
     * Jira OAuth service provided out of the box.
     *
     * @example
     * ```typescript
     * const jira = OAuthService.jira({
     *   clientId: 'custom-client-id',
     *   authorizeUrl: 'https://auth.atlassian.com/authorize',
     *   tokenUrl: 'https://api.atlassian.com/oauth/token',
     *   scope: 'read:jira-user read:jira-work offline_access'
     * });
     * ```
     */
    static jira: (options: import("../../src/oauth/providers").ProviderOptions) => OAuthService;
    /**
     * Linear OAuth service provided out of the box.
     *
     * @example
     * ```typescript
     * const linear = OAuthService.linear({ scope: 'read write' })
     * ```
     */
    static linear: (options: import("../../src/oauth/providers").ProviderWithDefaultClientOptions) => OAuthService;
    /**
     * Slack OAuth service provided out of the box.
     *
     * @example
     * ```typescript
     * const slack = OAuthService.slack({ scope: 'emoji:read' })
     * ```
     */
    static slack: (options: import("../../src/oauth/providers").ProviderWithDefaultClientOptions) => OAuthService;
    /**
     * Zoom OAuth service provided out of the box.
     *
     * @example
     * ```typescript
     * const zoom = OAuthService.zoom({
     *   clientId: 'custom-client-id',
     *   authorizeUrl: 'https://zoom.us/oauth/authorize',
     *   tokenUrl: 'https://zoom.us/oauth/token',
     *   scope: 'meeting:write',
     *   personalAccessToken: 'personal-access-token',
     * });
     * ```
     */
    static zoom: (options: import("../../src/oauth/providers").ProviderOptions) => OAuthService;
    /**
     * Initiates the OAuth authorization process or refreshes existing tokens if necessary.
     * If the current token set has a refresh token and it is expired, then the function will refresh the tokens.
     * If no tokens exist, it will initiate the OAuth authorization process and fetch the tokens.
     *
     * @returns {Promise<string>} A promise that resolves with the access token obtained from the authorization flow, or null if the token could not be obtained.
     */
    authorize(): Promise<string>;
    private fetchTokens;
    private refreshTokens;
}
//# sourceMappingURL=OAuthService.d.ts.map