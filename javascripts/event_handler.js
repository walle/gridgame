var EventHandler = {
  events: {},
  domEvent: function(eventName, domElement, callback) {
    domElement.addEventListener(eventName, callback);
  },
  clickEvent: function(domElement, callback) {
    if (this.touchEventAvailable()) {
      this.domEvent('touchstart', domElement, callback);
    } else {
      this.domEvent('click', domElement, callback);
    }
  },
  touchEventAvailable: function() {
    return document.touchstart;
  },
  subscribe: function(eventName, subscriber) {
    if (EventHandler.events[eventName]) {
      EventHandler.events[eventName].subscribe(subscriber);
    } else {
      EventHandler.events[eventName] = new Event(eventName);
      EventHandler.events[eventName].subscribe(subscriber);
    }
  },
  notify: function(eventName, invoker, eventData) {
    if (EventHandler.events[eventName]) {
      EventHandler.events[eventName].notify(invoker, eventData);
    }
  }
};

function Event(name) {
  this.name = name;
  this.subscribers = [];
}

Event.prototype.subscribe = function(subscriber) {
  this.subscribers.push(subscriber);
}

Event.prototype.notify = function(invoker, eventData) {
  this.subscribers.forEach(function(subscriber) {
    subscriber.notify(invoker, eventData);
  });
}

function Subscriber(instance, callback) {
  this.instance = instance;
  this.callback = callback;
}

Subscriber.prototype.notify = function(invoker, eventData) {
  this.callback.apply(this.instance, [invoker, eventData]);
};