import { Emitter } from "./Emitter";
import { Federation } from "./Federation";
describe('Federation', () => {

    describe('.constructor()', () => {

        it('should construct a simple Federation', () => {

            // construct an federation
            let emitter = new Federation();

            // really an federation?
            expect(emitter).toBeInstanceOf(Federation);
        });
    });

    describe('.add()', () => {

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

        it('should make sure that events triggered on added emitter are triggered on fedetaion and can extend tags', done => {

            // construct federation and an emitter
            let federation = new Federation();
            let emitter = new Emitter();

            // add the emitter
            federation.add(emitter, 'tag');

            // install an event handler on test channel
            federation.on('test', event => {

                // make sure we have the tag
                expect(event.tags).toContain('tag');

                // done
                done();
            });

            // trigger test event
            emitter.trigger('test');
        });
    });
});
