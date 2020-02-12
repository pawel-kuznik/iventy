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

namespace Iventy {

    // return the class
    export class Event {

        /**
         *  The event type.
         */
        private _type:string;

        /**
         *  The data associated with the event.
         */
        private _data:object;

        /**
         *  The instance of Emitter that created this event.
         */
        private readonly _target:Iventy.Emitter | null;

        /**
         *  The previous event in the chain of events.
         */
        private readonly _prev:Iventy.Event | null;

        /**
         *  Flags to tell if the event is stopped or prevented.
         */
        private _prevented:boolean = false;
        private _stopped:boolean = false;

        /**
         *  The constructor
         *
         *  @param  sting   The channel type of the event.
         *  @param  object   The data associated with the event.
         *  @param  Emitter The emitter that triggers this event.
         *  @param  Event   The previous event in chain that lead to this event.
         */
        public constructor(type:string, data:object, target:Iventy.Emitter | null  = null, prev:Iventy.Event | null = null) {

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
        public prevent() : Iventy.Event
        {
            // mark the event as prevented
            this._prevented = true;

            // return same event
            return this;
        }

        /**
         *  Is the event prevented.
         *  @return bool
         */
        public get isPrevented () : boolean { return this._prevented; }

        /**
         *  Stop the event
         */
        public stop() : Iventy.Event | null
        {
            // mark the event as stopped
            this._stopped = true;

            // allow chaining
            return this;
        }

        /**
         *  Is the event stopped.
         */
        public get isStopped () : boolean { return this._stopped; }

        /**
         *  Return the type of the event.
         *
         *  @return string
         */
        public get type () : string { return this._type; }

        /**
         *  The data associated with the event.
         *
         *  @return mixed
         */
        public get data() : object { return this._data; }

        /**
         *  Get the target of the event.
         *
         *  @return Emitter
         */
        public get target() : any { return this._target; }

        /**
         *  Get the previos event in the chain.
         *
         *  @return Event
         */
        public get previous() : Iventy.Event | null { return this._prev; }

        /**
         *  Create new event based on this one.
         *
         *  @param  string  The name of the event's channel.
         *  @param  mixed   (Optional) The associated data.
         *  @param  Emitter (Optional) The emitter instance that is the target of the event. If
         *                  no target is provided, the current event target is used.
         */
        createEvent(name:string , data = { }, target:Iventy.Emitter | null = null) : Iventy.Event {

            // return new event instance
            return new Iventy.Event(name, data, target || this._target, this);
        }
    };
}