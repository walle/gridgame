function PointsView() {
  this.points = 0;
  this.pointsView = document.getElementById('points');
  EventHandler.subscribe('scoreUpdate', new Subscriber(this, this.scoreUpdate.bind(this)));
}

PointsView.prototype.render = function() {
  this.pointsView.innerHTML = this.points + ' points';
};

PointsView.prototype.scoreUpdate = function(invoker, data) {
  this.points += data.score;
};