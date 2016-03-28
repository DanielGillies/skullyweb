(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// fetch & render zendesk articles
(function() {

  var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
  };

  // retrieve FAQ's from zendesk API
  var fetchZendeskArticles = function() {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function() {
      var sortedArticles = sortZendeskArticles(JSON.parse(this.responseText));
      renderZendeskArticles(sortedArticles);
    });
    req.open("GET", "https://skully.zendesk.com/api/v2/help_center/articles.json?include=sections&per_page=100");
    req.send();      
  };

  // organize zendesk response data (sort articles and group by section)
  var sortZendeskArticles = function(data) {
    var articles = _.groupBy(data.articles, 'section_id');
    var sections = _.chain(data.sections)
      .sortBy('position')
      .map(function(section) {
        section.articles = _.sortBy(articles[section.id], 'position');
        return section;
      })
      .value();

    return sections;
  };

  // render the complete FAQ content
  var renderZendeskArticles = function(sections) {
    var wrapper = document.getElementById("zendeskArticles");
    var innerHTML = "";

    _.forEach(sections, function(section) {
      innerHTML += renderSection(section);
    });

    wrapper.innerHTML = innerHTML;
  };

  // render an individual section
  var renderSection = function(section) {
    return '<div class="section"><h3><a href="'+section.html_url+'">'+section.name+'</a></h3>'+renderArticles(section.articles)+'</div>';
  };

  // render the list of articles
  var renderArticles = function(articles) {
    var articlesHTML = "";
    _.forEach(articles, function(article) {
      articlesHTML += renderArticle(article);
    });
    return '<ul class="article-list">'+articlesHTML+'</ul>';
  };

  // render an individual article
  var renderArticle = function(article) {
    return '<li><a href="'+article.html_url+'">'+article.title+'</a></li>';
  };

  domReady(fetchZendeskArticles);

})();

require('./lazyload')
},{"./lazyload":2}],2:[function(require,module,exports){
var layzer = require('layzr.js');

layzer.prototype._getOffset = function(node) {
  var n = node;
  if (node.tagName == 'SOURCE') {
    while (n.getBoundingClientRect().top === 0 && n.tagName != 'BODY') {
      n = n.parentNode;
    }
  }
  return n.getBoundingClientRect().top + window.pageYOffset;
}

$(document).ready(function() {
  new(layzer)({
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

},{"layzr.js":3}],3:[function(require,module,exports){
/*!
 * Layzr.js 1.4.2 - A small, fast, modern, and dependency-free library for lazy loading.
 * Copyright (c) 2015 Michael Cavalea - http://callmecavs.github.io/layzr.js/
 * License: MIT
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Layzr = factory();
  }
}(this, function() {
'use strict';

// CONSTRUCTOR

function Layzr(options) {
  // debounce
  this._lastScroll = 0;
  this._ticking    = false;

  // options
  options = options || {};

  this._optionsContainer  = document.querySelector(options.container) || window;
  this._optionsSelector   = options.selector || '[data-layzr]';
  this._optionsAttr       = options.attr || 'data-layzr';
  this._optionsAttrRetina = options.retinaAttr || 'data-layzr-retina';
  this._optionsAttrBg     = options.bgAttr || 'data-layzr-bg';
  this._optionsAttrHidden = options.hiddenAttr || 'data-layzr-hidden';
  this._optionsThreshold  = options.threshold || 0;
  this._optionsCallback   = options.callback || null;

  // properties
  this._retina  = window.devicePixelRatio > 1;
  this._srcAttr = this._retina ? this._optionsAttrRetina : this._optionsAttr;

  // nodelist
  this._nodes = document.querySelectorAll(this._optionsSelector);

  // scroll and resize handler
  this._handlerBind = this._requestScroll.bind(this);

  // call to create
  this._create();
}

// DEBOUNCE HELPERS
// adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

Layzr.prototype._requestScroll = function() {
  if(this._optionsContainer === window) {
    this._lastScroll = window.pageYOffset;
  }
  else {
    this._lastScroll = this._optionsContainer.scrollTop + this._getOffset(this._optionsContainer);
  }

  this._requestTick();
};

Layzr.prototype._requestTick = function() {
  if(!this._ticking) {
    requestAnimationFrame(this.update.bind(this));
    this._ticking = true;
  }
};

// OFFSET HELPER
// remember, getBoundingClientRect is relative to the viewport

Layzr.prototype._getOffset = function(node) {
  return node.getBoundingClientRect().top + window.pageYOffset;
};

// HEIGHT HELPER

Layzr.prototype._getContainerHeight = function() {
  return this._optionsContainer.innerHeight
      || this._optionsContainer.offsetHeight;
}

// LAYZR METHODS

Layzr.prototype._create = function() {
  // fire scroll event once
  this._handlerBind();

  // bind scroll and resize event
  this._optionsContainer.addEventListener('scroll', this._handlerBind, false);
  this._optionsContainer.addEventListener('resize', this._handlerBind, false);
};

Layzr.prototype._destroy = function() {
  // unbind scroll and resize event
  this._optionsContainer.removeEventListener('scroll', this._handlerBind, false);
  this._optionsContainer.removeEventListener('resize', this._handlerBind, false);
};

Layzr.prototype._inViewport = function(node) {
  // get viewport top and bottom offset
  var viewportTop = this._lastScroll;
  var viewportBottom = viewportTop + this._getContainerHeight();

  // get node top and bottom offset
  var nodeTop = this._getOffset(node);
  var nodeBottom = nodeTop + this._getContainerHeight();

  // calculate threshold, convert percentage to pixel value
  var threshold = (this._optionsThreshold / 100) * window.innerHeight;

  // return if node in viewport
  return nodeBottom >= viewportTop - threshold
      && nodeTop <= viewportBottom + threshold
      && !node.hasAttribute(this._optionsAttrHidden);
};

Layzr.prototype._reveal = function(node) {
  // get node source
  var source = node.getAttribute(this._srcAttr) || node.getAttribute(this._optionsAttr);

  // set node src or bg image
  if(node.hasAttribute(this._optionsAttrBg)) {
    node.style.backgroundImage = 'url(' + source + ')';
  }
  else {
    node.setAttribute('src', source);
  }

  // call the callback
  if(typeof this._optionsCallback === 'function') {
    // "this" will be the node in the callback
    this._optionsCallback.call(node);
  }

  // remove node data attributes
  node.removeAttribute(this._optionsAttr);
  node.removeAttribute(this._optionsAttrRetina);
  node.removeAttribute(this._optionsAttrBg);
  node.removeAttribute(this._optionsAttrHidden);
};

Layzr.prototype.updateSelector = function() {
  // update cached list of nodes matching selector
  this._nodes = document.querySelectorAll(this._optionsSelector);
};

Layzr.prototype.update = function() {
  // cache nodelist length
  var nodesLength = this._nodes.length;

  // loop through nodes
  for(var i = 0; i < nodesLength; i++) {
    // cache node
    var node = this._nodes[i];

    // check if node has mandatory attribute
    if(node.hasAttribute(this._optionsAttr)) {
      // check if node in viewport
      if(this._inViewport(node)) {
        // reveal node
        this._reveal(node);
      }
    }
  }

  // allow for more animation frames
  this._ticking = false;
};

return Layzr;
}));

},{}]},{},[1])


//# sourceMappingURL=faq.js.map
