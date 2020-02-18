/**
 *  This is an interface describing a proper event handler.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

import { Event } from "./Event";

// an interface which we want to use to describe an event handler
export interface EventHandler {
    (event:Event) : void;
};
