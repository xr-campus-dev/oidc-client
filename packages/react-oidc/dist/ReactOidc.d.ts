import { StringMap } from '@axa-fr/oidc-client';

export declare const useOidc: (configurationName?: string) => {
    login: (callbackPath?: string | undefined, extras?: StringMap, silentLoginOnly?: boolean) => Promise<unknown>;
    logout: (callbackPath?: string | null | undefined, extras?: StringMap) => Promise<void>;
    renewTokens: (extras?: StringMap) => Promise<OidcAccessToken | OidcIdToken>;
    isAuthenticated: boolean;
};
export type OidcAccessToken = {
    accessToken?: any;
    accessTokenPayload?: any;
    generateDemonstrationOfProofOfPossessionAsync?: any;
};
export declare const useOidcAccessToken: (configurationName?: string) => OidcAccessToken;
export type OidcIdToken = {
    idToken?: any;
    idTokenPayload?: any;
};
export declare const useOidcIdToken: (configurationName?: string) => OidcIdToken;
//# sourceMappingURL=ReactOidc.d.ts.map