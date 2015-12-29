var layzer = require('layzr.js');

layzer.prototype._getOffset = function(node){
  var n = node;
  if (node.tagName == 'SOURCE') {
    while (n.getBoundingClientRect().top === 0 && n.tagName != 'BODY') {
      n = n.parentNode;
    }
  }
  return n.getBoundingClientRect().top + window.pageYOffset;
}

$(document).ready(function() {
  new (layzer)({
    attr: 'data-src',
    selector: '[data-src]',
    threshold: 50,
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
})
