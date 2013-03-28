function Tile(grid, row, column, color) {
  this.grid = grid;
  this.row = row;
  this.column = column;
  this.color = color;
  this.td = document.createElement('td');
  this.div = document.createElement('div');
  this.div.className = this.color;
  this.td.appendChild(this.div)
  EventHandler.clickEvent(this.td, this.handleClick.bind(this));
  EventHandler.subscribe('moveTile', new Subscriber(this, this.moveTile.bind(this)));
}

Tile.prototype.render = function() {
  this.td.children[0].className = this.color;
  return this.td;
};

Tile.prototype.handleClick = function(event) {
  EventHandler.notify('newTile', this, {column: this.column});
};

Tile.prototype.update = function() {
  // Make pathfinding for this so the player can string together adjecent to adjecent also
  if (this.atBottom()) {
    var adjecents = this.getAdjecent();
    counter = 0;
    for(var i = 0; i < adjecents.length; i++) {
      if (adjecents[i]) {
        if (adjecents[i].color == this.color) {
          counter++;
        }
      }
    }
    if (counter > 2) {
      for(var i = 0; i < adjecents.length; i++) {
        if (adjecents[i]) {
          if (adjecents[i].color == this.color) {
            adjecents[i].color = Colors.EMPTY;
          }
        }
      }
      this.color = Colors.EMPTY;
    }
  }
};

Tile.prototype.tileBelow = function() {
  return this.grid.getTile(this.row + 1, this.column);
};

Tile.prototype.tileBelowEmpty = function() {
  var tileBelow = this.tileBelow();
  return (tileBelow && tileBelow.color == Colors.EMPTY)
};

Tile.prototype.atBottom = function() {
  if (this.row == this.grid.rows - 1) {
    return true;
  }
  var tileBelow = this.tileBelow();
  return (tileBelow && tileBelow.color != Colors.EMPTY)
};

Tile.prototype.getAdjecent = function() {
  return [this.grid.getTile(this.row - 1, this.column), this.grid.getTile(this.row + 1, this.column),
          this.grid.getTile(this.row, this.column - 1), this.grid.getTile(this.row, this.column + 1),
          this.grid.getTile(this.row - 1, this.column - 1), this.grid.getTile(this.row - 1, this.column + 1),
          this.grid.getTile(this.row + 1, this.column - 1), this.grid.getTile(this.row + 1, this.column, + 1)];
}

Tile.prototype.moveTile = function() {
  if (this.tileBelowEmpty()) {
      var tileBelow = this.tileBelow();
      tileBelow.color = this.color;
      this.color = Colors.EMPTY;
    }
};