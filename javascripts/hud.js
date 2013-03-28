function Hud() {
  this.currentColor = Colors.random();
  this.progressBar = new ProgressBar(this.currentColor);
  this.preview = new Preview(this.currentColor);
  this.pointsView = new PointsView();
  EventHandler.subscribe('newTile', new Subscriber(this, this.changeColor.bind(this)));
}

Hud.prototype.changeColor = function() {
  this.currentColor = Colors.random();
  this.preview.color = this.currentColor;
  this.progressBar.color = this.currentColor;
}

Hud.prototype.render = function () {
  this.progressBar.render();
  this.preview.render();
  this.pointsView.render();
}