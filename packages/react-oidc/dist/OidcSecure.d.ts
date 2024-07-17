import { StringMap } from '@axa-fr/oidc-client';
import { FC, PropsWithChildren } from 'react';

export type OidcSecureProps = {
    callbackPath?: string;
    extras?: StringMap;
    configurationName?: string;
};
export declare const OidcSecure: FC<PropsWithChildren<OidcSecureProps>>;
export declare const withOidcSecure: (WrappedComponent: FC<PropsWithChildren<OidcSecureProps>>, callbackPath?: any, extras?: any, configurationName?: string) => (props: any) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=OidcSecure.d.ts.map