import { Fetch, OidcConfiguration, OidcClient, ILOidcLocation } from '@axa-fr/oidc-client';
import { ComponentType, FC, PropsWithChildren } from 'react';
import { CustomHistory } from './core/routes/withRouter.js';

export type oidcContext = {
    (name?: string): OidcClient;
};
export type OidcProviderProps = {
    callbackSuccessComponent?: ComponentType<any>;
    sessionLostComponent?: ComponentType<any>;
    authenticatingComponent?: ComponentType<any>;
    authenticatingErrorComponent?: ComponentType<any>;
    loadingComponent?: ComponentType<any>;
    serviceWorkerNotSupportedComponent?: ComponentType<any>;
    configurationName?: string;
    configuration?: OidcConfiguration;
    children: any;
    onSessionLost?: () => void;
    onLogoutFromAnotherTab?: () => void;
    onLogoutFromSameTab?: () => void;
    withCustomHistory?: () => CustomHistory;
    onEvent?: (configuration: string, name: string, data: any) => void;
    getFetch?: () => Fetch;
    location?: ILOidcLocation;
};
export type OidcSessionProps = {
    configurationName: string;
    loadingComponent: PropsWithChildren<any>;
};
export declare const OidcProvider: FC<PropsWithChildren<OidcProviderProps>>;
export default OidcProvider;
//# sourceMappingURL=OidcProvider.d.ts.map