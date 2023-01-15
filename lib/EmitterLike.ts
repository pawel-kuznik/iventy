import { EventHandlerUninstaller } from "./Channel";
import { EventHandler } from "./EventHandler";

/**
 *  This is an interface that describes objects that are emitter-like, but not really
 *  fully fledged emitters. These objects allow for getting events from them, or rather
 *  acting on events.
 * 
 *  However, emitter-like objects don't need present a trigger() method as it's not clear
 *  how they emit events.
 */
export interface EmitterLike {
    handle(name: string, callback: EventHandler) : EventHandlerUninstaller;
    on(name: string, callback: EventHandler) : EmitterLike;
    off(name: string, callback: EventHandler | null) : EmitterLike;
};