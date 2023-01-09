/**
 *  This is a class that allows to span the event systen across different contexes.
 *  For example the one part can be in the renderer process and another part in
 *  a worker, over an RTC, or on a server. The events triggered and handled
 *  across all of these parts can be transfered like they would be part of
 *  the same context.
 */

import { Event } from "./Event";
import { Emitter } from "./Emitter";

// export the port class
export class Port {

    /**
     *  The emitters we want to bubblle our consumed events.
     */
    private readonly _bubbleTo:Set<[Emitter, Array<string>]> = new Set();

    /**
     *  Consume an object that comes from another instance of Port. This method
     *  will parse the event and trigger proper event on the port.
     *
     *  @param  object  The object created in some other port instance.
     */
    public consume(data:object) {

        // the construct an event
        const event = new Event(data.type, data.data);

        // iterate over all emitters we should bubble the events to
        this._bubbleTo.forEach(([handler, tags]) => {

            // make the handler trigger an extended event (with the tags)
            handler.trigger(event.extendEvent(tags));
        });
    }

    /**
     *  This is a function that will allow to bubble an event to another emitter
     *  @param  EventEmitter    The emitter it should bubble to.
     *  @param  Array           An optional array of tags (or single tag) that
     *                          the bubbled event will be extended with.
     *  @return Port
     */
    public bubbleTo(target:Emitter, tags:Array<string>|string|null = null) : Port {

        // make sure tags are an array
        if (typeof(tags) == 'string') tags = [ tags ];

        // no tags at all? then just assign an array
        if (tags == null) tags = [];

        // set new target
        this._bubbleTo.add([target, tags ? tags : []]);

        // allow chaining
        return this;
    }
};
