function Game() {
  this.canvas = document.getElementById('game');
  this.grid = new Grid(this);
  this.currentColor = Colors.RED;
  this.newRowTime = 6000;
  this.playing = true;
  this.nextTile = document.getElementById('next');
  this.nextTile.className = 'tile ' + this.currentColor;
}

Game.prototype.start = function () {
  requestAnimationFrame(this.tick.bind(this));
};

Game.prototype.update = function () {
  this.grid.update();
};

Game.prototype.render = function () {
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