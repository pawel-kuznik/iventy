import { Emitter } from "./Emitter";

// start the test of the Emitter class
describe('Emitter', () => {

    describe('.constructor()', () => {

        it('should construct a simple Emitter', () => {

            // construct an emitter
            let emitter = new Emitter();

            // really an emitter?
            expect(emitter).toBeInstanceOf(Emitter);
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
                expect(event).toEqual(triggeredEvent);

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
            emitter.on('test', () => {

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

    describe('.off', () => {

        it('should remove previously installed callback', () => {

            // construct an emitter
            let emitter = new Emitter();

            const callback = () => {

                // we are done here
                throw new Error('do not handle this');
            };

            // install a callback
            emitter.on('test', callback);

            // remove the callback
            emitter.off('test', callback);

            // trigger the event
            emitter.trigger('test');
        });
    });

    describe('.bubbleTo()', () => {

        it('should bubble events from one emitter to another', done => {

            // construct two event emitters
            const emitterOne = new Emitter(), emitterTwo = new Emitter();

            // make the emitter one bubble all events to emitter two
            emitterOne.bubbleTo(emitterTwo);

            // install a test handler on emitter two
            emitterTwo.on('test', () => void done());

            //  trigger test event
            emitterOne.trigger('test');
        });

        it('should bubble events from one emitter to all rising emitters', done => {

            // create 3 emitters
            const emitterOne = new Emitter(), emitterTwo = new Emitter(), emitterThree = new Emitter();

            // bubble events from emitter one to emitter two and three
            emitterOne.bubbleTo(emitterTwo);
            emitterOne.bubbleTo(emitterThree);

            // make one emitter flag and second emitter flag
            let one = false, two = false;

            // install callbacks
            emitterTwo.on('test', () => { one = true; });
            emitterThree.on('test', () => { two = true; });

            // trigger the event
            emitterOne.trigger('test');

            // execute with timeout
            setTimeout(() => {

                // we have both flags set, then we are done
                if (one && two) done();
            });
        });

        it('should bubble event and assign additional tags', done => {

            // construct two event emitters
            const emitterOne = new Emitter(), emitterTwo = new Emitter();

            // make the emitter one bubble all events to emitter two and assign
            // special tag
            emitterOne.bubbleTo(emitterTwo, 'tag');

            // install a test handler on emitter two
            emitterTwo.on('test', event => {

                // make sure tags have the tag we assigned to the bubble
                expect(event.tags).toContain('tag');

                // done
                done();
            });

            //  trigger test event
            emitterOne.trigger('test');
        });
    });
});
