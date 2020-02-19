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
         let [t, handler] = args;

         // if the data is an array we want to call same method on each element
         if (Array.isArray(t)) t.forEach(tag => this.register(handler, tag));

         // just register it under the tag
         else this._callbacks.push([t || null, handler]);

         // allow chaining
         return this;
     }
 };
