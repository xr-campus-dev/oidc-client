import { AccessTokenPayload, IdTokenPayload, Nonce, OidcConfig, OidcConfiguration, OidcServerConfiguration, Status, Tokens } from '../../types';

declare const currentTimeUnixSeconds: () => number;
declare const createToken: (expires: number, issued_at: number) => Tokens;
declare class TokenBuilder {
    private tokens;
    withExpiredToken(): TokenBuilder;
    withNonExpiredToken(): TokenBuilder;
    withExpiresAt(expiresAt: number): TokenBuilder;
    withIssuedAt(issued_at: number | string): TokenBuilder;
    withExpiresIn(expires_in: number | string): TokenBuilder;
    withIdToken(id_token: string): TokenBuilder;
    withAccessTokenPayload(accessTokenPayload: AccessTokenPayload): TokenBuilder;
    withAccessToken(access_token: string): TokenBuilder;
    withIdTokenPayload(idTokenPayload: IdTokenPayload): TokenBuilder;
    build(): Tokens;
}
declare class OidcConfigBuilder {
    private oidcConfig;
    withTestingDefault(): OidcConfigBuilder;
    withHideAccessToken(hideAccessToken: boolean): OidcConfigBuilder;
    withConfigurationName(configurationName: string): OidcConfigBuilder;
    withTokens(tokens: Tokens): OidcConfigBuilder;
    withStatus(status: Status): OidcConfigBuilder;
    withState(state: string): OidcConfigBuilder;
    withCodeVerifier(codeVerifier: string): OidcConfigBuilder;
    withNonce(nonce: Nonce): OidcConfigBuilder;
    withOidcServerConfiguration(oidcServerConfiguration: OidcServerConfiguration): OidcConfigBuilder;
    withOidcConfiguration(oidcConfiguration: OidcConfiguration): OidcConfigBuilder;
    build(): OidcConfig;
}
declare class OidcServerConfigBuilder {
    private oidcServerConfig;
    withTestingDefault(): OidcServerConfigBuilder;
    withRevocationEndpoint(revocationEndpoint: string): OidcServerConfigBuilder;
    withIssuer(issuer: string): OidcServerConfigBuilder;
    withAuthorizationEndpoint(authorizationEndpoint: string): OidcServerConfigBuilder;
    withTokenEndpoint(tokenEndpoint: string): OidcServerConfigBuilder;
    withUserInfoEndpoint(userInfoEndpoint: string): OidcServerConfigBuilder;
    build(): OidcServerConfiguration;
}
interface TestingResponse extends Response {
    bodyContent?: any;
}
declare class ResponseBuilder {
    private response;
    withStatus(status: number): ResponseBuilder;
    withBody(body: string): ResponseBuilder;
    withHeaders(headers: Headers): ResponseBuilder;
    /**
     * Custom property for Testing setup
     * @param body
     * @returns
     */
    withBodyContent(body: any): ResponseBuilder;
    build(): TestingResponse;
}
export { createToken, currentTimeUnixSeconds, OidcConfigBuilder, OidcServerConfigBuilder, ResponseBuilder, TokenBuilder, };
//# sourceMappingURL=testHelper.d.ts.map