import { CheckSessionIFrame } from './checkSessionIFrame.js';
import { OidcConfiguration } from './types.js';
import { default as Oidc } from './oidc';

export declare const startCheckSessionAsync: (oidc: Oidc, oidcDatabase: any, configuration: OidcConfiguration) => (checkSessionIFrameUri: any, clientId: any, sessionState: any, isSilentSignin?: boolean) => Promise<CheckSessionIFrame>;
//# sourceMappingURL=checkSession.d.ts.map