/**
 *  A class that can be used as event emitter on client and server side. An
 *  event emitter allows to register a number of callbacks that should be
 *  triggered when an event on specific channel is triggered. It's possible
 *  to distinguish channels by names.
 */

import { EventHandler } from "./EventHandler";
import { Event } from "./Event";
import { Channel, EventHandlerUninstaller } from "./Channel";

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
    private _bubbleTo:Set<[Emitter, Array<string>]> = new Set();

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
    public trigger<TPayload>(name:string, data:TPayload, previousEvent:Event<TPayload> | null) : Event<TPayload>;

    /**
     *  Trigger event based on a name.
     *
     *  @param  string  The name of the channel of the event.
     *  @param  mixed   (Optional) The object of the event.
     *  @return Iventy.Event    The triggered event.
     */
    public trigger<TPayload>(name:string, data:TPayload) : Event<TPayload>;

    /**
     *  Trigger event based on a name.
     *
     *  @param  string  The name of the channel of the event.
     *  @return Iventy.Event    The triggered event.
     */
    public trigger<undefined>(name:string) : Event<undefined>;

    /**
     *  Trigger event on the emitter.
     *
     *  @param  Iventy.Event    The event instance that should be triggered.
     *  @return Iventy.Event    The triggered event.
     */
    public trigger<TPayload>(event:Event<TPayload>) : Event<TPayload>;

    // the actual implementation
    public trigger(...args:Array<any>) : any
    {
        // destruct arguments
        let [name, data, prev] = args;

        // check if we have a string
        if (typeof(name) == 'string') return this.trigger(this.createEvent(name, data || { }, prev || null));

        // we are in the first overload
        let event = name;

        // try to fetch callbacks
        let callbacks = this._channels.get(event.type);

        // if we have them we can iterate over them and call each of tuem with event
        if (callbacks) callbacks.trigger(event);

        // should we bubble the event further? but only when it was not stopped
        if (!event.isStopped) this._bubbleTo.forEach(([handler, tags]) => {

            // make the handler trigger an extended event (with the tags)
            handler.trigger(event.extendEvent(tags));
        });

        // return the triggered event
        return event;
    };

    /**
     *  Install callback on given channel. This method is identical to the .handle() method,
     *  but returns emitter instance for chaining.
     */
    public on(name:string, callback:EventHandler) : Emitter {

        // install a handler on an emitter
        this.handle(name, callback);        

        // allow chaining
        return this;
    }

    /**
     *  Install a handler on a specific event. This method is identical to the .on() method,
     *  but it returns a function that can be used to uninstall the installed event handler.
     */
    public handle(name: string, callback: EventHandler) : EventHandlerUninstaller {

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
        if (tags.length) return callbacks.observe(callback, tags);

        // register the callback on all
        return callbacks.observe(callback);
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
        if (channelName && callback) callbacks.unregister(callback, tags.length ? tags : null);

        // allow chaining
        return this;
    }

    /**
     *  This is a function that will allow to bubble an event to another emitter
     *  @param  EventEmitter    The emitter it should bubble to.
     *  @param  Array           An optional array of tags (or single tag) that
     *                          the bubbled event will be extended with.
     *  @return Emitter
     */
    public bubbleTo(target:Emitter, tags:Array<string>|string|null = null) : Emitter {

        // make sure tags are an array
        if (typeof(tags) == 'string') tags = [ tags ];

        // no tags at all? then just assign an array
        if (tags == null) tags = [];

        // set new target
        this._bubbleTo.add([target, tags ? tags : []]);

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
    public createEvent<TPayload>(name:string, data:TPayload, previousEvent:Event<any> | null = null) : Event<TPayload> {

        // construct new event
        return new Event<TPayload>(name, data, this, previousEvent);
    }
};
