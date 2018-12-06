/**
 *  A class that can be used as event emitter on client and server side. An
 *  event emitter allows to register a number of callbacks that should be
 *  triggered when an event on specific channel is triggered. It's possible
 *  to distinguish channels by names.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

// the dependencies
const Event = require('./Event.js');

// the private symbols
const channels = Symbol('channels');
const bubbleTo = Symbol('bubbleTo');

// export the class
module.exports = class {

    /**
     *  The constructor
     */
    constructor () {

        /**
         *  A map container arrays of callbacks per callback channel.
         *  @var    Map
         */
        this[channels] = new Map();

        /**
         *  An event emitter to which all events should be propagated.
         *  @var    Emitter
         */
        this[bubbleTo] = null;
    }

    /**
     *  Trigger event on the emitter.
     *
     *  @param  Iventy.Event    The event instance that should be triggered.
     *  @return Iventy.Emitter  The emitter that the event was called on.
     */
    trigger (event) {

        // od we have callbacks for the event channel?
        if (this[channels].has(event.type)) {

            // iterate over the callbacks and call them one by one
            for(let callback of this[channels].get(event.type)) callback(event);
        }

        // should we bubble the event further?
        if (this[bubbleTo]) this[bubbleTo].trigger(event);

        // allow chaining
        return this;
    };

    /**
     *  Install callback on given channel.
     *
     *  @param  string      The channel name.
     *  @param  function    The callback to call when the event is triggered
     */
    on(name, callback) {

        // ensure that we have registered the channel name
        if (!this[channels].has(name)) this[channels].set(name, []);

        // push next callback on the
        this[channels].get(name).push(callback);

        // allow chaining
        return this;
    }

    /**
     *  Uninstall callback on given channel.
     *
     *  @param  string      The channel name.
     *  @param  function    The callback to uninstall.
     *  @return Emitter
     *
     *  ---------------------------------------------
     *
     *  Uninstall all registered callbacks.
     *
     *  @return Emitter
     */
    off(name, callback) {

        // should we uninstall a callback on specific channel? or all possible callbacks?
        if (name) {

            // do we even have a channel under this name?
            if (!this[channels][name]) return this;

            // filter the callbacks
            this[channels].set(name, this[channels].get(name).filter(function (item) {

                // allow only callabacks that we don't want to uninstall
                return item != callback;
            }));

        // we should remove all possible callbacks
        } else this[channels].clear();

        // allow chaining
        return this;
    }

    /**
     *  This is a function that will allow to bubble an event to another emitter
     *
     *  @param  EventEmitter
     */
    bubbleTo(target) {

        // do we have a new target to set?
        if (typeof(target) != 'undefined') {

            // set the bubble to target
            this[bubbleTo] = target;

            // allow chaining
            return this;
        }

        // return the current bubble to
        return this[bubbleTo];
    }

    /**
     *  A method to create an event based on this emitter.
     *
     *  @param  string  The name of the channel of the event.
     *  @param  mixed   (Optional) The object of the event.
     *  @param  Event   (Optional) The previous event in the chain. If none
     *                  is provided then event has no previous event.
     *
     *  @return Event   The constructed event.
     */
    createEvent(name, data = { }, previousEvent = null) {

        // construct new event
        return new Event(name, data, this, previousEvent);
    }
};
