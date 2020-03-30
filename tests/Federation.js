/**
 *  This is a test file for the Federation class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the testing method
const expect = require('chai').expect;

// the Event class to text
const Federation = require('../build/iventy.js').Federation;
const Emitter = require('../build/iventy.js').Emitter;

// start the test of the Emitter class
describe('Federation', () => {

    describe('.constructor()', () => {

        it('should construct a simple Federation', () => {

            // construct an federation
            let emitter = new Federation();

            // really an federation?
            expect(emitter).to.be.instanceof(Federation);
        });
    });

    describe('.add()', () => {

        it('should add an emitter to the federation', () => {

            // construct federation and an emitter
            let federation = new Federation();
            let emitter = new Emitter();

            // add the emitter
            federation.add(emitter);

            // expect the federation to to be of size 1
            expect(federation.size).to.equal(1);
        });

        it('should make sure that events triggerd on added emitter are triggered on federation', done => {

            // construct federation and an emitter
            let federation = new Federation();
            let emitter = new Emitter();

            // add the emitter
            federation.add(emitter);

            // install an event handler on test channel
            federation.on('test', () => void done());

            // trigger test event
            emitter.trigger('test');
        });
    });
});
