var Colors = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
  YELLOW: 'yellow',
  PURPLE: 'purple',
  PINK: 'pink',
  BLACK: 'black',
  EMPTY: '',
  random: function() {
    var colors = [Colors.RED, Colors.GREEN, Colors.BLUE, Colors.YELLOW, Colors.PURPLE, Colors.PINK, Colors.BLACK];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};