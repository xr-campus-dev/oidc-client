import { Tokens } from './parseTokens.js';
import { OidcConfiguration, StringMap } from './types.js';

export type SilentLoginResponse = {
    tokens: Tokens;
    sessionState: string;
    error: string;
};
export declare const _silentLoginAsync: (configurationName: string, configuration: OidcConfiguration, publishEvent: Function) => (extras?: StringMap, state?: string, scope?: string) => Promise<SilentLoginResponse>;
export declare const defaultSilentLoginAsync: (window: any, configurationName: any, configuration: OidcConfiguration, publishEvent: (string, any) => void, oidc: any) => (extras?: StringMap, scope?: string) => Promise<unknown>;
export default defaultSilentLoginAsync;
//# sourceMappingURL=silentLogin.d.ts.map