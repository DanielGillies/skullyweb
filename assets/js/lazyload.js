new (require('layzr.js'))({
  attr: 'data-src',
  selector: '[data-src]',
  threshold: 25,
  callback: function() {
    $(this).css('opacity', 1)
    return this.classList.add('loaded');
  }
});
