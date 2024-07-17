export declare class CheckSessionIFrame {
    private readonly _client_id;
    private readonly _callback;
    private _url;
    private readonly _interval;
    private readonly _stopOnError;
    private readonly _frame_origin;
    private readonly _frame;
    private _boundMessageEvent;
    private _timer;
    constructor(callback: any, client_id: any, url: any, interval?: number, stopOnError?: boolean);
    load(): Promise<void>;
    _message(e: any): void;
    start(session_state: any): void;
    stop(): void;
}
//# sourceMappingURL=checkSessionIFrame.d.ts.map