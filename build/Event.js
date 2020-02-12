"use strict";
/**
 *  This is a class to acompany the Emitter class. The Event has important
 *  properties:
 *
 *  type:string             The type of the event (basically the event/chanel name)
 *  data:mixed              The additional data assigned to the event.
 *  target:Emitter          The emitter that ignited the event.
 *  currentTarget:Emitter   The last emitter in bubble chaing
 *
 *  @author Paweł Kuźnik <pawel.kuznik@gmail.com>
 */
/// <reference path="Emitter.ts">
var Iventy;
(function (Iventy) {
    // return the class
    class Event {
        /**
         *  The constructor
         *
         *  @param  sting   The channel type of the event.
         *  @param  object   The data associated with the event.
         *  @param  Emitter The emitter that triggers this event.
         *  @param  Event   The previous event in chain that lead to this event.
         */
        constructor(type, data, target = null, prev = null) {
            /**
             *  Flags to tell if the event is stopped or prevented.
             */
            this._prevented = false;
            this._stopped = false;
            // assign the basic data
            this._type = type;
            this._data = data;
            this._target = target;
            this._prev = prev;
        }
        /**
         *  Prevent the event.
         *  @return Event   The prevented event.
         */
        prevent() {
            // mark the event as prevented
            this._prevented = true;
            // return same event
            return this;
        }
        /**
         *  Is the event prevented.
         *  @return bool
         */
        get isPrevented() { return this._prevented; }
        /**
         *  Stop the event
         */
        stop() {
            // mark the event as stopped
            this._stopped = true;
            // allow chaining
            return this;
        }
        /**
         *  Is the event stopped.
         */
        get isStopped() { return this._stopped; }
        /**
         *  Return the type of the event.
         *
         *  @return string
         */
        get type() { return this._type; }
        /**
         *  The data associated with the event.
         *
         *  @return mixed
         */
        get data() { return this._data; }
        /**
         *  Get the target of the event.
         *
         *  @return Emitter
         */
        get target() { return this._target; }
        /**
         *  Get the previos event in the chain.
         *
         *  @return Event
         */
        get previous() { return this._prev; }
        /**
         *  Create new event based on this one.
         *
         *  @param  string  The name of the event's channel.
         *  @param  mixed   (Optional) The associated data.
         *  @param  Emitter (Optional) The emitter instance that is the target of the event. If
         *                  no target is provided, the current event target is used.
         */
        createEvent(name, data = {}, target = null) {
            // return new event instance
            return new Iventy.Event(name, data, target || this._target, this);
        }
    }
    Iventy.Event = Event;
    ;
})(Iventy || (Iventy = {}));
