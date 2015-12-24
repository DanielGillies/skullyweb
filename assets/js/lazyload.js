new (require('layzr.js'))({
  attr: 'data-src',
  selector: '[data-src]',
  threshold: 25,
  callback: function() {
    return this.classList.add('loaded');
  }
});
