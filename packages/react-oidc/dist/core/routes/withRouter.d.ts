export type WindowInternal = Window & {
    CustomEvent?: new <T>(typeArg: string, eventInitDict?: CustomEventInit<T>) => CustomEvent<T>;
    Event: typeof Event;
};
type InitCustomEventParams<T = any> = {
    bubbles: boolean;
    cancelable: boolean;
    detail: T;
};
export declare const CreateEvent: (windowInternal: WindowInternal, documentInternal: Document) => (event: string, params: InitCustomEventParams) => CustomEvent;
type WindowHistoryState = typeof window.history.state;
export interface ReactOidcHistory {
    replaceState: (url?: string | null, stateHistory?: WindowHistoryState) => void;
}
export type CustomHistory = {
    replaceState(url?: string | null, stateHistory?: WindowHistoryState): void;
};
export declare const getCustomHistory: () => CustomHistory;
export {};
//# sourceMappingURL=withRouter.d.ts.map