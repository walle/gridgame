var Utils = {
  attachEvent: function(element, fn) {
    if (!document.touchstart) {
      element.addEventListener('click', fn);
    } else {
      element.addEventListener('touchstart', fn);
    }
  }
};

var game = new Game();
game.start();