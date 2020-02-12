
import { Event } from "./Event";

// an interface which we want to use to describe an event handler
export interface EventHandler {
    (event:Event) : void;
};
