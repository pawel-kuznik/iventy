/**
 *  A class that can be used as event emitter on client and server side. An
 *  event emitter allows to register a number of callbacks that should be
 *  triggered when an event on specific channel is triggered. It's possible
 *  to distinguish channels by names.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

/// <reference path="EventHandler.ts" />
/// <reference path="Event.ts" />
/// <reference path="Channel.ts" />
import { EventHandler } from "./EventHandler";
import { Event } from "./Event";
import { Channel } from "./Channel";

// export the class
export class Emitter {

    /**
     *  A map container arrays of callbacks per callback channel.
     *  @var    Map
     */
    private readonly _channels:Map<string, Array<EventHandler>> = new Map();

    /**
     *  An emitter instance that we want to bubble oll our events.
     *  @var    Emitter
     */
    private _bubbleTo:Emitter | null = null;

    /**
     *  The constructor
     */
    public constructor () {

        // nothing special
    }

    /**
     *  Trigger an event based on name, data and previous event.
     *
     *  @param  string  The name of the channel of the event.
     *  @param  mixed   (Optional) The object of the event.
     *  @param  Event   (Optional) The previous event in the chain. If none
     *                  is provided then event has no previous event.
     *
     *  @return Event   The triggered event.
     */
    protected trigger(name:string, data:object, previousEvent:Event | null) : Event;
    /**
     *  Trigger event on the emitter.
     *
     *  @param  Iventy.Event    The event instance that should be triggered.
     *  @return Iventy.Event    The triggered event.
     */
    protected trigger(event:Event) : Event;

    // the actual implementation
    protected trigger(...args:Array<any>) : any
    {
        // destruct arguments
        let [name, data, prev] = args;

        // check if we have a string
        if (typeof(name) == 'string') return this.trigger(this.createEvent(name, data, prev));

        // we are in the first overload
        let event = name;

        // try to fetch callbacks
        let callbacks = this._channels.get(event.type);

        // if we have them we can iterate over them and call each of tuem with event
        if (callbacks) for (let callback of callbacks) callback(event);

        // should we bubble the event further? but only when it was not stopped
        if (this._bubbleTo && !event.isStopped) this._bubbleTo.trigger(event);

        // return the triggered event
        return event;
    };

    /**
     *  Install callback on given channel.
     *
     *  @param  string      The channel name.
     *  @param  function    The callback to call when the event is triggered
     */
    public on(name:string, callback:EventHandler) : Emitter {

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
    public off(name:string, callback:EventHandler | null = null) : Emitter{

        // get the callbacks
        let callbacks = this._channels.get(name);

        // not a single callback on given channel? we are done then
        if (!callbacks) return this;

        // filter out all callbacks
        if (callback) this._channels.set(name, callbacks.filter((item:EventHandler) => item != callback));

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
    public bubbleTo(target:Emitter | null = null) : Emitter {

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
    public createEvent(name:string, data:object = { }, previousEvent:Event | null = null) : Event {

        // construct new event
        return new Event(name, data, this, previousEvent);
    }
};
