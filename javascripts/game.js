function Game() {
  this.canvas = document.getElementById('game');
  this.nextTileColor = Colors.random();
  this.hud = new Hud(this.nextTileColor);
  this.grid = new Grid(this.nextTileColor);
  this.playing = true;
  EventHandler.subscribe('gameOver', new Subscriber(this, this.gameOver.bind(this)));
  EventHandler.subscribe('newTile', new Subscriber(this, this.changeColor.bind(this)));
  this.timeHandler = new TimeHandler();
  this.timeHandler.addTimer(new Timer('newRowTimer', TimeHandler.newRowDelay, 'newRow'));
  this.timeHandler.addTimer(new Timer('moveTilesTimer', 300, 'moveTiles'));
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

Game.prototype.changeColor = function() {
  this.nextTileColor = Colors.random();
  this.grid.nextTileColor = this.nextTileColor;
  this.hud.changeColor(this.nextTileColor);
};

Game.prototype.gameOver = function() {
  if (this.playing) {
    this.playing = false;
    this.timeHandler.clear();
    var p = document.createElement('p');
    p.innerHTML = 'Game Over!';
    this.canvas.appendChild(p);
  }
}