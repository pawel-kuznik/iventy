import { Channel } from "./Channel";
import { Event } from "./Event";

describe('Channel', () => {

    describe('.register()', () => {

        it('should register a callback', () => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => { });

            // expect to have a callback
            expect(channel.size).toEqual(1);
        });

        it('should register a callback with a tag', () => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => { }, 'tag1');

            // expect to have a callback
            expect(channel.size).toEqual(1);
        });

        it('should register a callbacks for each tag', () => {

            // create a channel
            const channel = new Channel();

            // register a callback
            channel.register(event => { }, [ 'tag1', 'tag2' ]);

            // expect to have a callback
            expect(channel.size).toEqual(2);
        });
    });

    describe('.observe()', () => {

        it('should register a callback', done => {

            const channel = new Channel();
            channel.observe(() => done());

            channel.trigger(new Event('test'));
        });

        it('unregister a callback if uninstall is called', done => {

            const channel = new Channel();
            const uninstall = channel.observe(() => { throw Error('Should not happen'); });
            uninstall();

            channel.trigger(new Event('test'));

            setTimeout(() => done(), 100); 
        });
    });

    describe('.unregister()', () => {

        it('should unregister same callback', () => {

            // create a channel
            const channel = new Channel();

            // the handler
            const handler = () => { };

            // register a callback
            channel.register(handler);

            // unregister the callback
            channel.unregister(handler);

            // expect to have a callback
            expect(channel.size).toEqual(0);
        });

        it('should unregister callbacks by tag', () => {

            // create a channel
            const channel = new Channel();

            // the handler
            const handler = () => { };

            // register a callback
            channel.register(handler);
            channel.register(handler, 'tag1');

            // unregister the callback
            channel.unregister(handler, 'tag1');

            // expect to have a callback
            expect(channel.size).toEqual(1);
        });

        it('should unregister callbacks by an array of tags', () => {

            // create a channel
            const channel = new Channel();

            // the handler
            const handler = () => { };

            // register a callback
            channel.register(handler);
            channel.register(handler, 'tag1');

            // unregister the callback
            channel.unregister(handler, [ 'tag1' ]);

            // expect to have a callback
            expect(channel.size).toEqual(1);
        });

        it('should unregister callbacks by an empty array', () => {

            // create a channel
            const channel = new Channel();

            // the handler
            const handler = () => { };

            // register a callback
            channel.register(handler);
            channel.register(handler, 'tag1');

            // unregister the callback
            channel.unregister(handler, [ ]);

            // expect to have a callback
            expect(channel.size).toEqual(2);
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
            channel.trigger(new Event('test'));
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
            channel.trigger(new Event('test.tag1'));
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
            channel.trigger(new Event('test.tag1'));
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
            channel.trigger(new Event('test.tag1'));
        });
    });
});
