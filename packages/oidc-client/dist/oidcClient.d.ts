import { LoginCallback, Oidc } from './oidc.js';
import { Tokens, ValidToken } from './parseTokens.js';
import { Fetch, OidcConfiguration, StringMap } from './types.js';
import { ILOidcLocation } from './location';

export interface EventSubscriber {
    (name: string, data: any): any;
}
export declare class OidcClient {
    private _oidc;
    constructor(oidc: Oidc);
    subscribeEvents(func: EventSubscriber): string;
    removeEventSubscription(id: string): void;
    publishEvent(eventName: string, data: any): void;
    static getOrCreate: (getFetch: () => Fetch, location?: ILOidcLocation) => (configuration: OidcConfiguration, name?: string) => OidcClient;
    static get(name?: string): OidcClient;
    static eventNames: {
        service_worker_not_supported_by_browser: string;
        token_aquired: string;
        logout_from_another_tab: string;
        logout_from_same_tab: string;
        token_renewed: string;
        token_timer: string;
        loginAsync_begin: string;
        loginAsync_error: string;
        loginCallbackAsync_begin: string;
        loginCallbackAsync_end: string;
        loginCallbackAsync_error: string;
        refreshTokensAsync_begin: string;
        refreshTokensAsync: string;
        refreshTokensAsync_end: string;
        refreshTokensAsync_error: string;
        refreshTokensAsync_silent_error: string;
        tryKeepExistingSessionAsync_begin: string;
        tryKeepExistingSessionAsync_end: string;
        tryKeepExistingSessionAsync_error: string;
        silentLoginAsync_begin: string;
        silentLoginAsync: string;
        silentLoginAsync_end: string;
        silentLoginAsync_error: string;
        syncTokensAsync_begin: string;
        syncTokensAsync_lock_not_available: string;
        syncTokensAsync_end: string;
        syncTokensAsync_error: string;
        tokensInvalidAndWaitingActionsToRefresh: string;
    };
    tryKeepExistingSessionAsync(): Promise<boolean>;
    loginAsync(callbackPath?: string, extras?: StringMap, isSilentSignin?: boolean, scope?: string, silentLoginOnly?: boolean): Promise<unknown>;
    logoutAsync(callbackPathOrUrl?: string | null | undefined, extras?: StringMap): Promise<void>;
    silentLoginCallbackAsync(): Promise<void>;
    renewTokensAsync(extras?: StringMap): Promise<void>;
    loginCallbackAsync(): Promise<LoginCallback>;
    get tokens(): Tokens;
    get configuration(): OidcConfiguration;
    generateDemonstrationOfProofOfPossessionAsync(accessToken: string, url: string, method: string, extras?: StringMap): Promise<string>;
    getValidTokenAsync(waitMs?: number, numberWait?: number): Promise<ValidToken>;
    fetchWithTokens(fetch: Fetch, demonstrating_proof_of_possession?: boolean): Fetch;
    userInfoAsync<T extends OidcUserInfo = OidcUserInfo>(noCache?: boolean, demonstrating_proof_of_possession?: boolean): Promise<T>;
    userInfo<T extends OidcUserInfo = OidcUserInfo>(): T;
}
export interface OidcUserInfo {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: OidcAddressClaim;
    updated_at?: number;
    groups?: string[];
}
export interface OidcAddressClaim {
    formatted?: string;
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
}
//# sourceMappingURL=oidcClient.d.ts.map