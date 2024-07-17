import { default as Oidc } from './oidc.js';
import { Tokens } from './parseTokens.js';
import { OidcConfiguration, StringMap } from './types.js';

export declare function renewTokensAndStartTimerAsync(oidc: any, forceRefresh?: boolean, extras?: StringMap): Promise<any>;
export declare const autoRenewTokens: (oidc: Oidc, expiresAt: any, extras?: StringMap) => NodeJS.Timeout;
export declare const synchroniseTokensStatus: {
    FORCE_REFRESH: string;
    SESSION_LOST: string;
    NOT_CONNECTED: string;
    TOKENS_VALID: string;
    TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_VALID: string;
    LOGOUT_FROM_ANOTHER_TAB: string;
    REQUIRE_SYNC_TOKENS: string;
};
export declare const syncTokensInfoAsync: (oidc: Oidc) => (configuration: OidcConfiguration, configurationName: string, currentTokens: Tokens, forceRefresh?: boolean) => Promise<{
    tokens: any;
    status: string;
    nonce: {
        nonce: any;
    };
}>;
//# sourceMappingURL=renewTokens.d.ts.map