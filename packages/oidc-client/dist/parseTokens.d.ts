import { StringMap, TokenAutomaticRenewMode } from './types';

export declare const parseJwt: (payload: string) => any;
export type Tokens = {
    refreshToken: string;
    idTokenPayload: any;
    idToken: string;
    accessTokenPayload: any;
    accessToken: string;
    expiresAt: number;
    issuedAt: number;
};
export type TokenRenewModeType = {
    access_token_or_id_token_invalid: string;
    access_token_invalid: string;
    id_token_invalid: string;
};
export declare const TokenRenewMode: {
    access_token_or_id_token_invalid: string;
    access_token_invalid: string;
    id_token_invalid: string;
};
export declare const setTokens: (tokens: any, oldTokens: any, tokenRenewMode: string) => Tokens;
export declare const parseOriginalTokens: (tokens: any, oldTokens: any, tokenRenewMode: string) => Tokens;
export declare const computeTimeLeft: (refreshTimeBeforeTokensExpirationInSecond: any, expiresAt: any) => number;
export declare const isTokensValid: (tokens: any) => boolean;
export type ValidToken = {
    isTokensValid: boolean;
    tokens: Tokens;
    numberWaited: number;
};
export interface OidcToken {
    tokens?: Tokens;
    configuration: {
        token_automatic_renew_mode?: TokenAutomaticRenewMode;
    };
    renewTokensAsync: (extras: StringMap) => Promise<void>;
}
export declare const getValidTokenAsync: (oidc: OidcToken, waitMs?: number, numberWait?: number) => Promise<ValidToken>;
export declare const isTokensOidcValid: (tokens: any, nonce: any, oidcServerConfiguration: any) => {
    isValid: boolean;
    reason: string;
};
//# sourceMappingURL=parseTokens.d.ts.map