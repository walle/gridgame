function TimeHandler() {
  this.timers = [];
}

TimeHandler.prototype.addTimer = function(timer) {
  this.timers.push(timer);
};

TimeHandler.now = function () {
  return new Date().getTime();
};

TimeHandler.newRowDelay = 6000;