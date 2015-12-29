(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


//# sourceMappingURL=index.js.map
