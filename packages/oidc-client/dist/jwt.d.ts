import { DemonstratingProofOfPossessionConfiguration } from './types';

export declare const uint8ToUrlBase64: (uint8: Uint8Array) => string;
export declare const defaultDemonstratingProofOfPossessionConfiguration: DemonstratingProofOfPossessionConfiguration;
export declare var JWT: {
    sign: (w: any) => (jwk: any, headers: any, claims: any, demonstratingProofOfPossessionConfiguration: DemonstratingProofOfPossessionConfiguration, jwtHeaderType?: string) => Promise<string>;
};
export declare var JWK: {
    thumbprint: (w: any) => (jwk: any, digestAlgorithm: AlgorithmIdentifier) => Promise<string>;
};
export declare const generateJwkAsync: (w: any) => (generateKeyAlgorithm: RsaHashedKeyGenParams | EcKeyGenParams) => Promise<any>;
export declare const generateJwtDemonstratingProofOfPossessionAsync: (w: any) => (demonstratingProofOfPossessionConfiguration: DemonstratingProofOfPossessionConfiguration) => (jwk: any, method: string, url: string, extrasClaims?: {}) => Promise<string>;
//# sourceMappingURL=jwt.d.ts.map