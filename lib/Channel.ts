/**
 *  This is a class to handle a single channel.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

 /// <reference path="EventHandler.ts" />
 /// <reference path="Event.ts" />
 import { EventHandler } from "./EventHandler";
 import { Event } from "./Event";

 // export the class
 export class Channel {

     /**
      * An array containing all registered callbacks for each tag. Callbacks
      * registered under no callback are stored under null instead of tag name.
      * Each item in the array is a tuple tagname-callback.
      * @var Array
      */
     private _callbacks:Array<[string|null, EventHandler]> = [];

     /**
      * Register a callback under each tag passed in the tags parameter.
      * @param function A callback to register
      * @param Array    An array of tags to register the callback under
      * @return Channel
      */
     public register(handler:EventHandler, tags:Array<string>) : Channel

     /**
      * Register a callback on certain tag.
      * @param function A callback to register
      * @param string   A tag to register the callback for
      * @return Channel
      */
     public register(handler:EventHandler, tag:string|null) : Channel

     /**
      * Register a callback. No tags.
      * @param function
      * @return Channel
      */
     public register(handler:EventHandler) : Channel

     // the implementation
     public register(...args:Array<any>) : Channel
     {
         // destruct the parameters
         let [handler, t] = args;

         // if the data is an array we want to call same method on each element
         if (Array.isArray(t)) t.forEach(tag => this.register(handler, tag));

         // just register it under the tag
         else this._callbacks.push([t || null, handler]);

         // allow chaining
         return this;
     }

     /**
      * Unregister the callback.
      * @param  function    The event handler to unregister.
      * @param  Array       An array of tags
      * @return Channel
      */
     public unregister(handler:EventHandler, tags:Array<string>) : Channel

     /**
      * Unregister the callback.
      * @param  function    The event handler to unregister.
      * @param  string      The tag to unregister the handler for.
      * @return Channel
      */
     public unregister(handler:EventHandler, tag:string|null) : Channel

     /**
      * Unregister the callback from all possible callbacks.
      * @param  function    The event handler to unregister.
      * @return Channel
      */
     public unregister(handler:EventHandler) : Channel

     // the implementation
     public unregister(...args:Array<any>) : Channel
     {
         // destruct the arguments into pieces
         let [handler, t] = args;

         // do we have an array of tags to unregister we need to call the method many times
         if (Array.isArray(t)) {

             // call the unregister for each tag
             t.forEach(t => this.unregister(handler, t));

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
      *  @param Event   The event to trigger on this channel.
      */
     public trigger(event:Event) : void
     {
         // iterate over the callbacks and try to trigger the event properly
         for (let [tag, handler] of this._callbacks) {

             // if the tag of the handler is null or the event tags include
             // the tag of the handler we want to call the event handler
             if (tag == null || event.tags.includes(tag)) handler(event);
         }
     }

     /**
      * How many different callbacks are registered in this channel?
      * @return int
      */
     public get size()
     {
         // return the length of our callbacks
         return this._callbacks.length;
     }
 };
