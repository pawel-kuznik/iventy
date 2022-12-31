import { Event } from "./Event";

/**
 *  This is an interface describing an event handler used by iventy library.
 */
export interface EventHandler {
    (event:Event) : void;
};
