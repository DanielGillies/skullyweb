new (require('layzr.js'))({
  attr: 'data-src',
  selector: '[data-src]',
  threshold: 25,
  callback: function() {
    var $el = $(this);

    if ($el.prop('tagName') == 'SOURCE') {
      var v = $el.closest('video')[0]
      if (v) {
        v.load();
        v.play();
      }
      $(v).css('opacity', 1);
    } else {
      $el.css('opacity', 1);
    }

    return this.classList.add('loaded');
  }
});
