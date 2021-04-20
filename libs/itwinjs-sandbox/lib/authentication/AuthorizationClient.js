/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { AuthStatus, BeEvent, BentleyError, ClientRequestContext, Config } from "@bentley/bentleyjs-core";
import { AccessToken } from "@bentley/itwin-client";
export class AuthorizationClient {
    constructor() {
        this.onUserStateChanged = new BeEvent();
    }
    static get oidcClient() {
        return this._oidcClient;
    }
    static async initializeOidc() {
        if (!this._initialized) {
            const authClient = new AuthorizationClient();
            const userURL = Config.App.get("imjs_sample_showcase_user", "https://prod-imodeldeveloperservices-eus.azurewebsites.net/api/v0/sampleShowcaseUser");
            await authClient.generateTokenString(userURL, new ClientRequestContext());
            await authClient.signInSilent(new ClientRequestContext());
            this._oidcClient = authClient;
        }
        this._initialized = true;
    }
    async signInSilent(requestContext) {
        this.signIn(requestContext);
    }
    async signIn(requestContext) {
        if (requestContext) {
            requestContext.enter();
        }
        await this.getAccessToken();
    }
    async signOut(requestContext) {
        if (requestContext) {
            requestContext.enter();
        }
        this._accessToken = undefined;
    }
    get isAuthorized() {
        return this.hasSignedIn;
    }
    get hasExpired() {
        return !this._accessToken;
    }
    get hasSignedIn() {
        return !!this._accessToken;
    }
    async generateTokenString(userURL, requestContext) {
        if (requestContext) {
            requestContext.enter();
        }
        const response = await fetch(userURL);
        const body = await response.json();
        const tokenJson = {
            startsAt: body._startsAt,
            expiresAt: body._expiresAt,
            tokenString: body._jwt,
        };
        this._accessToken = AccessToken.fromJson(tokenJson);
        // Automatically renew if session exceeds 55 minutes.
        setTimeout(() => {
            this.generateTokenString(userURL)
                .catch((error) => {
                throw new BentleyError(AuthStatus.Error, error);
            });
        }, (1000 * 60 * 55));
    }
    async getAccessToken() {
        if (!this._accessToken)
            throw new BentleyError(AuthStatus.Error, "Cannot get access token");
        return this._accessToken;
    }
    async getDevAccessToken() {
        if (!this._devAccessToken) {
            const response = await fetch("https://prod-imodeldeveloperservices-eus.azurewebsites.net/api/v0/sampleShowcaseUser/devUser");
            const body = await response.json();
            const tokenJson = {
                ...await body,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                _userInfo: { id: "MockId" },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                _tokenString: body._jwt,
            };
            this._devAccessToken = AccessToken.fromJson(tokenJson);
            setTimeout(() => {
                // Reset the token.
                this._devAccessToken = undefined;
                this.getDevAccessToken()
                    .catch((error) => {
                    throw new BentleyError(AuthStatus.Error, error);
                });
            }, (1000 * 60 * 55));
        }
        return this._devAccessToken;
    }
}
AuthorizationClient._initialized = false;
//# sourceMappingURL=AuthorizationClient.js.map