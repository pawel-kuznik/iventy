/**
 *  A class that can be used as event emitter on client and server side. An
 *  event emitter allows to register a number of callbacks that should be
 *  triggered when an event on specific channel is triggered. It's possible
 *  to distinguish channels by names.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
/// <reference path="Event.d.ts" />
declare namespace Iventy {
    interface EventHandler {
        (event: Iventy.Event): void;
    }
    export class Emitter {
        /**
         *  A map container arrays of callbacks per callback channel.
         */
        private readonly _channels;
        private _bubbleTo;
        /**
         *  The constructor
         */
        constructor();
        /**
         *  Trigger event on the emitter.
         *
         *  @param  Iventy.Event    The event instance that should be triggered.
         *  @return Iventy.Emitter  The emitter that the event was called on.
         */
        trigger(event: Iventy.Event): Iventy.Emitter;
        /**
         *  Install callback on given channel.
         *
         *  @param  string      The channel name.
         *  @param  function    The callback to call when the event is triggered
         */
        on(name: string, callback: EventHandler): Iventy.Emitter;
        /**
         *  Uninstall callback on given channel.
         *
         *  @param  string      The channel name.
         *  @param  function    The callback to uninstall.
         *  @return Emitter
         *
         *  ---------------------------------------------
         *
         *  Uninstall all registered callbacks.
         *
         *  @return Emitter
         */
        off(name: string, callback?: EventHandler | null): Iventy.Emitter;
        /**
         *  This is a function that will allow to bubble an event to another emitter
         *
         *  @param  EventEmitter
         */
        bubbleTo(target?: Iventy.Emitter | null): Iventy.Emitter;
        /**
         *  A method to create an event based on this emitter.
         *
         *  @param  string  The name of the channel of the event.
         *  @param  mixed   (Optional) The object of the event.
         *  @param  Event   (Optional) The previous event in the chain. If none
         *                  is provided then event has no previous event.
         *
         *  @return Event   The constructed event.
         */
        createEvent(name: string, data?: object, previousEvent?: Iventy.Event | null): Iventy.Event;
    }
    export {};
}
