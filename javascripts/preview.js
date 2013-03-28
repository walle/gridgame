function Preview(color) {
  this.color = color;
  this.nextTile = document.getElementById('next');
  this.nextTile.className = 'tile ' + this.currentColor;
}

Preview.prototype.render = function() {
  this.nextTile.className = 'tile ' + this.color;
};