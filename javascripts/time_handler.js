function TimeHandler() {
  this.timers = [];
}

TimeHandler.prototype.addTimer = function(timer) {
  this.timers.push(timer);
};

TimeHandler.prototype.clear = function() {
  this.timers.forEach(function(e) {
    e.clear();
  });
  this.timers = [];
};

TimeHandler.now = function () {
  return new Date().getTime();
};

TimeHandler.newRowDelay = 6000;