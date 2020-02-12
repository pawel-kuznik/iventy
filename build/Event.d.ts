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
declare namespace Iventy {
    class Event {
        /**
         *  The event type.
         */
        private _type;
        /**
         *  The data associated with the event.
         */
        private _data;
        /**
         *  The instance of Emitter that created this event.
         */
        private readonly _target;
        /**
         *  The previous event in the chain of events.
         */
        private readonly _prev;
        /**
         *  Flags to tell if the event is stopped or prevented.
         */
        private _prevented;
        private _stopped;
        /**
         *  The constructor
         *
         *  @param  sting   The channel type of the event.
         *  @param  object   The data associated with the event.
         *  @param  Emitter The emitter that triggers this event.
         *  @param  Event   The previous event in chain that lead to this event.
         */
        constructor(type: string, data: object, target?: Iventy.Emitter | null, prev?: Iventy.Event | null);
        /**
         *  Prevent the event.
         *  @return Event   The prevented event.
         */
        prevent(): Iventy.Event;
        /**
         *  Is the event prevented.
         *  @return bool
         */
        get isPrevented(): boolean;
        /**
         *  Stop the event
         */
        stop(): Iventy.Event | null;
        /**
         *  Is the event stopped.
         */
        get isStopped(): boolean;
        /**
         *  Return the type of the event.
         *
         *  @return string
         */
        get type(): string;
        /**
         *  The data associated with the event.
         *
         *  @return mixed
         */
        get data(): object;
        /**
         *  Get the target of the event.
         *
         *  @return Emitter
         */
        get target(): any;
        /**
         *  Get the previos event in the chain.
         *
         *  @return Event
         */
        get previous(): Iventy.Event | null;
        /**
         *  Create new event based on this one.
         *
         *  @param  string  The name of the event's channel.
         *  @param  mixed   (Optional) The associated data.
         *  @param  Emitter (Optional) The emitter instance that is the target of the event. If
         *                  no target is provided, the current event target is used.
         */
        createEvent(name: string, data?: {}, target?: Iventy.Emitter | null): Iventy.Event;
    }
}
