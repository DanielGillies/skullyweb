(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./lazyload')

window._wq = window._wq || [];
_wq.push({
  "1nw": function(video) {
    video.bind("end", function() {
      $("#wistia_26_romulus").append("<a target='_blank' href='store' class='ctabutton'>Shop Now</a>");
    })
  }
});

if (window.mobilecheck()) {
  $("#hud").toggle();
  $("#hudmobile").toggle();
  $("#pov").toggle();
  $("#povmobile").toggle();
  $("#explosive").toggle();
  $("#explosivemobile").toggle();
  $("section").removeClass("fullheight");
  $("section").removeClass("fullheight2");
  $("section").addClass("mobilefullheight");
  $("#explosivemobile").removeClass("mobilefullheight");
  $("#beauty").addClass("overlay4");
  $("#beauty").removeClass("bg-white");
  $("#beauty").addClass("bg-black");
  $("#vidholder").addClass("overlay");
  $("#vidholder").addClass("mh600px");
  $("#beautypurchaseimage").attr("src", "static/img/beauty-cta-mobile.jpg");
  $("#beautypurchaseimageholder").css("background", "url('static/img/beauty-cta-mobile.jpg')");
  $("#app").removeClass("bg-black");
  $("#app").addClass("bg-white");
  $("#appbackground").attr("src", "static/img/kyle1bwmobile.jpg");
  $("#appbackgroundholder").css("background", "url('static/img/kyle1bwmobile.jpg')");
}

var hudSwap = 1;

//  var vid = document.getElementById("explosive-vid2")
var hudvid = $("#hudvid")[0];
// hudvid.pause();
// hudvid.currentTime = 1;

var nextButton = $('#explosive-next');
var prevButton = $('#explosive-previous');
var explosiveTop = $('#explosive').offset().top;
var explosiveBot = explosiveTop + $('#explosive-vid').height();
var appTop = $('#app').offset().top;
var appBot = appTop + $('#app').height();
var signupTop = $('#signup').offset().top;
var signupBot = signupTop + $('#signup').height();
var hudTop = $('#hudvid').offset().top;
var povTop = $('#pov').offset().top;
var nextSectionTop = $('#explosive').next('section').offset().top;
var hudPlaying = 0;
var povComplete = 0;
var count = 0;
var inExplosive = false;
var forwards = true;

if (!window.mobilecheck()) {
  $(window).scroll(function() { // assign scroll event listener
    var currentScroll = $(window).scrollTop(); // get current position
    if (currentScroll >= explosiveTop - 55 && currentScroll <= explosiveBot && !inExplosive) {
      inExplosive = true;
      nextExplosion();
    }

    if (currentScroll >= hudTop - 55 && hudPlaying === 0) {
      hudPlaying = 1;
      hudvid.play();
      $("#hudtext").fadeIn(100);
      $("#hudheader").fadeIn(500, function() {
        $(".hudbody").fadeIn(500);
        $("#hudbuttons").fadeIn(500);
      });
      $("#hudvid").on("ended", swapHUD);
    }

    if (currentScroll >= povTop - 55 && currentScroll <= explosiveTop - 55 && povComplete === 0) {
      povComplete = 1;
      TweenLite.set(".hud-animation", {
        perspective: 500
      });
      TweenMax.to("#hud-bg", 1.5, {
        rotationY: 20,
        transformOrigin: "left 50%",
        left: "-=20%",
        opacity: .7,
        ease: Power1.easeInOut
      });
      TweenMax.to("#hud-nose", 1.5, {
        rotationY: 20,
        transformOrigin: "left 50%",
        left: "-=20%",
        opacity: .9,
        ease: Power1.easeInOut
      });
      TweenMax.to("#hud-rear", 1.5, {
        rotationY: 20,
        transformOrigin: "left 50%",
        left: "-=20%",
        ease: Power1.easeInOut
      });
      TweenMax.to("#hud-mph", 1.5, {
        rotationY: 20,
        transformOrigin: "left 50%",
        left: "-=20%",
        ease: Power1.easeInOut
      });

      TweenMax.to("#hud-nose", 1, {
        left: "+=1%",
        delay: 1,
        ease: Power2.easeInOut
      });
      TweenMax.to("#hud-rear", 1.5, {
        scale: 2,
        top: "-=35%",
        left: "-=55%",
        ease: Power2.easeInOut,
        delay: .5
      });
      TweenMax.to("#hud-mph", 1.5, {
        scale: 2.5,
        top: "-=55%",
        left: "-=80%",
        ease: Power2.easeInOut,
        delay: .5
      });
    }
  });
}

function swapHUD() {
  if (!window.mobilecheck()) {
    hudSwap *= -1;
    if (hudSwap < 0) {
      $("#hudvid").find("#hudwebm").attr("src", "http://dg6vcgn2vehm4.cloudfront.net/videos/HUD2.webm")
      $("#hudvid").find("#hudmp4").attr("src", "http://dg6vcgn2vehm4.cloudfront.net/videos/HUD2.mp4")
      $("#hudvid").find("#hudogv").attr("src", "http://dg6vcgn2vehm4.cloudfront.net/videos/HUD2.ogv")
      $("#hudvid").load();
      $("#hudvid")[0].play();
      $("#hudtext").fadeOut(600);
      $("#hudtext2").fadeIn(600);
    } else {
      $("#hudvid").find("#hudwebm").attr("src", "http://dg6vcgn2vehm4.cloudfront.net/videos/HUD1.webm")
      $("#hudvid").find("#hudmp4").attr("src", "http://dg6vcgn2vehm4.cloudfront.net/videos/HUD1.mp4")
      $("#hudvid").find("#hudogv").attr("src", "http://dg6vcgn2vehm4.cloudfront.net/videos/HUD1.ogv")
      $("#hudvid").load();
      $("#hudvid")[0].play();
      $("#hudtext2").fadeOut(600);
      $("#hudtext").fadeIn(600);
    }
  } else {
    hudSwap *= -1;
    if (hudSwap < 0) {
      $("#hudmobile-background").fadeOut(600);
      $("#hudmobile-background2").fadeIn(600);
      $("#hudmobiletext").fadeOut(600);
      $("#hudmobiletext2").fadeIn(600);
      $("#hudmobile-slide1").removeClass("active-hud");
      $("#hudmobile-slide2").addClass("active-hud");
    } else {
      $("#hudmobile-background2").fadeOut(600);
      $("#hudmobile-background").fadeIn(600);
      $("#hudmobiletext2").fadeOut(600);
      $("#hudmobiletext").fadeIn(600);
      $("#hudmobile-slide2").removeClass("active-hud");
      $("#hudmobile-slide1").addClass("active-hud");
    }
  }
}

window.swapHUD = swapHUD

// function nextExplosion() {
//     if (count < 6) {
//         if (count === 5) {
//             nextButton.css('display', 'none');
//         } else if (count >= 3) {
//             prevButton.css('display', 'inline');
//         }
//         console.log("Playing video " + count + ". FORWARDS: " + forwards);
//         if (forwards) {
//             $("#explosive-vid" + (count - 1)).attr("class", "");
//             $("#exp" + (count - 1)).removeClass("active");
//         } else {
//             $("#explosive-vid" + (count) + "b").attr("class", "");
//             $("#exp" + (count-1)).removeClass("active");
//         }
//         $("#explosive-vid" + count).addClass("explosive-active");
//         $("#exp" + (count)).addClass("active");
//         $(".explosive-active")[0].play();
//         // $(".explosive-active")[0].playbackRate = 3;
//         count++;
//         forwards = true;
//     } else {
//     }
// }

// function prevExplosion() {
//     if (count > 0) {
//         if (count === 2) {
//             prevButton.css('display', 'none');
//         } else if (count <= 5) {
//             nextButton.css('display', 'inline');
//         }
//         console.log("Playing video " + count + ". FORWARDS: " + forwards);
//         if (forwards) {
//             $("#explosive-vid" + (count)).attr("class", "");
//             $("#exp" + (count)).removeClass("active");
//         } else {
//             $("#explosive-vid" + (count+1) + "b").attr("class", "");
//             $("#exp" + (count)).removeClass("active");
//         }
//         $("#explosive-vid" + (count-1) + "b").addClass("explosive-active");
//         $("#exp" + (count-1)).addClass("active");
//         $(".explosive-active")[0].play();
//         // $(".explosive-active")[0].playbackRate = 3;
//         count--;
//         forwards = false
//     } else {
//     }
// }

function nextExplosion() {
  console.log(count);
  inExplosive = true;
  if (count > 0) {
    if ($(".explosive-active").length != 0) {
      var exp = $(".explosive-active")[0]
      exp.pause();
      setTimeout( function(){
       exp.currentTime = 0;
      }, 3000)
    }
    if (forwards) {
      $("#explosive-vid" + (count)).removeClass("explosive-active");
      count++;
    } else {
      $("#explosive-vid" + count + "b").removeClass("explosive-active");
    }
  } else {
    count++;
  }
  $("#explosive-vid" + count).addClass("explosive-active");
  $(".explosive-active")[0].play();
  if (count === 5) {
    nextButton.css('display', 'none');
  } else if (count >= 1) {
    prevButton.css('display', 'inline');
  }
  forwards = true;
}

window.nextExplosion = nextExplosion

function prevExplosion() {
  if (count < 6) {
    var exp = $(".explosive-active")[0]
    exp.pause();
    setTimeout( function(){
     exp.currentTime = 0;
    }, 3000)
    if (forwards) {
      $("#explosive-vid" + (count)).removeClass("explosive-active");
    } else {
      $("#explosive-vid" + (count) + "b").removeClass("explosive-active");
      count--;
    }
  }
  $("#explosive-vid" + count + "b").addClass("explosive-active");
  $(".explosive-active")[0].play();
  if (count === 1) {
    prevButton.css('display', 'none');
  } else if (count <= 5) {
    nextButton.css('display', 'inline');
  }
  forwards = false;
}

window.prevExplosion = prevExplosion

function goToExplosion(i) {
  // console.log(count-i);
  // if (count-i == 1) {
  //     $("#explosive-vid" + (count) + "b").attr("class", "");
  //     $("#exp" + (count)).removeClass("active");
  //     count = i;
  //     console.log("PREV")
  //     prevExplosion();
  // }
  // if (count-i == -1) {
  //     count++;
  //     nextExplosion();
  // } else {
  var exp = $(".explosive-active")[0]
  exp.pause();
  setTimeout( function(){
   exp.currentTime = 0;
  }, 3000)
  $("#explosive-vid" + (count)).attr("class", "");
  $("#exp" + (count)).removeClass("active");
  count = i;
  console.log(count)
  nextExplosion();
  // }
}

window.goToExplosion = goToExplosion

// HOVER SOUND
var audio = $("#hoversound")[0];
$("#hovertext").mouseenter(function() {
  audio.play();
});

// SCATMAN!!! (Bottom right)
var audio2 = $("#scatman")[0];
$(".scatbutton").click(function() {

  audio2.currentTime = 6;
  audio2.volume = .3;
  audio2.play();
  // setTimeout(function() {audio.pause();}, 7150);
  setTimeout(function() {
    audio2.pause();
  }, 7950);
  alert("ITS SCATMAN TIME!!!!");

});

$(function() {
  $("#hudmobile").swipe({
    //Generic swipe handler for all directions
    swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log("You swiped " + direction);
      swapHUD();
    },
    swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log("You swiped " + direction);
      swapHUD();
    },
    allowPageScroll: 'vertical',
    preventDefaultEvents: false
  });
});

