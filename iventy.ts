/**
 *  This is an entry file for the whole library. This file exposes (and kicks in
 *  the compilation process) all of the public classes of the library. This means
 *  that if something should be exposed outside, it should be exported via this
 *  file.
 */

// export all of the public classes.
export { Event } from './lib/Event';
export { EmitterLike } from "./lib/EmitterLike";
export { Emitter } from './lib/Emitter';
export { EventHandler } from './lib/EventHandler';
export { Federation } from './lib/Federation';
export { Signal, SignalController, SignalCallback, SignalCallbackUninstaller } from "./lib/Signal";
export { EventHandlerUninstaller } from "./lib/Channel";