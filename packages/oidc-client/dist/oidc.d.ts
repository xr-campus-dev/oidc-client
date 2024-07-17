import { CheckSessionIFrame } from './checkSessionIFrame.js';
import { Tokens } from './parseTokens.js';
import { AuthorityConfiguration, Fetch, OidcConfiguration, StringMap } from './types.js';
import { ILOidcLocation } from './location';

export declare const getFetchDefault: () => typeof fetch;
export interface OidcAuthorizationServiceConfigurationJson {
    check_session_iframe?: string;
    issuer: string;
}
export declare class OidcAuthorizationServiceConfiguration {
    private checkSessionIframe;
    private issuer;
    private authorizationEndpoint;
    private tokenEndpoint;
    private revocationEndpoint;
    private userInfoEndpoint;
    private endSessionEndpoint;
    constructor(request: any);
}
export type LoginCallback = {
    callbackPath: string;
};
export type InternalLoginCallback = {
    callbackPath: string;
    parsedTokens: Tokens;
};
export declare class Oidc {
    configuration: OidcConfiguration;
    userInfo: null;
    tokens?: Tokens;
    events: Array<any>;
    timeoutId: NodeJS.Timeout | number;
    configurationName: string;
    checkSessionIFrame: CheckSessionIFrame;
    getFetch: () => Fetch;
    location: ILOidcLocation;
    constructor(configuration: OidcConfiguration, configurationName: string, getFetch: () => Fetch, location?: ILOidcLocation);
    subscribeEvents(func: any): string;
    removeEventSubscription(id: any): void;
    publishEvent(eventName: any, data: any): void;
    static getOrCreate: (getFetch: () => Fetch, location: ILOidcLocation) => (configuration: any, name?: string) => any;
    static get(name?: string): any;
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
    _silentLoginCallbackFromIFrame(): void;
    _silentLoginErrorCallbackFromIFrame(exception?: any): void;
    silentLoginCallbackAsync(): Promise<void>;
    initPromise: any;
    initAsync(authority: string, authorityConfiguration: AuthorityConfiguration): Promise<any>;
    tryKeepExistingSessionPromise: any;
    tryKeepExistingSessionAsync(): Promise<boolean>;
    startCheckSessionAsync(checkSessionIFrameUri: any, clientId: any, sessionState: any, isSilentSignin?: boolean): Promise<void>;
    loginPromise: Promise<void>;
    loginAsync(callbackPath?: string, extras?: StringMap, isSilentSignin?: boolean, scope?: string, silentLoginOnly?: boolean): Promise<unknown>;
    loginCallbackPromise: Promise<any>;
    loginCallbackAsync(isSilenSignin?: boolean): Promise<any>;
    generateDemonstrationOfProofOfPossessionAsync(accessToken: string, url: string, method: string, extras?: StringMap): Promise<string>;
    loginCallbackWithAutoTokensRenewPromise: Promise<LoginCallback>;
    loginCallbackWithAutoTokensRenewAsync(): Promise<LoginCallback>;
    userInfoPromise: Promise<any>;
    userInfoAsync(noCache?: boolean, demonstrating_proof_of_possession?: boolean): Promise<any>;
    renewTokensPromise: Promise<any>;
    renewTokensAsync(extras?: StringMap): Promise<any>;
    destroyAsync(status: any): Promise<void>;
    logoutSameTabAsync(clientId: string, sub: any): Promise<void>;
    logoutOtherTabAsync(clientId: string, sub: any): Promise<void>;
    logoutPromise: Promise<void>;
    logoutAsync(callbackPathOrUrl?: string | null | undefined, extras?: StringMap): Promise<void>;
}
export default Oidc;
//# sourceMappingURL=oidc.d.ts.map