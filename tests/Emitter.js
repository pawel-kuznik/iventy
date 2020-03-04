/**
 *  This is a test file for the Emitter class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the testing method
const expect = require('chai').expect;

// the Event class to text
const Emitter = require('../build/iventy.js').Emitter;

// start the test of the Emitter class
describe('Emitter', () => {

    describe('.constructor()', () => {

        it('should construct a simple Emitter', () => {

            // construct an emitter
            let emitter = new Emitter();

            // really an emitter?
            expect(emitter).to.be.instanceof(Emitter);
        });
    });

    describe('.trigger()', () => {

        it('should trigger a constructed event', done => {

            // construct an emitter
            let emitter = new Emitter();

            // create an event
            let event = emitter.createEvent('test');

            // install a callback
            emitter.on('test', triggeredEvent => {

                // it should be the same event
                expect(event).to.equal(triggeredEvent);

                // we are done
                done();
            });

            // trigger the event
            emitter.trigger(event);
        });

        it('should trigger an emplaced event', done => {

            // construct an emitter
            let emitter = new Emitter();

            // install a callback
            emitter.on('test', triggeredEvent => {

                // we are done here
                done();
            });

            // trigger the event
            emitter.trigger('test');
        });
    });

    describe('.on()', () => {

        it('should handle an event', done => {

            // construct an emitter
            let emitter = new Emitter();

            // install a callback
            emitter.on('test', () => {

                // we are done here
                done();
            });

            // trigger the event
            emitter.trigger('test');
        });

        it('should handle a tagged event', done => {

            // construct an emitter
            let emitter = new Emitter();

            // install a callback
            emitter.on('test.tag', () => {

                // we are done here
                done();
            });

            // trigger the event
            emitter.trigger('test.tag');
        });

        it ('should handle event despise a tag', done => {

            // construct an emitter
            let emitter = new Emitter();

            // install a callback
            emitter.on('test', () => {

                // we are done here
                done();
            });

            // trigger the event
            emitter.trigger('test.tag');
        });

        it('should not handle event with different tag', () => {

            // construct an emitter
            let emitter = new Emitter();

            // install a callback
            emitter.on('test.another', () => {

                // we are done here
                throw new Error('do not handle this');
            });

            // trigger the event
            emitter.trigger('test.test');
        });
    });
});
