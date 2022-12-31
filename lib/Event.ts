import { Emitter } from "./Emitter";
import { Designator } from './Designator';
import { Packet } from "./Packet";

/**
 *  This is a class to acompany the Emitter class. The Event has important
 *  properties:
 *
 *  type:string             The type of the event (basically the event/chanel name)
 *  data:mixed              The additional data assigned to the event.
 *  target:Emitter          The emitter that ignited the event.
 *  currentTarget:Emitter   The last emitter in bubble chaing
 *
 *  The type provided to this class can contain tags. They can be provided by
 *  dot separating them from the actual type. Follow this pattern:
 *
 *      type.tag1.tag2.tag3
 */
export class Event extends Packet {

    /**
     *  The designator of the event.
     */
    private readonly _designator:Designator;

    /**
     *  The instance of Emitter that created this event.
     */
    private readonly _target:Emitter | null;

    /**
     *  The previous event in the chain of events.
     */
    private readonly _prev:Event | null;

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
    public constructor(type:string, data:object = { }, target:Emitter | null  = null, prev:Event | null = null) {

        super(data);

        // construct event designator
        this._designator = new Designator(type);

        // assign additional data
        this._target = target;
        this._prev = prev;
    }

    /**
     *  Prevent the event.
     */
    public prevent() : Event
    {
        // mark the event as prevented
        this._prevented = true;

        // return same event
        return this;
    }

    /**
     *  Is the event prevented.
     */
    public get isPrevented () : boolean { return this._prevented; }

    /**
     *  Stop the event
     */
    public stop() : Event
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
     */
    public get type() : string { return this._designator.name; }

    /**
     *  Get access to tags assigend to this event.
     */
    public get tags() : Array<string> { return this._designator.tags; }

    /**
     *  The data associated with the event.
     */
    public get data() : object { return this.payload; }

    /**
     *  Get the target of the event.
     */
    public get target() : any { return this._target; }

    /**
     *  Get the previos event in the chain.
     */
    public get previous() : Event | null { return this._prev; }

    /**
     *  Create new event based on this one.
     */
    createEvent(name:string , data = { }, target:Emitter | null = null) : Event {

        // return new event instance
        return new Event(name, data, target || this._target, this);
    }

    /**
     *  Create a new extended event. An extended event is same as this one, but
     *  it has an additional set of tags. This is useful when we want to bubble
     *  events but as they bubble they need to get more tags assigned to them.
     */
    extendEvent(tags:Array<string>) : Event {

        // create a new event that is based on an extended
        return new Event(this._designator.extend(tags).toString(), this.data, this._target, this._prev);
    }
};
