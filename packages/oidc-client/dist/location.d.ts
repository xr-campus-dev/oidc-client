export interface ILOidcLocation {
    open(url: string): void;
    reload(): void;
    getCurrentHref(): string;
    getPath(): string;
    getOrigin(): string;
}
export declare class OidcLocation implements ILOidcLocation {
    open(url: string): void;
    reload(): void;
    getCurrentHref(): string;
    getPath(): string;
    getOrigin(): string;
}
//# sourceMappingURL=location.d.ts.map