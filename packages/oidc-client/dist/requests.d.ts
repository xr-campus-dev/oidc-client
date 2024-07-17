import { OidcAuthorizationServiceConfiguration } from './oidc.js';
import { Fetch, StringMap } from './types.js';
import { ILOidcLocation } from './location';

export declare const fetchFromIssuer: (fetch: any) => (openIdIssuerUrl: string, timeCacheSecond?: number, storage?: Storage, timeoutMs?: number) => Promise<OidcAuthorizationServiceConfiguration>;
export declare const TOKEN_TYPE: {
    refresh_token: string;
    access_token: string;
};
export declare const performRevocationRequestAsync: (fetch: any) => (url: any, token: any, token_type: string, client_id: any, extras?: StringMap, timeoutMs?: number) => Promise<{
    success: boolean;
}>;
type PerformTokenRequestResponse = {
    success: boolean;
    status?: number;
    data?: any;
    demonstratingProofOfPossessionNonce?: string;
};
export declare const performTokenRequestAsync: (fetch: Fetch) => (url: string, details: any, extras: any, oldTokens: any, headersExtras: {}, tokenRenewMode: string, timeoutMs?: number) => Promise<PerformTokenRequestResponse>;
export declare const performAuthorizationRequestAsync: (storage: any, oidcLocation: ILOidcLocation) => (url: any, extras: StringMap) => Promise<void>;
export declare const performFirstTokenRequestAsync: (storage: any) => (url: any, formBodyExtras: any, headersExtras: any, tokenRenewMode: string, timeoutMs?: number) => Promise<{
    success: boolean;
    status: number;
    data?: undefined;
} | {
    success: boolean;
    data: {
        state: any;
        tokens: import('./parseTokens.js').Tokens;
        demonstratingProofOfPossessionNonce: string;
    };
    status?: undefined;
}>;
export {};
//# sourceMappingURL=requests.d.ts.map