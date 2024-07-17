import { StringMap } from './types.js';
import { ILOidcLocation } from './location';

export declare const oidcLogoutTokens: {
    access_token: string;
    refresh_token: string;
};
export declare const destroyAsync: (oidc: any) => (status: any) => Promise<void>;
export declare const logoutAsync: (oidc: any, oidcDatabase: any, fetch: any, console: any, oicLocation: ILOidcLocation) => (callbackPathOrUrl?: string | null | undefined, extras?: StringMap) => Promise<void>;
//# sourceMappingURL=logout.d.ts.map