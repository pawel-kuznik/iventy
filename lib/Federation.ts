/**
 *  This is a class describing a federation of one or many emitters. A federation
 *  is an interface that allows for listening for events from a collection of
 *  emitters. This allows for creation of very large event system.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

/// <reference path="EventHandler.ts" />
/// <reference path="Emitter.ts" />
import { EventHandler } from "./EventHandler";
import { Emitter } from "./Emitter";

// export the class
export class Federation {

     /**
      * Add a new emitter to the federation. This federation will be added with
      * a certain name(s) so that it would be possible to distinguish events from
      * this emitter later on.
      * @param Emitter      An emitter instance
      * @param string|array Either one tag or an array of tags to associate
      *                     with this emitter.
      * @return Federation
      */
     add(emitter:Emitter, tag:string|Array<string>) : Federation

     /**
      * Add a new federation to the federation. The added federation will be added
      * with a certain name(s) so that it would be possible to distinguish events from
      * this federation later on.
      * @param Federation   A federation instance
      * @param string|array Either one tag or an array of tags to associate
      *                     with this emitter.
      * @return Federation
      */
     add(federation:Federation, tag:string|Array<string>) : Federation

     // the actual implementation
     add(taget:any) : Federation
     {
         return this;
     }

     /**
      * Delete an emitter from this federation.
      * @param Emitter The emitter to add
      * @return Fedetaion
      */
     delete(emitter:Emitter) : Federation

     /**
      * Delete a federation from this federation.
      * @param Emitter The emitter to add
      * @return Fedetaion
      */
     delete(federation:Federation) : Federation

     // the implementation
     delete(...args:Array<any>) : Federation
     {
         return this;
     }

     /**
      * Install event handler on a specific event name.
      * @param string       The event name to install callback on.
      * @param EventHandler The event handler.
      * @return Federation
      */
     on(name:string, callback:EventHandler) : Federation
     {
        return this;
     }

     /**
      * Uninstall event handler on a specific event name.
      * @param string       The event name to install callback on.
      * @param EventHandler The event handler.
      * @return Federation
      */
     off(name:string, callback:EventHandler | null = null) : Federation
     {
         return this;
     }

     /**
      * Bubble all events to a specific emitter.
      * @param Emitter The emitter to bubble all events.
      * @return Federation
      */
     bubbleTo(target:Emitter) : Federation
     {
         return this;
     }
 }
