function Grid(game) {
  this.game = game;
  this.rows = 12;
  this.columns = 8;
  this.canvas = document.getElementById('grid');
  this.data = [];
  this.setup();
  this.lastUpdate = new Date();
  this.lastAdd = new Date();
  EventHandler.subscribe('newTile', new Subscriber(this, this.newTile.bind(this)));
  EventHandler.subscribe('newRow', new Subscriber(this, this.newRow.bind(this)));
}

Grid.prototype.setup = function() {
  for (var row = 0; row < this.rows; row++) {
    this.data[row] = [];
    var tr = document.createElement('tr');
    for (var col = 0; col < this.columns; col++) {
      this.data[row][col] = new Tile(this, row, col, Colors.EMPTY);
      tr.appendChild(this.data[row][col].render());
    }
    this.canvas.appendChild(tr);
  }
  for (var col = 0; col < this.columns; col++) {
    this.data[this.rows - 1][col].color = Colors.random();
  }
};

Grid.prototype.getTile = function(row, column) {
  if (row >= 0 && column >= 0 && row < this.rows && column < this.columns) {
    return this.data[row][column];
  }
}

Grid.prototype.startTile = function (column) {
  if (this.lastAdd.getTime() + 650 < new Date().getTime()) {
    var tile = this.getTile(0, column);
    if (tile) {
      tile.color = this.game.hud.currentColor;
      tile.lastUpdate = new Date();
    }
    this.lastAdd = new Date();
  }
};

Grid.prototype.update = function() {
  for (var col = 0; col < this.columns; col++) {
      if (this.data[0][col].color != Colors.EMPTY && this.data[0][col].atBottom()) {
        this.game.gameOver();
      }
    }
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.columns; col++) {
      this.data[row][col].update();
    }
  }
}

Grid.prototype.render = function() {
  for (var row = 0; row < this.rows; row++) {
    var tr = this.canvas.children[row];
    for (var col = 0; col < this.columns; col++) {
      tr.children[col] = this.data[row][col].render();
    }
  }
};

Grid.prototype.newTile = function(data) {
  this.startTile(data.column);
};

Grid.prototype.newRow = function() {
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.columns; col++) {
      if (this.data[row][col].atBottom() && row > 0) {
        this.data[row-1][col].color = this.data[row][col].color;
        this.data[row][col].color = Colors.EMPTY;
      }
    }
  }
  for (var col = 0; col < this.columns; col++) {
    this.data[this.rows - 1][col].color = Colors.random();
  }
  this.lastUpdate = new Date();
};