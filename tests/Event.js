/**
 *  This is the test file for the Event class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the testing method
const expect = require('chai').expect;

// the Event class to text
const Event = require('../lib/Event.js');
const Emitter = require('../lib/Emitter.js');

// start testing the Event class
describe('Event', () => {

    // test the constructor
    describe('#constructor', () => {

        it('should create a basic event', () => {

            // construct an instance of the event
            let event = new Event('test', { foo: 1 });

            // test the properties
            expect(event).to.have.property('type').and.equal('test');
            expect(event).to.have.property('data').and.be.an('object').and.have.property('foo').and.equal(1);
            expect(event).to.have.property('target').and.equal(null);
            expect(event).to.have.property('previous').and.equal(null);
            expect(event).to.have.property('isPrevented').and.equal(false);
        });

        it('should create an event with an emitter as target', () => {

            // construct a simple emitter
            let emitter = new Emitter();

            // construct a base event
            let event = new Event('test', undefined, emitter);

            // expect the event to have the emitter as target
            expect(event).to.have.property('target').and.equal(emitter);
        });

        it('should create an event based on another event', () => {

            // construct a simple emitter
            let emitter = new Emitter();

            // construct a base event
            let one = new Event('test', undefined, emitter);

            // construct the event to test
            let event = new Event('test', undefined, emitter, one);

            // make sure the event is properly constructed
            expect(event).to.have.property('previous').and.equal(one);
            expect(event).to.have.property('target').and.equal(one.target);
        });
    });

    // test the prevent method
    describe('#prevent', () => {

        it('should change the .isPrevented property', () => {

            // construct the event
            let event = new Event('test');

            // prevent the event
            event.prevent();

            // check if the prevented changed 
            expect(event).to.have.property('isPrevented').and.equal(true);
        });
    });

    // test the createEvent method
    describe('#createEvent', () => {

        it('should create a new event based on current one', () => {

            // construct base event
            let base = new Event('test');

            // the next event
            let next = base.createEvent('next');

            // check if next is really and event and is based on the base event
            expect(next).to.be.instanceof(Event).and.have.property('previous').and.equal(base);
        });
    });
});
