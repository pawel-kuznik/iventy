/**
 *  This is a test file for the Channel class.
 *
 *  @author     Pawel Kuznik <pawel.kuznik@gmail.com>
 */

// the testing method
const expect = require('chai').expect;

// the Channel class to text
const Channel = require('../build/lib/Channel.js').Channel;
const IventyEvent = require('../build/lib/Event.js').Event;

// start the test of the Emitter class
describe('Channel', () => {

    describe('.register', () => {

        it('should register a callback', () => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => { });

            // expect to have a callback
            expect(channel.size).to.be.equal(1);
        });

        it('should register a callback with a tag', () => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => { }, 'tag1');

            // expect to have a callback
            expect(channel.size).to.be.equal(1);
        });

        it('should register a callbacks for each tag', () => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => { }, [ 'tag1', 'tag2' ]);

            // expect to have a callback
            expect(channel.size).to.be.equal(2);
        });
    });
});
