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

// the private symbols
const _type = Symbol('type');
const _data = Symbol('data');
const _target = Symbol('target');
const _prev = Symbol('prev');
const _prevented = Symbol('prevented');
const _stopped = Symbol('stopped');

// return the class
module.exports = class {

    /**
     *  The constructor
     *
     *  @param  sting   The channel type of the event.
     *  @param  mixed   The data associated with the event.
     *  @param  Emitter The emitter that triggers this event.
     *  @param  Event   The previous event in chain that lead to this event.
     */
    constructor(type, data, target = null, prevEvent = null) {

        // assign the basic data
        this[_type] = type;
        this[_data] = data;
        this[_target] = target;
        this[_prev] = prevEvent;

        // assign the properties
        this[_prevented] = false;
        this[_stopped] = false;
    }

    /**
     *  Prevent the event.
     *
     *  @return Event   The prevented event.
     */
    prevent() {

        // mark the event as prevented
        this[_prevented] = true;

        // return same event
        return this;
    }

    /**
     *  Is the event prevented.
     *
     *  @return bool
     */
    get isPrevented () {

        // return the prevented flag
        return this[_prevented];
    }

    /**
     *  Stop the event
     */
    stop() {

        // mark the event as stopped
        this[_stopped] = true;

        // allow chaining
        return this;
    }

    /**
     *  Is the event stopped.
     *
     *  @return bool
     */
    get isStopped () {

        return this[_stopped];
    }

    /**
     *  Return the type of the event.
     *
     *  @return string
     */
    get type () {

        // return the type
        return this[_type];
    }

    /**
     *  The data associated with the event.
     *
     *  @return mixed
     */
    get data() {

        // return the data
        return this[_data];
    }

    /**
     *  Get the target of the event.
     *
     *  @return Emitter
     */
    get target() {

        // return the event's target
        return this[_target];
    }

    /**
     *  Get the previos event in the chain.
     *  
     *  @return Event
     */
    get previous() {

        // return the previous event
        return this[_prev];
    }

    /**
     *  Create new event based on this one.
     *
     *  @param  string  The name of the event's channel.
     *  @param  mixed   (Optional) The associated data.
     *  @param  Emitter (Optional) The emitter instance that is the target of the event. If
     *                  no target is provided, the current event target is used.
     */
    createEvent(name, data = { }, target = null) {

        // return new event instance
        return new this.constructor(name, data, target ? target : this.target, this);
    }
};
