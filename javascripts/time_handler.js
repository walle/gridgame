function TimeHandler() {
  this.timers = [];
}

TimeHandler.prototype.addTimer = function(timer) {
  this.timers.push(timer);
};