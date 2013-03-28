function Game() {
  this.canvas = document.getElementById('game');
  this.grid = new Grid(this);
  this.playing = true;
  this.hud = new Hud();
  this.timeHandler = new TimeHandler();
  this.timeHandler.addTimer(new Timer('newRowTimer', TimeHandler.newRowDelay, 'newRow'));
  this.timeHandler.addTimer(new Timer('moveTileTimer', 300, 'moveTile'));
}

Game.prototype.start = function () {
  requestAnimationFrame(this.tick.bind(this));
};

Game.prototype.update = function () {
  this.grid.update();
};

Game.prototype.render = function () {
  this.hud.render();
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