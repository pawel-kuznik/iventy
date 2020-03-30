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
    private readonly _channels:Map<string, Channel> = new Map();

    /**
     *  All instances we want to bubble our events to.
     *  @var    Set<Emitter>
     */
    private _bubbleTo:Set<Emitter> = new Set();

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
    public trigger(name:string, data:object, previousEvent:Event | null) : Event;

    /**
     *  Trigger event on the emitter.
     *
     *  @param  Iventy.Event    The event instance that should be triggered.
     *  @return Iventy.Event    The triggered event.
     */
    public trigger(event:Event) : Event;

    // the actual implementation
    public trigger(...args:Array<any>) : any
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
        if (callbacks) callbacks.trigger(event);

        // should we bubble the event further? but only when it was not stopped
        if (!event.isStopped) this._bubbleTo.forEach(handler => handler.trigger(event));

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

        // split the name and tags
        let [channelName, ...tags] = name.split('.');

        // get the callbacks
        let callbacks = this._channels.get(channelName);

        // no channels? then we have to create a new one
        if (!callbacks) {

            // construct new channel
            callbacks = new Channel();

            // store the channel for later use
            this._channels.set(channelName, callbacks);
        }

        // do we have callbacks? then use the method. Otherwise, we assume we
        // don't have any callbacks
        if (tags.length) callbacks.register(callback, tags);

        // register the callback on all
        else callbacks.register(callback);

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
    public off(name:string, callback:EventHandler | null = null) : Emitter {

        // split the name and tags
        let [channelName, ...tags] = name.split('.');

        // get the callbacks
        let callbacks = this._channels.get(channelName);

        // not a single callback on given channel? we are done then
        if (!callbacks) return this;

        // do we have a channel name and no callback or tags? then remove the whole
        // channel from this emitter.
        if (channelName && callback == null && tags.length == 0) this._channels.delete(channelName);

        // do we have a channel name and callback? they ask the callbacks to unregister it (with possible tags)
        if (channelName && callback) callbacks.unregister(callback, tags)

        // allow chaining
        return this;
    }

    /**
     *  This is a function that will allow to bubble an event to another emitter
     *
     *  @param  EventEmitter
     *  @return Emitter
     */
    public bubbleTo(target:Emitter) : Emitter {

        // set new target
        this._bubbleTo.add(target);

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
