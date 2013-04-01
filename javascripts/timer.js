function Timer(name, time, eventName) {
  this.name = name;
  this.time = time;
  this.eventName = eventName;
  this.reset();
}

Timer.prototype.reset = function() {
  var self = this;
  this.timeout = setTimeout(function() {
    EventHandler.notify(self.eventName);
    self.reset();
  }, this.time);
};

Timer.prototype.clear = function() {
  clearTimeout(this.timeout);
};