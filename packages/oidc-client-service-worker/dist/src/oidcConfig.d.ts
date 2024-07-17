import { Database, OidcConfig } from './types';

declare const getMatchingOidcConfigurations: (database: Database, url: string) => OidcConfig[];
export { getMatchingOidcConfigurations as getCurrentDatabasesTokenEndpoint };
//# sourceMappingURL=oidcConfig.d.ts.map