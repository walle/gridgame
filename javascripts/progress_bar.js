function ProgressBar(color) {
  this.progressView = document.getElementById('progress');
  this.progressDiv = this.progressView.children[0];
  this.lastNewRowTime = TimeHandler.now();
  EventHandler.subscribe('newRow', new Subscriber(this, this.reset.bind(this)));
  this.color = color;
}

ProgressBar.prototype.reset = function() {
  this.lastNewRowTime = TimeHandler.now();
};

ProgressBar.prototype.render = function() {
  this.progressDiv.className = this.color;
  var diff = TimeHandler.now() - this.lastNewRowTime;
  this.progressDiv.style.width = (diff / TimeHandler.newRowDelay) * 100 + '%';
};