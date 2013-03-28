function Timer(name, time, eventName) {
  this.name = name;
  this.time = time;
  this.eventName = eventName;
  this.reset();
}

Timer.prototype.reset = function() {
  var self = this;
  setTimeout(function() {
    EventHandler.notify(self.eventName);
    self.reset();
  }, this.time);
};