export interface SignalCallback<TPayload> {
    (data: TPayload) : void;
};

export interface SignalCallbackUninstaller {
    () : void;
};

/**
 *  An interface of a signal. A signal object can be passed around
 *  and the holder can be notified when the signal controller activates. 
 */
export interface Signal<TPayload> {

    observe(callback: SignalCallback<TPayload>) : SignalCallbackUninstaller;
};

/**
 *  The signal controller allows for control over a signal.
 */
export class SignalController<TPayload> {

    private _signal: ControlledSignal<TPayload> = new ControlledSignal<TPayload>();

    get signal() : Signal<TPayload> {
        return this._signal;
    }

    /**
     *  Activate the signal.
     */
    activate(payload: TPayload) {

        this._signal.activate(payload);
    }

    /**
     *  Prepare the object for disposal.
     */
    dispose() {

        this._signal.dispose();
    }
};

class ControlledSignal<TPayload> implements Signal<TPayload> {

    private _callbacks: Set<SignalCallback<TPayload>> = new Set();

    observe(callback: SignalCallback<TPayload>): SignalCallbackUninstaller {

        this._callbacks.add(callback);

        return () => {
            this._callbacks.delete(callback);
        };
    }

    /**
     *  Activate the signal.
     */
    activate(payload: TPayload) {
        
        for (let callback of this._callbacks) {
            callback(payload);
        }
    }

    /**
     *  Prepare the object for disposal.
     */
    dispose() {

        this._callbacks.clear();
    }
};
