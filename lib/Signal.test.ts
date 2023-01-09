import { SignalController } from "./Signal";

describe("Signal", () => {
    it('should trigger an observe callback', done => {

        const controller = new SignalController<number>();

        controller.signal.observe(() => {
            done();
        });

        controller.activate(2);
    });
    it('should allow for uninstalling the callbacks', done => {

        const controller = new SignalController<number>();

        const uninstall = controller.signal.observe(() => {

            throw Error('should not be called');
        });

        uninstall();

        controller.activate(1);

        setTimeout(done, 10);
    });
});
