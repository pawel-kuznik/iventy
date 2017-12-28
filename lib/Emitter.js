/**
 *  A class that can be used as event emitter on client and server side.
 *
 *  @author     Paweł Kuźnik <pawel.kuznik@gmail.com>
 */

var _chanels = Symbol('chanels');
var _intercept = Symbol('intercept');
var _bubbleTo = Symbol('bubbleTo');
module.exports = class {

    /**
     *  The constructor
     */
    constructor () {

        // the chanels
        this[_chanels] = { };
    }

    /**
     *  Trigger event on the emitter.
     *
     *  @param  string  The name of the event
     *  @param  mixed   The event data
     */
    trigger (name, event) {

        // support for .type property on event object
        if (name.type) {
            event = name;
            name = event.type;
        }

        // assign this as event target
        if (!event.target) event.target = this;
        else event.currentTarget = this;

        // should we intercept the event?
        if (this[_intercept] && !this[_intercept](name, event)) return this;

        // do we have a chanel to call the callbacks on?
        if (this[_chanels][name]) {

            // iterate over the chanels and call the callback
            this[_chanels][name].forEach(function (callback) {

                // call the callback
                callback(event);
            });
        }

        // should we bubble the event further?
        if (this[_bubbleTo]) this[_bubbleTo].trigger(name, event);

        // allow chaining
        return this;
    };

    /**
     *  Install callback on given chanel.
     *
     *  @param  string      The chanel name.
     *  @param  function    The callback to call when the event is triggered
     */
    on(name, callback) {

        // ensure that we have registered the chanel name
        if (!this[_chanels][name]) this[_chanels][name] = [];

        // push next callback on the
        this[_chanels][name].push(callback);

        // allow chaining
        return this;
    }

    /**
     *  Uninstall callback on given chanel.
     *
     *  @param  string      The chanel name.
     *  @param  function    The callback to uninstall.
     */
    off(name, callback) {

        // do we even have a chanel?
        if (!this[_chanels][name]) return this;

        // filter the callbacks
        this[_chanels][name] = this[_chanels][name].filter(function (item) {

            // allow only callabacks that we don't want to uninstall
            return item != callback;
        });

        // allow chaining
        return this;
    }

    /**
     *  This is a function  that will allow to plant an interception callback.
     *  This interception callback will be triggered before an event will be
     *  triggered. If the callback returns true, then the event will be triggered,
     *  otherwise the event will not be triggered.
     *
     *  @param  function
     */
    intercept(callback) {

        // install the new intercept callback
        this[_intercept] = callback;

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
            this[_bubbleTo] = target;

            // allow chaining
            return this;
        }

        // return the current bubble to
        return this[_bubbleTo];
    }
};
