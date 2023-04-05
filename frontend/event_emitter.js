class Event_emitter {
    constructor() {
        /*
        The constructor method is used to initialize an empty object named events as an instance variable of the class.
        This object will store the events and their corresponding callbacks.

        events: {
              eventName1: [callback1, callback2, ..., callbackN],
              eventName2: [callback1, callback2, ..., callbackN],
              ...,
              eventNameM: [callback1, callback2, ..., callbackN],
                };
        */
        this.events = {};
    }

    on(eventName, callback) {
        !this.events[eventName] && (this.events[eventName] = []);
        this.events[eventName].push(callback);
    }

    unsubscribe(eventName, callback) {
        this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
    }

    emit(eventName, args) {
        const event = this.events[eventName];
        event && event.forEach(callback => callback.call(null, args));
    }
}

export {Event_emitter}