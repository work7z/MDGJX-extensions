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
//# sourceMappingURL=asana.d.ts.map