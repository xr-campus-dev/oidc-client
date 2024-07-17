import { OidcConfiguration } from './types.js';
import { ILOidcLocation } from './location';

export declare const sleepAsync: ({ milliseconds }: {
    milliseconds: any;
}) => Promise<unknown>;
export declare const defaultServiceWorkerUpdateRequireCallback: (location: ILOidcLocation) => (registration: any, stopKeepAlive: Function) => Promise<void>;
export declare const initWorkerAsync: (configuration: any, configurationName: any) => Promise<{
    clearAsync: (status: any) => Promise<any>;
    initAsync: (oidcServerConfiguration: any, where: any, oidcConfiguration: OidcConfiguration) => Promise<{
        tokens: import('./parseTokens.js').Tokens;
        status: any;
    }>;
    startKeepAliveServiceWorker: () => void;
    isServiceWorkerProxyActiveAsync: () => Promise<boolean | void>;
    setSessionStateAsync: (sessionState: string) => Promise<any>;
    getSessionStateAsync: () => Promise<any>;
    setNonceAsync: (nonce: any) => Promise<any>;
    getNonceAsync: () => Promise<{
        nonce: any;
    }>;
    setLoginParams: (data: any) => void;
    getLoginParams: () => any;
    getStateAsync: () => Promise<any>;
    setStateAsync: (state: string) => Promise<any>;
    getCodeVerifierAsync: () => Promise<any>;
    setCodeVerifierAsync: (codeVerifier: string) => Promise<any>;
    setDemonstratingProofOfPossessionNonce: (demonstratingProofOfPossessionNonce: string) => Promise<void>;
    getDemonstratingProofOfPossessionNonce: () => Promise<any>;
    setDemonstratingProofOfPossessionJwkAsync: (demonstratingProofOfPossessionJwk: JsonWebKey) => Promise<void>;
    getDemonstratingProofOfPossessionJwkAsync: () => Promise<any>;
}>;
//# sourceMappingURL=initWorker.d.ts.map