function hover(element) {
  element.setAttribute("src", element.getAttribute("src").replace("-black", "-red"));
}

function unhover(element) {
  element.setAttribute("src", element.getAttribute("src").replace("-red", "-black"));
}

},{"./lazyload":2}],2:[function(require,module,exports){
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

new (layzer)({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvaW5kZXguanMiLCJhc3NldHMvanMvbGF6eWxvYWQuanMiLCJub2RlX21vZHVsZXMvbGF5enIuanMvZGlzdC9sYXl6ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vbGF6eWxvYWQnKVxuXG53aW5kb3cuX3dxID0gd2luZG93Ll93cSB8fCBbXTtcbl93cS5wdXNoKHtcbiAgXCIxbndcIjogZnVuY3Rpb24odmlkZW8pIHtcbiAgICB2aWRlby5iaW5kKFwiZW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgJChcIiN3aXN0aWFfMjZfcm9tdWx1c1wiKS5hcHBlbmQoXCI8YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0nc3RvcmUnIGNsYXNzPSdjdGFidXR0b24nPlNob3AgTm93PC9hPlwiKTtcbiAgICB9KVxuICB9XG59KTtcblxuaWYgKHdpbmRvdy5tb2JpbGVjaGVjaygpKSB7XG4gICQoXCIjaHVkXCIpLnRvZ2dsZSgpO1xuICAkKFwiI2h1ZG1vYmlsZVwiKS50b2dnbGUoKTtcbiAgJChcIiNwb3ZcIikudG9nZ2xlKCk7XG4gICQoXCIjcG92bW9iaWxlXCIpLnRvZ2dsZSgpO1xuICAkKFwiI2V4cGxvc2l2ZVwiKS50b2dnbGUoKTtcbiAgJChcIiNleHBsb3NpdmVtb2JpbGVcIikudG9nZ2xlKCk7XG4gICQoXCJzZWN0aW9uXCIpLnJlbW92ZUNsYXNzKFwiZnVsbGhlaWdodFwiKTtcbiAgJChcInNlY3Rpb25cIikucmVtb3ZlQ2xhc3MoXCJmdWxsaGVpZ2h0MlwiKTtcbiAgJChcInNlY3Rpb25cIikuYWRkQ2xhc3MoXCJtb2JpbGVmdWxsaGVpZ2h0XCIpO1xuICAkKFwiI2V4cGxvc2l2ZW1vYmlsZVwiKS5yZW1vdmVDbGFzcyhcIm1vYmlsZWZ1bGxoZWlnaHRcIik7XG4gICQoXCIjYmVhdXR5XCIpLmFkZENsYXNzKFwib3ZlcmxheTRcIik7XG4gICQoXCIjYmVhdXR5XCIpLnJlbW92ZUNsYXNzKFwiYmctd2hpdGVcIik7XG4gICQoXCIjYmVhdXR5XCIpLmFkZENsYXNzKFwiYmctYmxhY2tcIik7XG4gICQoXCIjdmlkaG9sZGVyXCIpLmFkZENsYXNzKFwib3ZlcmxheVwiKTtcbiAgJChcIiN2aWRob2xkZXJcIikuYWRkQ2xhc3MoXCJtaDYwMHB4XCIpO1xuICAkKFwiI2JlYXV0eXB1cmNoYXNlaW1hZ2VcIikuYXR0cihcInNyY1wiLCBcInN0YXRpYy9pbWcvYmVhdXR5LWN0YS1tb2JpbGUuanBnXCIpO1xuICAkKFwiI2JlYXV0eXB1cmNoYXNlaW1hZ2Vob2xkZXJcIikuY3NzKFwiYmFja2dyb3VuZFwiLCBcInVybCgnc3RhdGljL2ltZy9iZWF1dHktY3RhLW1vYmlsZS5qcGcnKVwiKTtcbiAgJChcIiNhcHBcIikucmVtb3ZlQ2xhc3MoXCJiZy1ibGFja1wiKTtcbiAgJChcIiNhcHBcIikuYWRkQ2xhc3MoXCJiZy13aGl0ZVwiKTtcbiAgJChcIiNhcHBiYWNrZ3JvdW5kXCIpLmF0dHIoXCJzcmNcIiwgXCJzdGF0aWMvaW1nL2t5bGUxYndtb2JpbGUuanBnXCIpO1xuICAkKFwiI2FwcGJhY2tncm91bmRob2xkZXJcIikuY3NzKFwiYmFja2dyb3VuZFwiLCBcInVybCgnc3RhdGljL2ltZy9reWxlMWJ3bW9iaWxlLmpwZycpXCIpO1xufVxuXG52YXIgaHVkU3dhcCA9IDE7XG5cbi8vICB2YXIgdmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBsb3NpdmUtdmlkMlwiKVxudmFyIGh1ZHZpZCA9ICQoXCIjaHVkdmlkXCIpWzBdO1xuLy8gaHVkdmlkLnBhdXNlKCk7XG4vLyBodWR2aWQuY3VycmVudFRpbWUgPSAxO1xuXG52YXIgbmV4dEJ1dHRvbiA9ICQoJyNleHBsb3NpdmUtbmV4dCcpO1xudmFyIHByZXZCdXR0b24gPSAkKCcjZXhwbG9zaXZlLXByZXZpb3VzJyk7XG52YXIgZXhwbG9zaXZlVG9wID0gJCgnI2V4cGxvc2l2ZScpLm9mZnNldCgpLnRvcDtcbnZhciBleHBsb3NpdmVCb3QgPSBleHBsb3NpdmVUb3AgKyAkKCcjZXhwbG9zaXZlLXZpZCcpLmhlaWdodCgpO1xudmFyIGFwcFRvcCA9ICQoJyNhcHAnKS5vZmZzZXQoKS50b3A7XG52YXIgYXBwQm90ID0gYXBwVG9wICsgJCgnI2FwcCcpLmhlaWdodCgpO1xudmFyIHNpZ251cFRvcCA9ICQoJyNzaWdudXAnKS5vZmZzZXQoKS50b3A7XG52YXIgc2lnbnVwQm90ID0gc2lnbnVwVG9wICsgJCgnI3NpZ251cCcpLmhlaWdodCgpO1xudmFyIGh1ZFRvcCA9ICQoJyNodWR2aWQnKS5vZmZzZXQoKS50b3A7XG52YXIgcG92VG9wID0gJCgnI3BvdicpLm9mZnNldCgpLnRvcDtcbnZhciBuZXh0U2VjdGlvblRvcCA9ICQoJyNleHBsb3NpdmUnKS5uZXh0KCdzZWN0aW9uJykub2Zmc2V0KCkudG9wO1xudmFyIGh1ZFBsYXlpbmcgPSAwO1xudmFyIHBvdkNvbXBsZXRlID0gMDtcbnZhciBjb3VudCA9IDA7XG52YXIgaW5FeHBsb3NpdmUgPSBmYWxzZTtcbnZhciBmb3J3YXJkcyA9IHRydWU7XG5cbmlmICghd2luZG93Lm1vYmlsZWNoZWNrKCkpIHtcbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHsgLy8gYXNzaWduIHNjcm9sbCBldmVudCBsaXN0ZW5lclxuICAgIHZhciBjdXJyZW50U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgY3VycmVudCBwb3NpdGlvblxuICAgIGlmIChjdXJyZW50U2Nyb2xsID49IGV4cGxvc2l2ZVRvcCAtIDU1ICYmIGN1cnJlbnRTY3JvbGwgPD0gZXhwbG9zaXZlQm90ICYmICFpbkV4cGxvc2l2ZSkge1xuICAgICAgaW5FeHBsb3NpdmUgPSB0cnVlO1xuICAgICAgbmV4dEV4cGxvc2lvbigpO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50U2Nyb2xsID49IGh1ZFRvcCAtIDU1ICYmIGh1ZFBsYXlpbmcgPT09IDApIHtcbiAgICAgIGh1ZFBsYXlpbmcgPSAxO1xuICAgICAgaHVkdmlkLnBsYXkoKTtcbiAgICAgICQoXCIjaHVkdGV4dFwiKS5mYWRlSW4oMTAwKTtcbiAgICAgICQoXCIjaHVkaGVhZGVyXCIpLmZhZGVJbig1MDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiLmh1ZGJvZHlcIikuZmFkZUluKDUwMCk7XG4gICAgICAgICQoXCIjaHVkYnV0dG9uc1wiKS5mYWRlSW4oNTAwKTtcbiAgICAgIH0pO1xuICAgICAgJChcIiNodWR2aWRcIikub24oXCJlbmRlZFwiLCBzd2FwSFVEKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudFNjcm9sbCA+PSBwb3ZUb3AgLSA1NSAmJiBjdXJyZW50U2Nyb2xsIDw9IGV4cGxvc2l2ZVRvcCAtIDU1ICYmIHBvdkNvbXBsZXRlID09PSAwKSB7XG4gICAgICBwb3ZDb21wbGV0ZSA9IDE7XG4gICAgICBUd2VlbkxpdGUuc2V0KFwiLmh1ZC1hbmltYXRpb25cIiwge1xuICAgICAgICBwZXJzcGVjdGl2ZTogNTAwXG4gICAgICB9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKFwiI2h1ZC1iZ1wiLCAxLjUsIHtcbiAgICAgICAgcm90YXRpb25ZOiAyMCxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImxlZnQgNTAlXCIsXG4gICAgICAgIGxlZnQ6IFwiLT0yMCVcIixcbiAgICAgICAgb3BhY2l0eTogLjcsXG4gICAgICAgIGVhc2U6IFBvd2VyMS5lYXNlSW5PdXRcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oXCIjaHVkLW5vc2VcIiwgMS41LCB7XG4gICAgICAgIHJvdGF0aW9uWTogMjAsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCJsZWZ0IDUwJVwiLFxuICAgICAgICBsZWZ0OiBcIi09MjAlXCIsXG4gICAgICAgIG9wYWNpdHk6IC45LFxuICAgICAgICBlYXNlOiBQb3dlcjEuZWFzZUluT3V0XG4gICAgICB9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKFwiI2h1ZC1yZWFyXCIsIDEuNSwge1xuICAgICAgICByb3RhdGlvblk6IDIwLFxuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwibGVmdCA1MCVcIixcbiAgICAgICAgbGVmdDogXCItPTIwJVwiLFxuICAgICAgICBlYXNlOiBQb3dlcjEuZWFzZUluT3V0XG4gICAgICB9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKFwiI2h1ZC1tcGhcIiwgMS41LCB7XG4gICAgICAgIHJvdGF0aW9uWTogMjAsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCJsZWZ0IDUwJVwiLFxuICAgICAgICBsZWZ0OiBcIi09MjAlXCIsXG4gICAgICAgIGVhc2U6IFBvd2VyMS5lYXNlSW5PdXRcbiAgICAgIH0pO1xuXG4gICAgICBUd2Vlbk1heC50byhcIiNodWQtbm9zZVwiLCAxLCB7XG4gICAgICAgIGxlZnQ6IFwiKz0xJVwiLFxuICAgICAgICBkZWxheTogMSxcbiAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VJbk91dFxuICAgICAgfSk7XG4gICAgICBUd2Vlbk1heC50byhcIiNodWQtcmVhclwiLCAxLjUsIHtcbiAgICAgICAgc2NhbGU6IDIsXG4gICAgICAgIHRvcDogXCItPTM1JVwiLFxuICAgICAgICBsZWZ0OiBcIi09NTUlXCIsXG4gICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlSW5PdXQsXG4gICAgICAgIGRlbGF5OiAuNVxuICAgICAgfSk7XG4gICAgICBUd2Vlbk1heC50byhcIiNodWQtbXBoXCIsIDEuNSwge1xuICAgICAgICBzY2FsZTogMi41LFxuICAgICAgICB0b3A6IFwiLT01NSVcIixcbiAgICAgICAgbGVmdDogXCItPTgwJVwiLFxuICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZUluT3V0LFxuICAgICAgICBkZWxheTogLjVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN3YXBIVUQoKSB7XG4gIGlmICghd2luZG93Lm1vYmlsZWNoZWNrKCkpIHtcbiAgICBodWRTd2FwICo9IC0xO1xuICAgIGlmIChodWRTd2FwIDwgMCkge1xuICAgICAgJChcIiNodWR2aWRcIikuZmluZChcIiNodWR3ZWJtXCIpLmF0dHIoXCJzcmNcIiwgXCJodHRwOi8vZGc2dmNnbjJ2ZWhtNC5jbG91ZGZyb250Lm5ldC92aWRlb3MvSFVEMi53ZWJtXCIpXG4gICAgICAkKFwiI2h1ZHZpZFwiKS5maW5kKFwiI2h1ZG1wNFwiKS5hdHRyKFwic3JjXCIsIFwiaHR0cDovL2RnNnZjZ24ydmVobTQuY2xvdWRmcm9udC5uZXQvdmlkZW9zL0hVRDIubXA0XCIpXG4gICAgICAkKFwiI2h1ZHZpZFwiKS5maW5kKFwiI2h1ZG9ndlwiKS5hdHRyKFwic3JjXCIsIFwiaHR0cDovL2RnNnZjZ24ydmVobTQuY2xvdWRmcm9udC5uZXQvdmlkZW9zL0hVRDIub2d2XCIpXG4gICAgICAkKFwiI2h1ZHZpZFwiKS5sb2FkKCk7XG4gICAgICAkKFwiI2h1ZHZpZFwiKVswXS5wbGF5KCk7XG4gICAgICAkKFwiI2h1ZHRleHRcIikuZmFkZU91dCg2MDApO1xuICAgICAgJChcIiNodWR0ZXh0MlwiKS5mYWRlSW4oNjAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNodWR2aWRcIikuZmluZChcIiNodWR3ZWJtXCIpLmF0dHIoXCJzcmNcIiwgXCJodHRwOi8vZGc2dmNnbjJ2ZWhtNC5jbG91ZGZyb250Lm5ldC92aWRlb3MvSFVEMS53ZWJtXCIpXG4gICAgICAkKFwiI2h1ZHZpZFwiKS5maW5kKFwiI2h1ZG1wNFwiKS5hdHRyKFwic3JjXCIsIFwiaHR0cDovL2RnNnZjZ24ydmVobTQuY2xvdWRmcm9udC5uZXQvdmlkZW9zL0hVRDEubXA0XCIpXG4gICAgICAkKFwiI2h1ZHZpZFwiKS5maW5kKFwiI2h1ZG9ndlwiKS5hdHRyKFwic3JjXCIsIFwiaHR0cDovL2RnNnZjZ24ydmVobTQuY2xvdWRmcm9udC5uZXQvdmlkZW9zL0hVRDEub2d2XCIpXG4gICAgICAkKFwiI2h1ZHZpZFwiKS5sb2FkKCk7XG4gICAgICAkKFwiI2h1ZHZpZFwiKVswXS5wbGF5KCk7XG4gICAgICAkKFwiI2h1ZHRleHQyXCIpLmZhZGVPdXQoNjAwKTtcbiAgICAgICQoXCIjaHVkdGV4dFwiKS5mYWRlSW4oNjAwKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaHVkU3dhcCAqPSAtMTtcbiAgICBpZiAoaHVkU3dhcCA8IDApIHtcbiAgICAgICQoXCIjaHVkbW9iaWxlLWJhY2tncm91bmRcIikuZmFkZU91dCg2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGUtYmFja2dyb3VuZDJcIikuZmFkZUluKDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZXRleHRcIikuZmFkZU91dCg2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGV0ZXh0MlwiKS5mYWRlSW4oNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxlLXNsaWRlMVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS1odWRcIik7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1zbGlkZTJcIikuYWRkQ2xhc3MoXCJhY3RpdmUtaHVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1iYWNrZ3JvdW5kMlwiKS5mYWRlT3V0KDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1iYWNrZ3JvdW5kXCIpLmZhZGVJbig2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGV0ZXh0MlwiKS5mYWRlT3V0KDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZXRleHRcIikuZmFkZUluKDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1zbGlkZTJcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtaHVkXCIpO1xuICAgICAgJChcIiNodWRtb2JpbGUtc2xpZGUxXCIpLmFkZENsYXNzKFwiYWN0aXZlLWh1ZFwiKTtcbiAgICB9XG4gIH1cbn1cblxud2luZG93LnN3YXBIVUQgPSBzd2FwSFVEXG5cbi8vIGZ1bmN0aW9uIG5leHRFeHBsb3Npb24oKSB7XG4vLyAgICAgaWYgKGNvdW50IDwgNikge1xuLy8gICAgICAgICBpZiAoY291bnQgPT09IDUpIHtcbi8vICAgICAgICAgICAgIG5leHRCdXR0b24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA+PSAzKSB7XG4vLyAgICAgICAgICAgICBwcmV2QnV0dG9uLmNzcygnZGlzcGxheScsICdpbmxpbmUnKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXlpbmcgdmlkZW8gXCIgKyBjb3VudCArIFwiLiBGT1JXQVJEUzogXCIgKyBmb3J3YXJkcyk7XG4vLyAgICAgICAgIGlmIChmb3J3YXJkcykge1xuLy8gICAgICAgICAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQgLSAxKSkuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuLy8gICAgICAgICAgICAgJChcIiNleHBcIiArIChjb3VudCAtIDEpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KSArIFwiYlwiKS5hdHRyKFwiY2xhc3NcIiwgXCJcIik7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cFwiICsgKGNvdW50LTEpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIGNvdW50KS5hZGRDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4vLyAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQpKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXkoKTtcbi8vICAgICAgICAgLy8gJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXliYWNrUmF0ZSA9IDM7XG4vLyAgICAgICAgIGNvdW50Kys7XG4vLyAgICAgICAgIGZvcndhcmRzID0gdHJ1ZTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gcHJldkV4cGxvc2lvbigpIHtcbi8vICAgICBpZiAoY291bnQgPiAwKSB7XG4vLyAgICAgICAgIGlmIChjb3VudCA9PT0gMikge1xuLy8gICAgICAgICAgICAgcHJldkJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGNvdW50IDw9IDUpIHtcbi8vICAgICAgICAgICAgIG5leHRCdXR0b24uY3NzKCdkaXNwbGF5JywgJ2lubGluZScpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWluZyB2aWRlbyBcIiArIGNvdW50ICsgXCIuIEZPUldBUkRTOiBcIiArIGZvcndhcmRzKTtcbi8vICAgICAgICAgaWYgKGZvcndhcmRzKSB7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkpLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbi8vICAgICAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KzEpICsgXCJiXCIpLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbi8vICAgICAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudC0xKSArIFwiYlwiKS5hZGRDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4vLyAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQtMSkpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuLy8gICAgICAgICAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0ucGxheSgpO1xuLy8gICAgICAgICAvLyAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0ucGxheWJhY2tSYXRlID0gMztcbi8vICAgICAgICAgY291bnQtLTtcbi8vICAgICAgICAgZm9yd2FyZHMgPSBmYWxzZVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgfVxuLy8gfVxuXG5mdW5jdGlvbiBuZXh0RXhwbG9zaW9uKCkge1xuICBjb25zb2xlLmxvZyhjb3VudCk7XG4gIGluRXhwbG9zaXZlID0gdHJ1ZTtcbiAgaWYgKGNvdW50ID4gMCkge1xuICAgIGlmICgkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIikubGVuZ3RoICE9IDApIHtcbiAgICAgIHZhciBleHAgPSAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF1cbiAgICAgIGV4cC5wYXVzZSgpO1xuICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICBleHAuY3VycmVudFRpbWUgPSAwO1xuICAgICAgfSwgMzAwMClcbiAgICB9XG4gICAgaWYgKGZvcndhcmRzKSB7XG4gICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkpLnJlbW92ZUNsYXNzKFwiZXhwbG9zaXZlLWFjdGl2ZVwiKTtcbiAgICAgIGNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgY291bnQgKyBcImJcIikucmVtb3ZlQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb3VudCsrO1xuICB9XG4gICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgY291bnQpLmFkZENsYXNzKFwiZXhwbG9zaXZlLWFjdGl2ZVwiKTtcbiAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXkoKTtcbiAgaWYgKGNvdW50ID09PSA1KSB7XG4gICAgbmV4dEJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICB9IGVsc2UgaWYgKGNvdW50ID49IDEpIHtcbiAgICBwcmV2QnV0dG9uLmNzcygnZGlzcGxheScsICdpbmxpbmUnKTtcbiAgfVxuICBmb3J3YXJkcyA9IHRydWU7XG59XG5cbndpbmRvdy5uZXh0RXhwbG9zaW9uID0gbmV4dEV4cGxvc2lvblxuXG5mdW5jdGlvbiBwcmV2RXhwbG9zaW9uKCkge1xuICBpZiAoY291bnQgPCA2KSB7XG4gICAgdmFyIGV4cCA9ICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXVxuICAgIGV4cC5wYXVzZSgpO1xuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgIGV4cC5jdXJyZW50VGltZSA9IDA7XG4gICAgfSwgMzAwMClcbiAgICBpZiAoZm9yd2FyZHMpIHtcbiAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KSkucmVtb3ZlQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkgKyBcImJcIikucmVtb3ZlQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuICAgICAgY291bnQtLTtcbiAgICB9XG4gIH1cbiAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyBjb3VudCArIFwiYlwiKS5hZGRDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4gICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5wbGF5KCk7XG4gIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHByZXZCdXR0b24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgfSBlbHNlIGlmIChjb3VudCA8PSA1KSB7XG4gICAgbmV4dEJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lJyk7XG4gIH1cbiAgZm9yd2FyZHMgPSBmYWxzZTtcbn1cblxud2luZG93LnByZXZFeHBsb3Npb24gPSBwcmV2RXhwbG9zaW9uXG5cbmZ1bmN0aW9uIGdvVG9FeHBsb3Npb24oaSkge1xuICAvLyBjb25zb2xlLmxvZyhjb3VudC1pKTtcbiAgLy8gaWYgKGNvdW50LWkgPT0gMSkge1xuICAvLyAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQpICsgXCJiXCIpLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbiAgLy8gICAgICQoXCIjZXhwXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgLy8gICAgIGNvdW50ID0gaTtcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiUFJFVlwiKVxuICAvLyAgICAgcHJldkV4cGxvc2lvbigpO1xuICAvLyB9XG4gIC8vIGlmIChjb3VudC1pID09IC0xKSB7XG4gIC8vICAgICBjb3VudCsrO1xuICAvLyAgICAgbmV4dEV4cGxvc2lvbigpO1xuICAvLyB9IGVsc2Uge1xuICB2YXIgZXhwID0gJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdXG4gIGV4cC5wYXVzZSgpO1xuICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgZXhwLmN1cnJlbnRUaW1lID0gMDtcbiAgfSwgMzAwMClcbiAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQpKS5hdHRyKFwiY2xhc3NcIiwgXCJcIik7XG4gICQoXCIjZXhwXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgY291bnQgPSBpO1xuICBjb25zb2xlLmxvZyhjb3VudClcbiAgbmV4dEV4cGxvc2lvbigpO1xuICAvLyB9XG59XG5cbndpbmRvdy5nb1RvRXhwbG9zaW9uID0gZ29Ub0V4cGxvc2lvblxuXG4vLyBIT1ZFUiBTT1VORFxudmFyIGF1ZGlvID0gJChcIiNob3ZlcnNvdW5kXCIpWzBdO1xuJChcIiNob3ZlcnRleHRcIikubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgYXVkaW8ucGxheSgpO1xufSk7XG5cbi8vIFNDQVRNQU4hISEgKEJvdHRvbSByaWdodClcbnZhciBhdWRpbzIgPSAkKFwiI3NjYXRtYW5cIilbMF07XG4kKFwiLnNjYXRidXR0b25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG5cbiAgYXVkaW8yLmN1cnJlbnRUaW1lID0gNjtcbiAgYXVkaW8yLnZvbHVtZSA9IC4zO1xuICBhdWRpbzIucGxheSgpO1xuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge2F1ZGlvLnBhdXNlKCk7fSwgNzE1MCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgYXVkaW8yLnBhdXNlKCk7XG4gIH0sIDc5NTApO1xuICBhbGVydChcIklUUyBTQ0FUTUFOIFRJTUUhISEhXCIpO1xuXG59KTtcblxuJChmdW5jdGlvbigpIHtcbiAgJChcIiNodWRtb2JpbGVcIikuc3dpcGUoe1xuICAgIC8vR2VuZXJpYyBzd2lwZSBoYW5kbGVyIGZvciBhbGwgZGlyZWN0aW9uc1xuICAgIHN3aXBlUmlnaHQ6IGZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24sIGRpc3RhbmNlLCBkdXJhdGlvbiwgZmluZ2VyQ291bnQsIGZpbmdlckRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91IHN3aXBlZCBcIiArIGRpcmVjdGlvbik7XG4gICAgICBzd2FwSFVEKCk7XG4gICAgfSxcbiAgICBzd2lwZUxlZnQ6IGZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24sIGRpc3RhbmNlLCBkdXJhdGlvbiwgZmluZ2VyQ291bnQsIGZpbmdlckRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91IHN3aXBlZCBcIiArIGRpcmVjdGlvbik7XG4gICAgICBzd2FwSFVEKCk7XG4gICAgfSxcbiAgICBhbGxvd1BhZ2VTY3JvbGw6ICd2ZXJ0aWNhbCcsXG4gICAgcHJldmVudERlZmF1bHRFdmVudHM6IGZhbHNlXG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGhvdmVyKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIikucmVwbGFjZShcIi1ibGFja1wiLCBcIi1yZWRcIikpO1xufVxuXG5mdW5jdGlvbiB1bmhvdmVyKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIikucmVwbGFjZShcIi1yZWRcIiwgXCItYmxhY2tcIikpO1xufVxuIiwidmFyIGxheXplciA9IHJlcXVpcmUoJ2xheXpyLmpzJyk7XG5cbmxheXplci5wcm90b3R5cGUuX2dldE9mZnNldCA9IGZ1bmN0aW9uKG5vZGUpe1xuICB2YXIgbiA9IG5vZGU7XG4gIGlmIChub2RlLnRhZ05hbWUgPT0gJ1NPVVJDRScpIHtcbiAgICB3aGlsZSAobi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPT09IDAgJiYgbi50YWdOYW1lICE9ICdCT0RZJykge1xuICAgICAgbiA9IG4ucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xufVxuXG5uZXcgKGxheXplcikoe1xuICBhdHRyOiAnZGF0YS1zcmMnLFxuICBzZWxlY3RvcjogJ1tkYXRhLXNyY10nLFxuICB0aHJlc2hvbGQ6IDI1LFxuICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgdmFyICRlbCA9ICQodGhpcyk7XG5cbiAgICBpZiAoJGVsLnByb3AoJ3RhZ05hbWUnKSA9PSAnU09VUkNFJykge1xuICAgICAgdmFyIHYgPSAkZWwuY2xvc2VzdCgndmlkZW8nKVswXVxuICAgICAgaWYgKHYpIHtcbiAgICAgICAgdi5sb2FkKCk7XG4gICAgICAgIHYucGxheSgpO1xuICAgICAgfVxuICAgICAgJCh2KS5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGVsLmNzcygnb3BhY2l0eScsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICB9XG59KTtcbiIsIi8qIVxuICogTGF5enIuanMgMS40LjIgLSBBIHNtYWxsLCBmYXN0LCBtb2Rlcm4sIGFuZCBkZXBlbmRlbmN5LWZyZWUgbGlicmFyeSBmb3IgbGF6eSBsb2FkaW5nLlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE1pY2hhZWwgQ2F2YWxlYSAtIGh0dHA6Ly9jYWxsbWVjYXZzLmdpdGh1Yi5pby9sYXl6ci5qcy9cbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuTGF5enIgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIENPTlNUUlVDVE9SXG5cbmZ1bmN0aW9uIExheXpyKG9wdGlvbnMpIHtcbiAgLy8gZGVib3VuY2VcbiAgdGhpcy5fbGFzdFNjcm9sbCA9IDA7XG4gIHRoaXMuX3RpY2tpbmcgICAgPSBmYWxzZTtcblxuICAvLyBvcHRpb25zXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMuX29wdGlvbnNDb250YWluZXIgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmNvbnRhaW5lcikgfHwgd2luZG93O1xuICB0aGlzLl9vcHRpb25zU2VsZWN0b3IgICA9IG9wdGlvbnMuc2VsZWN0b3IgfHwgJ1tkYXRhLWxheXpyXSc7XG4gIHRoaXMuX29wdGlvbnNBdHRyICAgICAgID0gb3B0aW9ucy5hdHRyIHx8ICdkYXRhLWxheXpyJztcbiAgdGhpcy5fb3B0aW9uc0F0dHJSZXRpbmEgPSBvcHRpb25zLnJldGluYUF0dHIgfHwgJ2RhdGEtbGF5enItcmV0aW5hJztcbiAgdGhpcy5fb3B0aW9uc0F0dHJCZyAgICAgPSBvcHRpb25zLmJnQXR0ciB8fCAnZGF0YS1sYXl6ci1iZyc7XG4gIHRoaXMuX29wdGlvbnNBdHRySGlkZGVuID0gb3B0aW9ucy5oaWRkZW5BdHRyIHx8ICdkYXRhLWxheXpyLWhpZGRlbic7XG4gIHRoaXMuX29wdGlvbnNUaHJlc2hvbGQgID0gb3B0aW9ucy50aHJlc2hvbGQgfHwgMDtcbiAgdGhpcy5fb3B0aW9uc0NhbGxiYWNrICAgPSBvcHRpb25zLmNhbGxiYWNrIHx8IG51bGw7XG5cbiAgLy8gcHJvcGVydGllc1xuICB0aGlzLl9yZXRpbmEgID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxO1xuICB0aGlzLl9zcmNBdHRyID0gdGhpcy5fcmV0aW5hID8gdGhpcy5fb3B0aW9uc0F0dHJSZXRpbmEgOiB0aGlzLl9vcHRpb25zQXR0cjtcblxuICAvLyBub2RlbGlzdFxuICB0aGlzLl9ub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fb3B0aW9uc1NlbGVjdG9yKTtcblxuICAvLyBzY3JvbGwgYW5kIHJlc2l6ZSBoYW5kbGVyXG4gIHRoaXMuX2hhbmRsZXJCaW5kID0gdGhpcy5fcmVxdWVzdFNjcm9sbC5iaW5kKHRoaXMpO1xuXG4gIC8vIGNhbGwgdG8gY3JlYXRlXG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG4vLyBERUJPVU5DRSBIRUxQRVJTXG4vLyBhZGFwdGVkIGZyb206IGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL3NwZWVkL2FuaW1hdGlvbnMvXG5cbkxheXpyLnByb3RvdHlwZS5fcmVxdWVzdFNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICBpZih0aGlzLl9vcHRpb25zQ29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICB0aGlzLl9sYXN0U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuX2xhc3RTY3JvbGwgPSB0aGlzLl9vcHRpb25zQ29udGFpbmVyLnNjcm9sbFRvcCArIHRoaXMuX2dldE9mZnNldCh0aGlzLl9vcHRpb25zQ29udGFpbmVyKTtcbiAgfVxuXG4gIHRoaXMuX3JlcXVlc3RUaWNrKCk7XG59O1xuXG5MYXl6ci5wcm90b3R5cGUuX3JlcXVlc3RUaWNrID0gZnVuY3Rpb24oKSB7XG4gIGlmKCF0aGlzLl90aWNraW5nKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3RpY2tpbmcgPSB0cnVlO1xuICB9XG59O1xuXG4vLyBPRkZTRVQgSEVMUEVSXG4vLyByZW1lbWJlciwgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydFxuXG5MYXl6ci5wcm90b3R5cGUuX2dldE9mZnNldCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xufTtcblxuLy8gSEVJR0hUIEhFTFBFUlxuXG5MYXl6ci5wcm90b3R5cGUuX2dldENvbnRhaW5lckhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fb3B0aW9uc0NvbnRhaW5lci5pbm5lckhlaWdodFxuICAgICAgfHwgdGhpcy5fb3B0aW9uc0NvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG59XG5cbi8vIExBWVpSIE1FVEhPRFNcblxuTGF5enIucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZmlyZSBzY3JvbGwgZXZlbnQgb25jZVxuICB0aGlzLl9oYW5kbGVyQmluZCgpO1xuXG4gIC8vIGJpbmQgc2Nyb2xsIGFuZCByZXNpemUgZXZlbnRcbiAgdGhpcy5fb3B0aW9uc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVyQmluZCwgZmFsc2UpO1xuICB0aGlzLl9vcHRpb25zQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZXJCaW5kLCBmYWxzZSk7XG59O1xuXG5MYXl6ci5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgLy8gdW5iaW5kIHNjcm9sbCBhbmQgcmVzaXplIGV2ZW50XG4gIHRoaXMuX29wdGlvbnNDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5faGFuZGxlckJpbmQsIGZhbHNlKTtcbiAgdGhpcy5fb3B0aW9uc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9oYW5kbGVyQmluZCwgZmFsc2UpO1xufTtcblxuTGF5enIucHJvdG90eXBlLl9pblZpZXdwb3J0ID0gZnVuY3Rpb24obm9kZSkge1xuICAvLyBnZXQgdmlld3BvcnQgdG9wIGFuZCBib3R0b20gb2Zmc2V0XG4gIHZhciB2aWV3cG9ydFRvcCA9IHRoaXMuX2xhc3RTY3JvbGw7XG4gIHZhciB2aWV3cG9ydEJvdHRvbSA9IHZpZXdwb3J0VG9wICsgdGhpcy5fZ2V0Q29udGFpbmVySGVpZ2h0KCk7XG5cbiAgLy8gZ2V0IG5vZGUgdG9wIGFuZCBib3R0b20gb2Zmc2V0XG4gIHZhciBub2RlVG9wID0gdGhpcy5fZ2V0T2Zmc2V0KG5vZGUpO1xuICB2YXIgbm9kZUJvdHRvbSA9IG5vZGVUb3AgKyB0aGlzLl9nZXRDb250YWluZXJIZWlnaHQoKTtcblxuICAvLyBjYWxjdWxhdGUgdGhyZXNob2xkLCBjb252ZXJ0IHBlcmNlbnRhZ2UgdG8gcGl4ZWwgdmFsdWVcbiAgdmFyIHRocmVzaG9sZCA9ICh0aGlzLl9vcHRpb25zVGhyZXNob2xkIC8gMTAwKSAqIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAvLyByZXR1cm4gaWYgbm9kZSBpbiB2aWV3cG9ydFxuICByZXR1cm4gbm9kZUJvdHRvbSA+PSB2aWV3cG9ydFRvcCAtIHRocmVzaG9sZFxuICAgICAgJiYgbm9kZVRvcCA8PSB2aWV3cG9ydEJvdHRvbSArIHRocmVzaG9sZFxuICAgICAgJiYgIW5vZGUuaGFzQXR0cmlidXRlKHRoaXMuX29wdGlvbnNBdHRySGlkZGVuKTtcbn07XG5cbkxheXpyLnByb3RvdHlwZS5fcmV2ZWFsID0gZnVuY3Rpb24obm9kZSkge1xuICAvLyBnZXQgbm9kZSBzb3VyY2VcbiAgdmFyIHNvdXJjZSA9IG5vZGUuZ2V0QXR0cmlidXRlKHRoaXMuX3NyY0F0dHIpIHx8IG5vZGUuZ2V0QXR0cmlidXRlKHRoaXMuX29wdGlvbnNBdHRyKTtcblxuICAvLyBzZXQgbm9kZSBzcmMgb3IgYmcgaW1hZ2VcbiAgaWYobm9kZS5oYXNBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHJCZykpIHtcbiAgICBub2RlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHNvdXJjZSArICcpJztcbiAgfVxuICBlbHNlIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnc3JjJywgc291cmNlKTtcbiAgfVxuXG4gIC8vIGNhbGwgdGhlIGNhbGxiYWNrXG4gIGlmKHR5cGVvZiB0aGlzLl9vcHRpb25zQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBcInRoaXNcIiB3aWxsIGJlIHRoZSBub2RlIGluIHRoZSBjYWxsYmFja1xuICAgIHRoaXMuX29wdGlvbnNDYWxsYmFjay5jYWxsKG5vZGUpO1xuICB9XG5cbiAgLy8gcmVtb3ZlIG5vZGUgZGF0YSBhdHRyaWJ1dGVzXG4gIG5vZGUucmVtb3ZlQXR0cmlidXRlKHRoaXMuX29wdGlvbnNBdHRyKTtcbiAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHJSZXRpbmEpO1xuICBub2RlLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0ckJnKTtcbiAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHJIaWRkZW4pO1xufTtcblxuTGF5enIucHJvdG90eXBlLnVwZGF0ZVNlbGVjdG9yID0gZnVuY3Rpb24oKSB7XG4gIC8vIHVwZGF0ZSBjYWNoZWQgbGlzdCBvZiBub2RlcyBtYXRjaGluZyBzZWxlY3RvclxuICB0aGlzLl9ub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fb3B0aW9uc1NlbGVjdG9yKTtcbn07XG5cbkxheXpyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2FjaGUgbm9kZWxpc3QgbGVuZ3RoXG4gIHZhciBub2Rlc0xlbmd0aCA9IHRoaXMuX25vZGVzLmxlbmd0aDtcblxuICAvLyBsb29wIHRocm91Z2ggbm9kZXNcbiAgZm9yKHZhciBpID0gMDsgaSA8IG5vZGVzTGVuZ3RoOyBpKyspIHtcbiAgICAvLyBjYWNoZSBub2RlXG4gICAgdmFyIG5vZGUgPSB0aGlzLl9ub2Rlc1tpXTtcblxuICAgIC8vIGNoZWNrIGlmIG5vZGUgaGFzIG1hbmRhdG9yeSBhdHRyaWJ1dGVcbiAgICBpZihub2RlLmhhc0F0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0cikpIHtcbiAgICAgIC8vIGNoZWNrIGlmIG5vZGUgaW4gdmlld3BvcnRcbiAgICAgIGlmKHRoaXMuX2luVmlld3BvcnQobm9kZSkpIHtcbiAgICAgICAgLy8gcmV2ZWFsIG5vZGVcbiAgICAgICAgdGhpcy5fcmV2ZWFsKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGFsbG93IGZvciBtb3JlIGFuaW1hdGlvbiBmcmFtZXNcbiAgdGhpcy5fdGlja2luZyA9IGZhbHNlO1xufTtcblxucmV0dXJuIExheXpyO1xufSkpO1xuIl19
