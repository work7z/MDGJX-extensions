import { OAuthService } from "./OAuthService";
import { OnAuthorizeParams } from "./withAccessToken";
export type ClientConstructor = {
    clientId?: string;
    scope: string;
    authorizeUrl?: string;
    tokenUrl?: string;
    personalAccessToken?: string;
    refreshTokenUrl?: string;
    onAuthorize?: (params: OnAuthorizeParams) => void;
};
export declare const asanaService: (options: ClientConstructor) => OAuthService;
/**
 * Class to use Asana OAuth with Raycast.

 * @example
 * ```typescript
 * const asana = new AsanaOAuthService({
 *   clientId: 'custom-client-id', // Optional: If omitted, defaults to a pre-configured client ID
 *   scope: 'default', // Optional: If omitted, uses 'default' as the scope
 *   personalAccessToken: 'personal-access-token', // Optional: For accessing the API using a personal token
 * });
 * ```
 */
export declare class AsanaOAuthService extends OAuthService {
    constructor(options: ClientConstructor);
}
/**
 * Class to use GitHub OAuth with Raycast.
 *
 * @example
 * ```typescript
 * const github = new GitHubOAuthService({
 *   clientId: 'custom-client-id', // Optional: If omitted, defaults to a pre-configured client ID
 *   scope: 'repo user', // Specify the scopes your application requires
 *   personalAccessToken: 'personal-access-token', // Optional: For accessing the API directly
 * });
 * ```
 */
export declare class GitHubOAuthService extends OAuthService {
    constructor(options: ClientConstructor);
}
/**
 * Class to use Google OAuth with Raycast.
 *
 * @example
 * ```typescript
 * const google = new GoogleOAuthService({
 *   clientId: 'custom-client-id', // Optional: If omitted, defaults to a pre-configured client ID
 *   scope: 'https://www.googleapis.com/auth/userinfo.email', // Specify the scopes your application requires
 *   personalAccessToken: 'personal-access-token', // Optional: Not typically used with Google OAuth
 * });
 * ```
 */
export declare class GoogleOAuthService extends OAuthService {
    constructor(options: ClientConstructor);
}
/**
 * Class to use Jira OAuth with Raycast.
 *
 * @example
 * ```typescript
 * const jira = new JiraOAuthService({
 *   clientId: 'custom-client-id', // Optional: If omitted, defaults to a pre-configured client ID
 *   scope: 'read:jira-user read:jira-work', // Specify the scopes your application requires
 *   personalAccessToken: 'personal-access-token', // Optional: For accessing the API using a personal token
 * });
 * ```
 */
export declare class JiraOAuthService extends OAuthService {
    constructor(options: ClientConstructor);
}
/**
 * Class to use Linear OAuth with Raycast.
 *
 * @example
 * ```typescript
 * const linear = new LinearOAuthService({
 *   clientId: 'custom-client-id', // Optional: If omitted, defaults to a pre-configured client ID
 *   scope: 'read', // Specify the scopes your application requires
 *   personalAccessToken: 'personal-access-token', // Optional: For accessing the API using a personal token
 * });
 * ```
 */
export declare class LinearOAuthService extends OAuthService {
    constructor(options: ClientConstructor);
}
/**
 * Class to use Slack OAuth with Raycast.
 *
 * @example
 * ```typescript
 * const slack = new SlackOAuthService({
 *   clientId: 'custom-client-id', // Optional: If omitted, defaults to a pre-configured client ID
 *   scope: 'emoji:read', // Specify the scopes your application requires
 *   personalAccessToken: 'personal-access-token', // Optional: For accessing the API using a personal token
 * });
 * ```
 */
export declare class SlackOAuthService extends OAuthService {
    constructor(options: ClientConstructor);
}
/**
 * Class to use Zoom OAuth with Raycast.
 *
 * @example
 * ```typescript
 * const zoom = new ZoomOAuthService({
 *    clientId: 'custom-client-id', // Optional: If omitted, defaults to a pre-configured client ID
 *    scope: '', // Specify the scopes your application requires
 *    personalAccessToken: 'personal-access-token', // Optional: For accessing the API using a personal token
 * });
 * ```
 */
export declare class ZoomOAuthService extends OAuthService {
    constructor(options: ClientConstructor);
}
//# sourceMappingURL=clients.d.ts.map