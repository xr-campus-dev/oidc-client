export declare const initSession: (configurationName: any, storage?: Storage) => {
    clearAsync: (status: any) => Promise<void>;
    initAsync: () => Promise<{
        tokens: any;
        status: any;
    }>;
    setTokens: (tokens: any) => void;
    getTokens: () => string;
    setSessionStateAsync: (sessionState: any) => Promise<void>;
    getSessionStateAsync: () => Promise<any>;
    setNonceAsync: (nonce: any) => void;
    getNonceAsync: () => Promise<{
        nonce: any;
    }>;
    setLoginParams: (data: any) => void;
    getLoginParams: () => any;
    getStateAsync: () => Promise<any>;
    setStateAsync: (state: string) => Promise<void>;
    getCodeVerifierAsync: () => Promise<any>;
    setCodeVerifierAsync: (codeVerifier: any) => Promise<void>;
    setDemonstratingProofOfPossessionNonce: (dpopNonce: string) => Promise<void>;
    getDemonstratingProofOfPossessionNonce: () => any;
    setDemonstratingProofOfPossessionJwkAsync: (jwk: JsonWebKey) => void;
    getDemonstratingProofOfPossessionJwkAsync: () => any;
};
//# sourceMappingURL=initSession.d.ts.map