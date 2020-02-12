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

    describe('#constructor', () => {

        it('should construct a simple Emitter', () => {

            // construct an emitter
            let emitter = new Emitter();

            // really an emitter?
            expect(emitter).to.be.instanceof(Emitter);
        });
    });
});
