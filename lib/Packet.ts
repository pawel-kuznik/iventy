/**
 *  This is a class describing a data carried in the invety system.
 *  This is a base class for event and signal mechanism.
 */
export abstract class Packet<TPayload = any> {

    public readonly payload: TPayload;

    constructor(payload: TPayload) {
        this.payload = payload;
    }
};