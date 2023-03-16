class Event_emitter {
  constructor() {
    /*    events: {
          eventName1: [callback1, callback2, ..., callbackN],
          eventName2: [callback1, callback2, ..., callbackN],
        ...,
          eventNameM: [callback1, callback2, ..., callbackN],
        };*/
    this.events = {};
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   */
  subscribe(eventName, callback) {
    !this.events[eventName] && (this.events[eventName] = []);
    this.events[eventName].push(callback);
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   */
  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
  }

  /**
   * @param {string} eventName
   * @param {any} args
   */
  emit(eventName, args) {
    const event = this.events[eventName];
    event && event.forEach(callback => callback.call(null, args));
  }
}