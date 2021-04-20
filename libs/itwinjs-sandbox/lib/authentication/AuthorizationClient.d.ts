import { BeEvent, ClientRequestContext } from "@bentley/bentleyjs-core";
import { AccessToken } from "@bentley/itwin-client";
import { FrontendAuthorizationClient } from "@bentley/frontend-authorization-client";
export declare class AuthorizationClient implements FrontendAuthorizationClient {
    readonly onUserStateChanged: BeEvent<(token: AccessToken | undefined) => void>;
    protected _accessToken?: AccessToken;
    protected _devAccessToken?: AccessToken;
    private static _oidcClient;
    static get oidcClient(): FrontendAuthorizationClient;
    private static _initialized;
    constructor();
    static initializeOidc(): Promise<void>;
    signInSilent(requestContext?: ClientRequestContext): Promise<void>;
    signIn(requestContext?: ClientRequestContext): Promise<void>;
    signOut(requestContext?: ClientRequestContext): Promise<void>;
    get isAuthorized(): boolean;
    get hasExpired(): boolean;
    get hasSignedIn(): boolean;
    generateTokenString(userURL: string, requestContext?: ClientRequestContext): Promise<void>;
    getAccessToken(): Promise<AccessToken>;
    getDevAccessToken(): Promise<AccessToken>;
}
//# sourceMappingURL=AuthorizationClient.d.ts.map