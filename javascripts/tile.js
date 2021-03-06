function Tile(color) {
  this.color = color;
  this.newTileTime = 0;
  this.createElement();
}

Tile.prototype.createElement = function() {
  this.canvas = document.createElement('td');
  var div = document.createElement('div');
  div.className = this.color;
  this.canvas.appendChild(div)
  EventHandler.clickEvent(this.canvas, this.handleClick.bind(this));
};

Tile.prototype.render = function() {
  this.canvas.children[0].className = this.color;
  return this.canvas;
};

Tile.prototype.handleClick = function(event) {
  var timeInMs = Date.now();
  if (this.newTileTime < timeInMs - 600) {
    EventHandler.notify('newTile', this, { column: this.getColumn() });
    this.newTileTime = timeInMs;
  }
};

Tile.prototype.getColumn = function() {
  return this.canvas.cellIndex;
};

Tile.prototype.getRow = function() {
  return this.canvas.parentNode.sectionRowIndex;
};