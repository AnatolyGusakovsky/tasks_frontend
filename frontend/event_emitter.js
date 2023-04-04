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

    /**
     * @param {string} eventName
     * @param {Function} callback
     * The subscribe method is used to register a new callback function for a given event.
     * It takes two parameters, the eventName and the callback (a function to be executed when the event is emitted).
     * If the events object does not yet have a property with the name of the eventName, it creates an empty array for that property.
     * It then pushes the new callback function to the array.
     */
    subscribe(eventName, callback) {
        !this.events[eventName] && (this.events[eventName] = []);
        this.events[eventName].push(callback);
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     * The unsubscribe method is used to remove a registered callback function for a given event.
     * It takes the same two parameters as subscribe.
     * It first retrieves the array of callbacks for the specified event using the eventName property of the events object.
     * It then filters out the specified callback function from the array of callbacks using the Array.filter() method.
     */
    unsubscribe(eventName, callback) {
        this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
    }

    /**
     * @param {string} eventName
     * @param {any} args
     * The emit method is used to trigger the execution of all registered callback functions for a given event.
     * It takes two parameters, the eventName and the args (an optional argument that can be passed to the callbacks).
     * It first retrieves the array of callbacks for the specified event using the eventName property of the events object.
     * If the array exists (i.e., if there is at least one registered callback for the event),
     * it iterates over each callback in the array.
     * For each callback, it invokes the callback function with the args parameter using the Function.call() method.
     */
    emit(eventName, args) {
        const event = this.events[eventName];
        event && event.forEach(callback => callback.call(null, args));
    }
}

export {Event_emitter}