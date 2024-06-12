"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthService = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const providers_1 = require("./providers");
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
class OAuthService {
    constructor(options) {
        this.clientId = options.clientId;
        this.scope = Array.isArray(options.scope) ? options.scope.join(" ") : options.scope;
        this.personalAccessToken = options.personalAccessToken;
        this.bodyEncoding = options.bodyEncoding;
        this.client = options.client;
        this.extraParameters = options.extraParameters;
        this.authorizeUrl = options.authorizeUrl;
        this.tokenUrl = options.tokenUrl;
        this.refreshTokenUrl = options.refreshTokenUrl;
        this.onAuthorize = options.onAuthorize;
        this.tokenResponseParser = options.tokenResponseParser ?? ((x) => x);
        this.tokenRefreshResponseParser = options.tokenRefreshResponseParser ?? ((x) => x);
        this.authorize = this.authorize.bind(this);
    }
    /**
     * Initiates the OAuth authorization process or refreshes existing tokens if necessary.
     * If the current token set has a refresh token and it is expired, then the function will refresh the tokens.
     * If no tokens exist, it will initiate the OAuth authorization process and fetch the tokens.
     *
     * @returns {Promise<string>} A promise that resolves with the access token obtained from the authorization flow, or null if the token could not be obtained.
     */
    async authorize() {
        const currentTokenSet = await this.client.getTokens();
        if (currentTokenSet?.accessToken) {
            if (currentTokenSet.refreshToken && currentTokenSet.isExpired()) {
                const tokens = await this.refreshTokens({
                    token: currentTokenSet.refreshToken,
                    clientId: this.clientId,
                    tokenUrl: this.refreshTokenUrl ?? this.tokenUrl,
                });
                await this.client.setTokens(tokens);
                return tokens.access_token;
            }
            return currentTokenSet.accessToken;
        }
        const authRequest = await this.client.authorizationRequest({
            endpoint: this.authorizeUrl,
            clientId: this.clientId,
            scope: this.scope,
            extraParameters: this.extraParameters,
        });
        const { authorizationCode } = await this.client.authorize(authRequest);
        const tokens = await this.fetchTokens({
            authRequest,
            authorizationCode,
            clientId: this.clientId,
            tokenUrl: this.tokenUrl,
        });
        await this.client.setTokens(tokens);
        return tokens.access_token;
    }
    async fetchTokens({ authRequest, authorizationCode, clientId, tokenUrl, bodyEncoding }) {
        let options;
        if (bodyEncoding === "url-encoded") {
            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("code", authorizationCode);
            params.append("code_verifier", authRequest.codeVerifier);
            params.append("grant_type", "authorization_code");
            params.append("redirect_uri", authRequest.redirectURI);
            options = { body: params };
        }
        else {
            options = {
                body: JSON.stringify({
                    client_id: clientId,
                    code: authorizationCode,
                    code_verifier: authRequest.codeVerifier,
                    grant_type: "authorization_code",
                    redirect_uri: authRequest.redirectURI,
                }),
                headers: { "Content-Type": "application/json" },
            };
        }
        const response = await (0, cross_fetch_1.default)(tokenUrl, { method: "POST", ...options });
        if (!response.ok) {
            const responseText = await response.text();
            console.error("fetch tokens error:", responseText);
            throw new Error(`Error while fetching tokens: ${response.status} (${response.statusText})\n${responseText}`);
        }
        const tokens = this.tokenResponseParser(await response.json());
        // Some clients such as Linear can return a scope array instead of a string
        return Array.isArray(tokens.scope) ? { ...tokens, scope: tokens.scope.join(" ") } : tokens;
    }
    async refreshTokens({ token, clientId, tokenUrl, bodyEncoding }) {
        let options;
        if (bodyEncoding === "url-encoded") {
            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("refresh_token", token);
            params.append("grant_type", "refresh_token");
            options = { body: params };
        }
        else {
            options = {
                body: JSON.stringify({
                    client_id: clientId,
                    refresh_token: token,
                    grant_type: "refresh_token",
                }),
                headers: { "Content-Type": "application/json" },
            };
        }
        const response = await (0, cross_fetch_1.default)(tokenUrl, { method: "POST", ...options });
        if (!response.ok) {
            const responseText = await response.text();
            console.error("refresh tokens error:", responseText);
            throw new Error(`Error while refreshing tokens: ${response.status} (${response.statusText})\n${responseText}`);
        }
        const tokenResponse = this.tokenRefreshResponseParser(await response.json());
        tokenResponse.refresh_token = tokenResponse.refresh_token ?? token;
        return tokenResponse;
    }
}
exports.OAuthService = OAuthService;
/**
 * Asana OAuth service provided out of the box.
 *
 * @example
 * ```typescript
 * const asana = OAuthService.asana({ scope: 'default' })
 * ```
 */
OAuthService.asana = providers_1.asanaService;
/**
 * GitHub OAuth service provided out of the box.
 *
 * @example
 * ```typescript
 * const github = OAuthService.github({ scope: 'repo user' })
 * ```
 */
OAuthService.github = providers_1.githubService;
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
OAuthService.google = providers_1.googleService;
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
OAuthService.jira = providers_1.jiraService;
/**
 * Linear OAuth service provided out of the box.
 *
 * @example
 * ```typescript
 * const linear = OAuthService.linear({ scope: 'read write' })
 * ```
 */
OAuthService.linear = providers_1.linearService;
/**
 * Slack OAuth service provided out of the box.
 *
 * @example
 * ```typescript
 * const slack = OAuthService.slack({ scope: 'emoji:read' })
 * ```
 */
OAuthService.slack = providers_1.slackService;
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
OAuthService.zoom = providers_1.zoomService;
