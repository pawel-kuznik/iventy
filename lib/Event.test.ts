import { Emitter } from "./Emitter";
import { Event } from "./Event";

// start testing the Event class
describe('Event', () => {

    // test the constructor
    describe('.constructor()', () => {

        it('should create a basic event', () => {

            // construct an instance of the event
            let event = new Event('test', { foo: 1 });

            // test the properties
            expect(event).toHaveProperty('type', 'test');
            expect(event).toHaveProperty('data');
            expect(typeof event.data).toEqual('object');
            expect(event.data).toHaveProperty('foo', 1);
            expect(event).toHaveProperty('target', null);
            expect(event).toHaveProperty('previous', null);
            expect(event).toHaveProperty('isPrevented', false);
        });

        it('should create an event with an emitter as target', () => {

            // construct a simple emitter
            let emitter = new Emitter();

            // construct a base event
            let event = new Event('test', undefined, emitter);

            // expect the event to have the emitter as target
            expect(event).toHaveProperty('target', emitter);
        });

        it('should create an event based on another event', () => {

            // construct a simple emitter
            let emitter = new Emitter();

            // construct a base event
            let one = new Event('test', undefined, emitter);

            // construct the event to test
            let event = new Event('test', undefined, emitter, one);

            // make sure the event is properly constructed
            expect(event).toHaveProperty('previous', one);
            expect(event).toHaveProperty('target', one.target);
        });

        it('should assign tags from the type name', () => {

            // construct an event
            let event = new Event('test.tag1');

            // expect tags in the event
            expect(event.tags).toHaveLength(1);

            // expect proper tag
            expect(event.tags[0]).toEqual('tag1');
        });
    });

    // test the prevent method
    describe('.prevent()', () => {

        it('should change the .isPrevented property', () => {

            // construct the event
            let event = new Event('test');

            // prevent the event
            event.prevent();

            // check if the prevented changed
            expect(event).toHaveProperty('isPrevented', true);
        });
    });

    // test the createEvent method
    describe('.createEvent()', () => {

        it('should create a new event based on current one', () => {

            // construct base event
            let base = new Event('test');

            // the next event
            let next = base.createEvent('next');

            // check if next is really and event and is based on the base event
            expect(next).toBeInstanceOf(Event);
            expect(next).toHaveProperty('previous', base);
        });
    });
});
