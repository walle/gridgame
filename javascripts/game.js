function Game() {
  this.canvas = document.getElementById('game');
  this.grid = new Grid(this);
  this.currentColor = Colors.RED;
  this.newRowTime = 6000;
  this.playing = true;
  this.nextTile = document.getElementById('next');
  this.nextTile.className = 'tile ' + this.currentColor;
  this.points = 0;
  this.pointsView = document.getElementById('points');
  this.progressView = document.getElementById('progress');
  this.progressDiv = this.progressView.children[0];
}

Game.prototype.start = function () {
  requestAnimationFrame(this.tick.bind(this));
};

Game.prototype.update = function () {
  this.progressDiv.className = this.currentColor;
  var diff = new Date().getTime() - this.grid.lastUpdate.getTime();
  console.log(diff);
  this.progressDiv.style.width = (diff / this.newRowTime) * 100 + '%';
  this.grid.update();
};

Game.prototype.render = function () {
  this.pointsView.innerHTML = this.points + ' points';
  this.grid.render();
};

Game.prototype.tick = function () {
  if (this.playing) {
    requestAnimationFrame(this.tick.bind(this));
    this.update();
    this.render();
  }
};

Game.prototype.gameOver = function() {
  this.playing = false;
  var p = document.createElement('p');
  p.innerHTML = 'Game Over!';
  this.canvas.appendChild(p);
}