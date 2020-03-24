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

    describe('.register()', () => {

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

    describe('.unregister()', () => {

        it('should unregister same callback', () => {

            // create a channel
            const channel = new Channel();

            // the handler
            const handler = event => { };

            // register a callback
            channel.register(handler);

            // unregister the callback
            channel.unregister(handler);

            // expect to have a callback
            expect(channel.size).to.be.equal(0);
        });

        it('should unregister callbacks by tag', () => {

            // create a channel
            const channel = new Channel();

            // the handler
            const handler = event => { };

            // register a callback
            channel.register(handler);
            channel.register(handler, 'tag1');

            // unregister the callback
            channel.unregister(handler, 'tag1');

            // expect to have a callback
            expect(channel.size).to.be.equal(1);
        });
    });

    describe('.trigger()', () => {

        it('should trigger the event', (done) => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => {

                // we are done here
                done();
            });

            // trigger an event on the channel
            channel.trigger(new IventyEvent('test'));
        });

        it('should trigger an event on certain tag', (done) => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => {

                // we are done here
                done();
            }, 'tag1');

            // trigger an event on the channel
            channel.trigger(new IventyEvent('test.tag1'));
        });

        it('should invoke general callback regardless of tag', (done) => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => {

                // we are done here
                done();
            });

            // trigger an event on the channel
            channel.trigger(new IventyEvent('test.tag1'));
        });

        it('should not invoke not matching callbacks', () => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => {

                // we are done here
                throw('Error');
            }, 'tag2');

            // trigger an event on the channel
            channel.trigger(new IventyEvent('test.tag1'));
        });
    });
});
