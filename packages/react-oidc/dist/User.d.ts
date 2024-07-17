import { OidcUserInfo } from '@axa-fr/oidc-client';

export declare enum OidcUserStatus {
    Unauthenticated = "Unauthenticated",
    Loading = "Loading user",
    Loaded = "User loaded",
    LoadingError = "Error loading user"
}
export type OidcUser<T extends OidcUserInfo = OidcUserInfo> = {
    user: T | null;
    status: OidcUserStatus;
};
export declare const useOidcUser: <T extends OidcUserInfo = OidcUserInfo>(configurationName?: string, demonstrating_proof_of_possession?: boolean) => {
    oidcUser: T;
    oidcUserLoadingState: OidcUserStatus;
    reloadOidcUser: () => void;
};
//# sourceMappingURL=User.d.ts.map