function PointsView() {
  this.points = 0;
  this.pointsView = document.getElementById('points');
}

PointsView.prototype.render = function() {
  this.pointsView.innerHTML = this.points + ' points';
};