
/// <reference path="Event.ts" />


namespace Iventy {


    interface Callback {
        (event:Iventy.Event) : void;
    };

    // export the class
    export class Emitter {

        /**
         *  A map container arrays of callbacks per callback channel.
         */
        private readonly _channels:Map<string, Array<Callback>> = new Map();

        private _bubbleTo:Emitter | null = null;

        /**
         *  The constructor
         */
        constructor () {

            // nothing special
        }

        /**
         *  Trigger event on the emitter.
         *
         *  @param  Iventy.Event    The event instance that should be triggered.
         *  @return Iventy.Emitter  The emitter that the event was called on.
         */
        trigger (event:Iventy.Event) : Iventy.Emitter {

            // try to fetch callbacks
            let callbacks = this._channels.get(event.type);

            // if we have them we can iterate over them and call each of tuem with event
            if (callbacks) for (let callback of callbacks) callback(event);

            // should we bubble the event further? but only when it was not stopped
            if (this._bubbleTo && !event.isStopped) this._bubbleTo.trigger(event);

            // allow chaining
            return this;
        };

        /**
         *  Install callback on given channel.
         *
         *  @param  string      The channel name.
         *  @param  function    The callback to call when the event is triggered
         */
        on(name:string, callback:Callback) : Iventy.Emitter {

            // get the callbacks
            let callbacks = this._channels.get(name);

            // push the new callback (if we have them)
            if (callbacks) callbacks.push(callback);

            // we need to register a new channel and push an array with the first callback
            else this._channels.set(name, [ callback ]);

            // allow chaining
            return this;
        }

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
        off(name:string, callback:Callback | null = null) : Iventy.Emitter{

            // get the callbacks
            let callbacks = this._channels.get(name);

            // not a single callback on given channel? we are done then
            if (!callbacks) return this;

            // filter out all callbacks
            if (callback) this._channels.set(name, callbacks.filter((item:Callback) => item != callback));

            // we should remove all possible callbacks
            else callbacks.length = 0;

            // allow chaining
            return this;
        }

        /**
         *  This is a function that will allow to bubble an event to another emitter
         *
         *  @param  EventEmitter
         */
        bubbleTo(target:Iventy.Emitter | null = null) : Iventy.Emitter {

            // set new target
            this._bubbleTo = target;

            // allow chaining
            return this;
        }

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
        createEvent(name:string, data:object = { }, previousEvent:Iventy.Event | null = null) : Iventy.Event {

            // construct new event
            return new Iventy.Event(name, data, this, previousEvent);
        }
    };
}
