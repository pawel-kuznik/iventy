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
