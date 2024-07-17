import { OidcConfiguration, StringMap } from './types.js';
import { ILOidcLocation } from './location';
import { default as Oidc } from './oidc';

export declare const defaultLoginAsync: (configurationName: string, configuration: OidcConfiguration, publishEvent: (string, any) => void, initAsync: Function, oidcLocation: ILOidcLocation) => (callbackPath?: string, extras?: StringMap, isSilentSignin?: boolean, scope?: string) => Promise<void>;
export declare const loginCallbackAsync: (oidc: Oidc) => (isSilentSignin?: boolean) => Promise<{
    tokens: import('./parseTokens.js').Tokens;
    state: string;
    callbackPath: any;
}>;
//# sourceMappingURL=login.d.ts.map