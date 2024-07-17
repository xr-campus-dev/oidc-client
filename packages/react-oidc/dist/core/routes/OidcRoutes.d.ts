import { ILOidcLocation } from '@axa-fr/oidc-client';
import { default as React, ComponentType } from 'react';
import { CustomHistory } from './withRouter.js';

type OidcRoutesProps = {
    callbackSuccessComponent?: ComponentType;
    callbackErrorComponent?: ComponentType;
    authenticatingComponent?: ComponentType;
    configurationName: string;
    redirect_uri: string;
    silent_redirect_uri?: string;
    silent_login_uri?: string;
    withCustomHistory?: () => CustomHistory;
    location: ILOidcLocation;
};
declare const _default: React.NamedExoticComponent<React.PropsWithChildren<OidcRoutesProps>>;
export default _default;
//# sourceMappingURL=OidcRoutes.d.ts.map