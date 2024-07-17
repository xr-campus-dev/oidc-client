import { Fetch } from '@axa-fr/oidc-client';

export interface ComponentWithOidcFetchProps {
    fetch?: Fetch;
}
export declare const withOidcFetch: (fetch?: Fetch, configurationName?: string, demonstrating_proof_of_possession?: boolean) => (WrappedComponent: any) => (props: ComponentWithOidcFetchProps) => import("react/jsx-runtime").JSX.Element;
export declare const useOidcFetch: (fetch?: Fetch, configurationName?: string, demonstrating_proof_of_possession?: boolean) => {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};
//# sourceMappingURL=FetchToken.d.ts.map