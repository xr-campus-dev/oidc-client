import { Database, Domain, DomainDetails, OidcConfig, TrustedDomains } from '../types';

export declare function checkDomain(domains: Domain[], endpoint: string): void;
export declare const getDomains: (trustedDomain: Domain[] | DomainDetails, type: 'oidc' | 'accessToken') => Domain[];
export declare const getCurrentDatabaseDomain: (database: Database, url: string, trustedDomains: TrustedDomains) => OidcConfig | null;
//# sourceMappingURL=domains.d.ts.map