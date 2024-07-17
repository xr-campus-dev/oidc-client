import { IdTokenPayload, OidcConfig, OidcServerConfiguration, Tokens } from '../types';

export declare const parseJwt: (payload: string) => any;
declare function b64DecodeUnicode(str: string): string;
declare function computeTimeLeft(refreshTimeBeforeTokensExpirationInSecond: number, expiresAt: number): number;
declare function isTokensValid(tokens: Tokens | null): boolean;
declare const extractTokenPayload: (token?: string) => any;
declare const isTokensOidcValid: (tokens: Tokens, nonce: string | null, oidcServerConfiguration: OidcServerConfiguration) => {
    isValid: boolean;
    reason: string;
};
declare function _hideTokens(tokens: Tokens, currentDatabaseElement: OidcConfig, configurationName: string): {
    accessTokenPayload: any;
    issued_at: string | number;
    access_token: string;
    id_token: string | null;
    idTokenPayload: IdTokenPayload;
    refresh_token?: string | undefined;
    expiresAt: number;
    expires_in: string | number;
};
declare function hideTokens(currentDatabaseElement: OidcConfig): (response: Response) => Response | Promise<Response>;
export { b64DecodeUnicode, computeTimeLeft, isTokensValid, extractTokenPayload, isTokensOidcValid, hideTokens, _hideTokens, };
//# sourceMappingURL=tokens.d.ts.map