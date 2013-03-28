function Hud(color) {
  this.progressBar = new ProgressBar(color);
  this.preview = new Preview(color);
  this.pointsView = new PointsView();
}

Hud.prototype.changeColor = function(color) {
  this.preview.color = color;
  this.progressBar.color = color;
}

Hud.prototype.render = function () {
  this.progressBar.render();
  this.preview.render();
  this.pointsView.render();
}