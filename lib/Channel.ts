import { EventHandler } from "./EventHandler";
import { Event } from "./Event";

/**
 *  This is an interface describing a function that can uninstall a specific
 *  event handler. This is returned from Channel methods.
 */
export interface EventHandlerUninstaller {
    () : void;
};

/**
 *  This is a class that represents a single notification channel. Such channel
 *  allows for registering a collection of handlers. These handler are then executed
 *  when `.trigger()` method is called.
 * 
 *  The channel also allows for registering handlers on specific collection of tags.
 *  These tags should give an additional information about the specificity of
 *  an event that should be handled.
 */
export class Channel {

    /**
     * An array containing all registered callbacks for each tag. Callbacks
     * registered under no callback are stored under null instead of tag name.
     * Each item in the array is a tuple tagname-callback.
     */
    private _callbacks:Array<[string|null, EventHandler]> = [];

    /**
     * How many different callbacks are registered in this channel?
     */
    public get size() : number
    {
        // return the length of our callbacks
        return this._callbacks.length;
    }

    /**
     * Register a callback under each tag passed in the tags parameter. If the
     * array is empty, this call will behave like register(handler).
     */
    public register(handler:EventHandler, tags:Array<string>) : Channel
    public register(handler:EventHandler, tag:string|null) : Channel
    public register(handler:EventHandler) : Channel
    public register(...args:Array<any>) : Channel
    {
        // destruct the parameters
        let [handler, t] = args;

        // is the tag input an array? then we need to special handle it
        if (Array.isArray(t)) {

            // register callback for each tag
            if (t.length) t.forEach(tag => this.register(handler, tag));

            // no tags to register? then just call the register method
            else this.register(handler);
        }

        // just register it under the tag
        else this._callbacks.push([t || null, handler]);

        // allow chaining
        return this;
    }

    /**
     *  This is a methods that registers a specific handler similart to `.register()`
     *  method, but also exposes a way to quickly stop observing a specific handler.
     *  This is usefull when using frameworks like react or strict OOP practices
     *  which follow open-close rule.
     */
    public observe(handler:EventHandler, tags:Array<string>) : EventHandlerUninstaller;
    public observe(handler:EventHandler, tag:string|null) : EventHandlerUninstaller;
    public observe(handler:EventHandler) : EventHandlerUninstaller;
    public observe(...args:Array<any>) : EventHandlerUninstaller {

        const [ handler, tags ] = args;
        this.register(handler, tags);

        return () => void this.unregister(handler);
    }

    /**
     * Unregister a specific callback.
     */
    public unregister(handler:EventHandler, tags:Array<string>|null) : Channel
    public unregister(handler:EventHandler, tag:string|null) : Channel
    public unregister(handler:EventHandler) : Channel
    public unregister(...args:Array<any>) : Channel
    {
        // destruct the arguments into pieces
        let [handler, t] = args;

        // do we have an array of tags to unregister we need to call the method many times
        if (Array.isArray(t)) {

            // call the unregister for each tag
            t.forEach(tag => void this.unregister(handler, tag));

            // allow chaining
            return this;
        }

        // filter out all callbacks matching the passed handler
        this._callbacks = this._callbacks.filter(([tag, callback]) => {

            // tags don't match? then it's ok
            if (t && t != tag) return true;

            // there is a matching tag, check if it's a different handler
            if (t && t == tag) return handler != callback;

            // we want to remove all callbackas matching the handler
            return handler != callback
        });

        // allow chaining
        return this;
    }

    /**
     *  Trigger a specific event on this channel.
     */
    public trigger(event:Event) : void
    {
        // iterate over the callbacks and try to trigger the event properly
        for (let [tag, handler] of this._callbacks) {

            // the tag of the handler we want to call the event handler
            // if the tag of the handler is null or the event tags include
            if (tag == null || event.tags.includes(tag)) handler(event);
        }
    }
};
