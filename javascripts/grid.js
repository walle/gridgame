function Grid(color) {
  this.nextTileColor = color;
  this.rows = 12;
  this.columns = 8;
  this.canvas = document.getElementById('grid');
  this.data = [];
  this.setup();
  EventHandler.subscribe('newTile', new Subscriber(this, this.newTile.bind(this)));
  EventHandler.subscribe('newRow', new Subscriber(this, this.newRow.bind(this)));
  EventHandler.subscribe('moveTiles', new Subscriber(this, this.moveTiles.bind(this)));
}

Grid.prototype.setup = function() {
  for (var row = 0; row < this.rows; row++) {
    this.data[row] = [];
    var tr = document.createElement('tr');
    for (var col = 0; col < this.columns; col++) {
      this.data[row][col] = new Tile(Colors.EMPTY);
      tr.appendChild(this.data[row][col].render());
    }
    this.canvas.appendChild(tr);
  }
  this.newRow();
};

Grid.prototype.getTile = function(row, column) {
  if (row >= 0 && column >= 0 && row < this.rows && column < this.columns) {
    return this.data[row][column];
  }
}

Grid.prototype.startTile = function (column) {
  var tile = this.getTile(0, column);
  if (tile) {
    tile.color = this.nextTileColor;
  }
};

Grid.prototype.update = function() {
  this.checkForGameOver();
  this.checkForConnections();
}

Grid.prototype.render = function() {
  for (var row = 0; row < this.rows; row++) {
    var tr = this.canvas.children[row];
    for (var col = 0; col < this.columns; col++) {
      tr.children[col] = this.data[row][col].render();
    }
  }
};

Grid.prototype.checkForGameOver = function() {
  for (var col = 0; col < this.columns; col++) {
    if (this.data[0][col].color != Colors.EMPTY && this.data[1][col].color != Colors.EMPTY) {
      EventHandler.notify('gameOver', this);
    }
  }
};

Grid.prototype.checkForConnections = function() {
  var tilesToCheck = [];
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.columns; col++) {
      var below = this.getTile(row+1, col);
      if (this.data[row][col].color != Colors.EMPTY && below && below.color != Colors.EMPTY) {
        tilesToCheck.push(this.data[row][col]);
      }
    }
  }
  var tilesToDelete = [];
  for(var i = 0; i < tilesToCheck.length; i++) {
    var tile = tilesToCheck[i];
    var adjecent = this.getAdjecent(tile);
    var count =  0;
    for(var j = 0; j < adjecent.length; j++) {
      if (adjecent[j].color == tile.color) {
        count++;
      }
    }

    if (count >= 2) {
      for(var j = 0; j < adjecent.length; j++) {
        if (adjecent[j].color == tile.color) {
          tilesToDelete.push(adjecent[j]);
        }
      }
      tilesToDelete.push(tile);
    }
  }

  if (tilesToDelete.length > 0) {
    for(var i = 0; i < tilesToDelete.length; i++) {
      var tile = tilesToDelete[i];
      this.data[tile.getRow()][tile.getColumn()].color = Colors.EMPTY;
    }

    console.dir(tilesToDelete);

    EventHandler.notify('scoreUpdate', this, {score: 250 * tilesToDelete.length });
  }
};

Grid.prototype.getAdjecent = function(tile) {
  var adjecent = [];
  var above = this.getTile(tile.getRow()-1, tile.getColumn());
  var below = this.getTile(tile.getRow()+1, tile.getColumn());
  var left = this.getTile(tile.getRow(), tile.getColumn()-1);
  var right = this.getTile(tile.getRow(), tile.getColumn()+1);
  if (above) {
    adjecent.push(above);
  }
  if (below) {
    adjecent.push(below);
  }
  if (left) {
    adjecent.push(left);
  }
  if (right) {
    adjecent.push(right);
  }
  return adjecent;
};

Grid.prototype.newTile = function(invoker, data) {
  this.startTile(data.column);
};

Grid.prototype.newRow = function() {
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.columns; col++) {
      if (row > 0) {
        var below = this.getTile(row+1, col);
        if (row == this.rows - 1 || below && below.color != Colors.EMPTY) {
          this.data[row-1][col].color = this.data[row][col].color;
          this.data[row][col].color = Colors.EMPTY;
        }
      }
    }
  }
  for (var col = 0; col < this.columns; col++) {
    this.data[this.rows - 1][col].color = Colors.random();
  }
};

Grid.prototype.moveTiles = function() {
  var tilesToMove = [];
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.columns; col++) {
      var below = this.getTile(row+1, col);
      if (this.data[row][col].color != Colors.EMPTY && below && below.color == Colors.EMPTY) {
        tilesToMove.push(this.data[row][col]);
      }
    }
  }
  for(var i = 0; i < tilesToMove.length; i++) {
    var tile = tilesToMove[i];
    var row = tile.getRow();
    var col = tile.getColumn();
    var below = this.getTile(row+1, col);
    if (below) {
      below.color = this.data[row][col].color;
      this.data[row][col].color = Colors.EMPTY;
    }
  }
};