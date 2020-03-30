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
export class Federation extends Emitter {

     /**
      * Add a new emitter to the federation. This federation will be added with
      * a certain name(s) so that it would be possible to distinguish events from
      * this emitter later on.
      * @param Emitter      An emitter instance
      * @param string|array Either one tag or an array of tags to associate
      *                     with this emitter.
      * @return Federation
      */
     public add(emitter:Emitter, tag:string | Array<string>) : Federation;
     public add(emitter:Emitter) : Federation;

     /**
      * Add a new federation to the federation. The added federation will be added
      * with a certain name(s) so that it would be possible to distinguish events from
      * this federation later on.
      * @param Federation   A federation instance
      * @param string|array Either one tag or an array of tags to associate
      *                     with this emitter.
      * @return Federation
      */
     public add(federation:Federation, tag:string | Array<string>) : Federation;
     public add(federation:Federation) : Federation;

     // the actual implementation
     public add(...args:Array<any>) : Federation {
         // destruct the arguments
         let [target, t] = args;

         // make the target bubble to this federation
         target.bubbleTo(this);

         // allow chaining
         return this;
     }
 }
