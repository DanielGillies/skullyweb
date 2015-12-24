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
      $(".explosive-active")[0].pause();
      $(".explosive-active")[0].currentTime = 0;
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

function prevExplosion() {
  if (count < 6) {
    $(".explosive-active")[0].pause();
    $(".explosive-active")[0].currentTime = 0;
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
  $(".explosive-active")[0].pause();
  $(".explosive-active")[0].currentTime = 0;
  $("#explosive-vid" + (count)).attr("class", "");
  $("#exp" + (count)).removeClass("active");
  count = i;
  console.log(count)
  nextExplosion();
  // }
}

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
new (require('layzr.js'))({
  attr: 'data-src',
  selector: '[data-src]',
  threshold: 25,
  callback: function() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvaW5kZXguanMiLCJhc3NldHMvanMvbGF6eWxvYWQuanMiLCJub2RlX21vZHVsZXMvbGF5enIuanMvZGlzdC9sYXl6ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9sYXp5bG9hZCcpXG5cbndpbmRvdy5fd3EgPSB3aW5kb3cuX3dxIHx8IFtdO1xuX3dxLnB1c2goe1xuICBcIjFud1wiOiBmdW5jdGlvbih2aWRlbykge1xuICAgIHZpZGVvLmJpbmQoXCJlbmRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiI3dpc3RpYV8yNl9yb211bHVzXCIpLmFwcGVuZChcIjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdzdG9yZScgY2xhc3M9J2N0YWJ1dHRvbic+U2hvcCBOb3c8L2E+XCIpO1xuICAgIH0pXG4gIH1cbn0pO1xuXG5pZiAod2luZG93Lm1vYmlsZWNoZWNrKCkpIHtcbiAgJChcIiNodWRcIikudG9nZ2xlKCk7XG4gICQoXCIjaHVkbW9iaWxlXCIpLnRvZ2dsZSgpO1xuICAkKFwiI3BvdlwiKS50b2dnbGUoKTtcbiAgJChcIiNwb3Ztb2JpbGVcIikudG9nZ2xlKCk7XG4gICQoXCIjZXhwbG9zaXZlXCIpLnRvZ2dsZSgpO1xuICAkKFwiI2V4cGxvc2l2ZW1vYmlsZVwiKS50b2dnbGUoKTtcbiAgJChcInNlY3Rpb25cIikucmVtb3ZlQ2xhc3MoXCJmdWxsaGVpZ2h0XCIpO1xuICAkKFwic2VjdGlvblwiKS5yZW1vdmVDbGFzcyhcImZ1bGxoZWlnaHQyXCIpO1xuICAkKFwic2VjdGlvblwiKS5hZGRDbGFzcyhcIm1vYmlsZWZ1bGxoZWlnaHRcIik7XG4gICQoXCIjZXhwbG9zaXZlbW9iaWxlXCIpLnJlbW92ZUNsYXNzKFwibW9iaWxlZnVsbGhlaWdodFwiKTtcbiAgJChcIiNiZWF1dHlcIikuYWRkQ2xhc3MoXCJvdmVybGF5NFwiKTtcbiAgJChcIiNiZWF1dHlcIikucmVtb3ZlQ2xhc3MoXCJiZy13aGl0ZVwiKTtcbiAgJChcIiNiZWF1dHlcIikuYWRkQ2xhc3MoXCJiZy1ibGFja1wiKTtcbiAgJChcIiN2aWRob2xkZXJcIikuYWRkQ2xhc3MoXCJvdmVybGF5XCIpO1xuICAkKFwiI3ZpZGhvbGRlclwiKS5hZGRDbGFzcyhcIm1oNjAwcHhcIik7XG4gICQoXCIjYmVhdXR5cHVyY2hhc2VpbWFnZVwiKS5hdHRyKFwic3JjXCIsIFwic3RhdGljL2ltZy9iZWF1dHktY3RhLW1vYmlsZS5qcGdcIik7XG4gICQoXCIjYmVhdXR5cHVyY2hhc2VpbWFnZWhvbGRlclwiKS5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwidXJsKCdzdGF0aWMvaW1nL2JlYXV0eS1jdGEtbW9iaWxlLmpwZycpXCIpO1xuICAkKFwiI2FwcFwiKS5yZW1vdmVDbGFzcyhcImJnLWJsYWNrXCIpO1xuICAkKFwiI2FwcFwiKS5hZGRDbGFzcyhcImJnLXdoaXRlXCIpO1xuICAkKFwiI2FwcGJhY2tncm91bmRcIikuYXR0cihcInNyY1wiLCBcInN0YXRpYy9pbWcva3lsZTFid21vYmlsZS5qcGdcIik7XG4gICQoXCIjYXBwYmFja2dyb3VuZGhvbGRlclwiKS5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwidXJsKCdzdGF0aWMvaW1nL2t5bGUxYndtb2JpbGUuanBnJylcIik7XG59XG5cbnZhciBodWRTd2FwID0gMTtcblxuLy8gIHZhciB2aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGxvc2l2ZS12aWQyXCIpXG52YXIgaHVkdmlkID0gJChcIiNodWR2aWRcIilbMF07XG4vLyBodWR2aWQucGF1c2UoKTtcbi8vIGh1ZHZpZC5jdXJyZW50VGltZSA9IDE7XG5cbnZhciBuZXh0QnV0dG9uID0gJCgnI2V4cGxvc2l2ZS1uZXh0Jyk7XG52YXIgcHJldkJ1dHRvbiA9ICQoJyNleHBsb3NpdmUtcHJldmlvdXMnKTtcbnZhciBleHBsb3NpdmVUb3AgPSAkKCcjZXhwbG9zaXZlJykub2Zmc2V0KCkudG9wO1xudmFyIGV4cGxvc2l2ZUJvdCA9IGV4cGxvc2l2ZVRvcCArICQoJyNleHBsb3NpdmUtdmlkJykuaGVpZ2h0KCk7XG52YXIgYXBwVG9wID0gJCgnI2FwcCcpLm9mZnNldCgpLnRvcDtcbnZhciBhcHBCb3QgPSBhcHBUb3AgKyAkKCcjYXBwJykuaGVpZ2h0KCk7XG52YXIgc2lnbnVwVG9wID0gJCgnI3NpZ251cCcpLm9mZnNldCgpLnRvcDtcbnZhciBzaWdudXBCb3QgPSBzaWdudXBUb3AgKyAkKCcjc2lnbnVwJykuaGVpZ2h0KCk7XG52YXIgaHVkVG9wID0gJCgnI2h1ZHZpZCcpLm9mZnNldCgpLnRvcDtcbnZhciBwb3ZUb3AgPSAkKCcjcG92Jykub2Zmc2V0KCkudG9wO1xudmFyIG5leHRTZWN0aW9uVG9wID0gJCgnI2V4cGxvc2l2ZScpLm5leHQoJ3NlY3Rpb24nKS5vZmZzZXQoKS50b3A7XG52YXIgaHVkUGxheWluZyA9IDA7XG52YXIgcG92Q29tcGxldGUgPSAwO1xudmFyIGNvdW50ID0gMDtcbnZhciBpbkV4cGxvc2l2ZSA9IGZhbHNlO1xudmFyIGZvcndhcmRzID0gdHJ1ZTtcblxuaWYgKCF3aW5kb3cubW9iaWxlY2hlY2soKSkge1xuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkgeyAvLyBhc3NpZ24gc2Nyb2xsIGV2ZW50IGxpc3RlbmVyXG4gICAgdmFyIGN1cnJlbnRTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7IC8vIGdldCBjdXJyZW50IHBvc2l0aW9uXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPj0gZXhwbG9zaXZlVG9wIC0gNTUgJiYgY3VycmVudFNjcm9sbCA8PSBleHBsb3NpdmVCb3QgJiYgIWluRXhwbG9zaXZlKSB7XG4gICAgICBpbkV4cGxvc2l2ZSA9IHRydWU7XG4gICAgICBuZXh0RXhwbG9zaW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPj0gaHVkVG9wIC0gNTUgJiYgaHVkUGxheWluZyA9PT0gMCkge1xuICAgICAgaHVkUGxheWluZyA9IDE7XG4gICAgICBodWR2aWQucGxheSgpO1xuICAgICAgJChcIiNodWR0ZXh0XCIpLmZhZGVJbigxMDApO1xuICAgICAgJChcIiNodWRoZWFkZXJcIikuZmFkZUluKDUwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCIuaHVkYm9keVwiKS5mYWRlSW4oNTAwKTtcbiAgICAgICAgJChcIiNodWRidXR0b25zXCIpLmZhZGVJbig1MDApO1xuICAgICAgfSk7XG4gICAgICAkKFwiI2h1ZHZpZFwiKS5vbihcImVuZGVkXCIsIHN3YXBIVUQpO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50U2Nyb2xsID49IHBvdlRvcCAtIDU1ICYmIGN1cnJlbnRTY3JvbGwgPD0gZXhwbG9zaXZlVG9wIC0gNTUgJiYgcG92Q29tcGxldGUgPT09IDApIHtcbiAgICAgIHBvdkNvbXBsZXRlID0gMTtcbiAgICAgIFR3ZWVuTGl0ZS5zZXQoXCIuaHVkLWFuaW1hdGlvblwiLCB7XG4gICAgICAgIHBlcnNwZWN0aXZlOiA1MDBcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oXCIjaHVkLWJnXCIsIDEuNSwge1xuICAgICAgICByb3RhdGlvblk6IDIwLFxuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwibGVmdCA1MCVcIixcbiAgICAgICAgbGVmdDogXCItPTIwJVwiLFxuICAgICAgICBvcGFjaXR5OiAuNyxcbiAgICAgICAgZWFzZTogUG93ZXIxLmVhc2VJbk91dFxuICAgICAgfSk7XG4gICAgICBUd2Vlbk1heC50byhcIiNodWQtbm9zZVwiLCAxLjUsIHtcbiAgICAgICAgcm90YXRpb25ZOiAyMCxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImxlZnQgNTAlXCIsXG4gICAgICAgIGxlZnQ6IFwiLT0yMCVcIixcbiAgICAgICAgb3BhY2l0eTogLjksXG4gICAgICAgIGVhc2U6IFBvd2VyMS5lYXNlSW5PdXRcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oXCIjaHVkLXJlYXJcIiwgMS41LCB7XG4gICAgICAgIHJvdGF0aW9uWTogMjAsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCJsZWZ0IDUwJVwiLFxuICAgICAgICBsZWZ0OiBcIi09MjAlXCIsXG4gICAgICAgIGVhc2U6IFBvd2VyMS5lYXNlSW5PdXRcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oXCIjaHVkLW1waFwiLCAxLjUsIHtcbiAgICAgICAgcm90YXRpb25ZOiAyMCxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImxlZnQgNTAlXCIsXG4gICAgICAgIGxlZnQ6IFwiLT0yMCVcIixcbiAgICAgICAgZWFzZTogUG93ZXIxLmVhc2VJbk91dFxuICAgICAgfSk7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKFwiI2h1ZC1ub3NlXCIsIDEsIHtcbiAgICAgICAgbGVmdDogXCIrPTElXCIsXG4gICAgICAgIGRlbGF5OiAxLFxuICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZUluT3V0XG4gICAgICB9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKFwiI2h1ZC1yZWFyXCIsIDEuNSwge1xuICAgICAgICBzY2FsZTogMixcbiAgICAgICAgdG9wOiBcIi09MzUlXCIsXG4gICAgICAgIGxlZnQ6IFwiLT01NSVcIixcbiAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VJbk91dCxcbiAgICAgICAgZGVsYXk6IC41XG4gICAgICB9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKFwiI2h1ZC1tcGhcIiwgMS41LCB7XG4gICAgICAgIHNjYWxlOiAyLjUsXG4gICAgICAgIHRvcDogXCItPTU1JVwiLFxuICAgICAgICBsZWZ0OiBcIi09ODAlXCIsXG4gICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlSW5PdXQsXG4gICAgICAgIGRlbGF5OiAuNVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc3dhcEhVRCgpIHtcbiAgaWYgKCF3aW5kb3cubW9iaWxlY2hlY2soKSkge1xuICAgIGh1ZFN3YXAgKj0gLTE7XG4gICAgaWYgKGh1ZFN3YXAgPCAwKSB7XG4gICAgICAkKFwiI2h1ZHZpZFwiKS5maW5kKFwiI2h1ZHdlYm1cIikuYXR0cihcInNyY1wiLCBcImh0dHA6Ly9kZzZ2Y2duMnZlaG00LmNsb3VkZnJvbnQubmV0L3ZpZGVvcy9IVUQyLndlYm1cIilcbiAgICAgICQoXCIjaHVkdmlkXCIpLmZpbmQoXCIjaHVkbXA0XCIpLmF0dHIoXCJzcmNcIiwgXCJodHRwOi8vZGc2dmNnbjJ2ZWhtNC5jbG91ZGZyb250Lm5ldC92aWRlb3MvSFVEMi5tcDRcIilcbiAgICAgICQoXCIjaHVkdmlkXCIpLmZpbmQoXCIjaHVkb2d2XCIpLmF0dHIoXCJzcmNcIiwgXCJodHRwOi8vZGc2dmNnbjJ2ZWhtNC5jbG91ZGZyb250Lm5ldC92aWRlb3MvSFVEMi5vZ3ZcIilcbiAgICAgICQoXCIjaHVkdmlkXCIpLmxvYWQoKTtcbiAgICAgICQoXCIjaHVkdmlkXCIpWzBdLnBsYXkoKTtcbiAgICAgICQoXCIjaHVkdGV4dFwiKS5mYWRlT3V0KDYwMCk7XG4gICAgICAkKFwiI2h1ZHRleHQyXCIpLmZhZGVJbig2MDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI2h1ZHZpZFwiKS5maW5kKFwiI2h1ZHdlYm1cIikuYXR0cihcInNyY1wiLCBcImh0dHA6Ly9kZzZ2Y2duMnZlaG00LmNsb3VkZnJvbnQubmV0L3ZpZGVvcy9IVUQxLndlYm1cIilcbiAgICAgICQoXCIjaHVkdmlkXCIpLmZpbmQoXCIjaHVkbXA0XCIpLmF0dHIoXCJzcmNcIiwgXCJodHRwOi8vZGc2dmNnbjJ2ZWhtNC5jbG91ZGZyb250Lm5ldC92aWRlb3MvSFVEMS5tcDRcIilcbiAgICAgICQoXCIjaHVkdmlkXCIpLmZpbmQoXCIjaHVkb2d2XCIpLmF0dHIoXCJzcmNcIiwgXCJodHRwOi8vZGc2dmNnbjJ2ZWhtNC5jbG91ZGZyb250Lm5ldC92aWRlb3MvSFVEMS5vZ3ZcIilcbiAgICAgICQoXCIjaHVkdmlkXCIpLmxvYWQoKTtcbiAgICAgICQoXCIjaHVkdmlkXCIpWzBdLnBsYXkoKTtcbiAgICAgICQoXCIjaHVkdGV4dDJcIikuZmFkZU91dCg2MDApO1xuICAgICAgJChcIiNodWR0ZXh0XCIpLmZhZGVJbig2MDApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBodWRTd2FwICo9IC0xO1xuICAgIGlmIChodWRTd2FwIDwgMCkge1xuICAgICAgJChcIiNodWRtb2JpbGUtYmFja2dyb3VuZFwiKS5mYWRlT3V0KDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1iYWNrZ3JvdW5kMlwiKS5mYWRlSW4oNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxldGV4dFwiKS5mYWRlT3V0KDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZXRleHQyXCIpLmZhZGVJbig2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGUtc2xpZGUxXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLWh1ZFwiKTtcbiAgICAgICQoXCIjaHVkbW9iaWxlLXNsaWRlMlwiKS5hZGRDbGFzcyhcImFjdGl2ZS1odWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjaHVkbW9iaWxlLWJhY2tncm91bmQyXCIpLmZhZGVPdXQoNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxlLWJhY2tncm91bmRcIikuZmFkZUluKDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZXRleHQyXCIpLmZhZGVPdXQoNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxldGV4dFwiKS5mYWRlSW4oNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxlLXNsaWRlMlwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS1odWRcIik7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1zbGlkZTFcIikuYWRkQ2xhc3MoXCJhY3RpdmUtaHVkXCIpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBmdW5jdGlvbiBuZXh0RXhwbG9zaW9uKCkge1xuLy8gICAgIGlmIChjb3VudCA8IDYpIHtcbi8vICAgICAgICAgaWYgKGNvdW50ID09PSA1KSB7XG4vLyAgICAgICAgICAgICBuZXh0QnV0dG9uLmNzcygnZGlzcGxheScsICdub25lJyk7XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPj0gMykge1xuLy8gICAgICAgICAgICAgcHJldkJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lJyk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5aW5nIHZpZGVvIFwiICsgY291bnQgKyBcIi4gRk9SV0FSRFM6IFwiICsgZm9yd2FyZHMpO1xuLy8gICAgICAgICBpZiAoZm9yd2FyZHMpIHtcbi8vICAgICAgICAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50IC0gMSkpLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbi8vICAgICAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQgLSAxKSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkgKyBcImJcIikuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuLy8gICAgICAgICAgICAgJChcIiNleHBcIiArIChjb3VudC0xKSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyBjb3VudCkuYWRkQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuLy8gICAgICAgICAkKFwiI2V4cFwiICsgKGNvdW50KSkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4vLyAgICAgICAgICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5wbGF5KCk7XG4vLyAgICAgICAgIC8vICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5wbGF5YmFja1JhdGUgPSAzO1xuLy8gICAgICAgICBjb3VudCsrO1xuLy8gICAgICAgICBmb3J3YXJkcyA9IHRydWU7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHByZXZFeHBsb3Npb24oKSB7XG4vLyAgICAgaWYgKGNvdW50ID4gMCkge1xuLy8gICAgICAgICBpZiAoY291bnQgPT09IDIpIHtcbi8vICAgICAgICAgICAgIHByZXZCdXR0b24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA8PSA1KSB7XG4vLyAgICAgICAgICAgICBuZXh0QnV0dG9uLmNzcygnZGlzcGxheScsICdpbmxpbmUnKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXlpbmcgdmlkZW8gXCIgKyBjb3VudCArIFwiLiBGT1JXQVJEUzogXCIgKyBmb3J3YXJkcyk7XG4vLyAgICAgICAgIGlmIChmb3J3YXJkcykge1xuLy8gICAgICAgICAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQpKS5hdHRyKFwiY2xhc3NcIiwgXCJcIik7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cFwiICsgKGNvdW50KSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCsxKSArIFwiYlwiKS5hdHRyKFwiY2xhc3NcIiwgXCJcIik7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cFwiICsgKGNvdW50KSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQtMSkgKyBcImJcIikuYWRkQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuLy8gICAgICAgICAkKFwiI2V4cFwiICsgKGNvdW50LTEpKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXkoKTtcbi8vICAgICAgICAgLy8gJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXliYWNrUmF0ZSA9IDM7XG4vLyAgICAgICAgIGNvdW50LS07XG4vLyAgICAgICAgIGZvcndhcmRzID0gZmFsc2Vcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgIH1cbi8vIH1cblxuZnVuY3Rpb24gbmV4dEV4cGxvc2lvbigpIHtcbiAgY29uc29sZS5sb2coY291bnQpO1xuICBpbkV4cGxvc2l2ZSA9IHRydWU7XG4gIGlmIChjb3VudCA+IDApIHtcbiAgICBpZiAoJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpLmxlbmd0aCAhPSAwKSB7XG4gICAgICAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0ucGF1c2UoKTtcbiAgICAgICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxuICAgIGlmIChmb3J3YXJkcykge1xuICAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4gICAgICBjb3VudCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIGNvdW50ICsgXCJiXCIpLnJlbW92ZUNsYXNzKFwiZXhwbG9zaXZlLWFjdGl2ZVwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY291bnQrKztcbiAgfVxuICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIGNvdW50KS5hZGRDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4gICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5wbGF5KCk7XG4gIGlmIChjb3VudCA9PT0gNSkge1xuICAgIG5leHRCdXR0b24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgfSBlbHNlIGlmIChjb3VudCA+PSAxKSB7XG4gICAgcHJldkJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lJyk7XG4gIH1cbiAgZm9yd2FyZHMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBwcmV2RXhwbG9zaW9uKCkge1xuICBpZiAoY291bnQgPCA2KSB7XG4gICAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBhdXNlKCk7XG4gICAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLmN1cnJlbnRUaW1lID0gMDtcbiAgICBpZiAoZm9yd2FyZHMpIHtcbiAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KSkucmVtb3ZlQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkgKyBcImJcIikucmVtb3ZlQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuICAgICAgY291bnQtLTtcbiAgICB9XG4gIH1cbiAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyBjb3VudCArIFwiYlwiKS5hZGRDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4gICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5wbGF5KCk7XG4gIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHByZXZCdXR0b24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgfSBlbHNlIGlmIChjb3VudCA8PSA1KSB7XG4gICAgbmV4dEJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lJyk7XG4gIH1cbiAgZm9yd2FyZHMgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ29Ub0V4cGxvc2lvbihpKSB7XG4gIC8vIGNvbnNvbGUubG9nKGNvdW50LWkpO1xuICAvLyBpZiAoY291bnQtaSA9PSAxKSB7XG4gIC8vICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkgKyBcImJcIikuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuICAvLyAgICAgJChcIiNleHBcIiArIChjb3VudCkpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAvLyAgICAgY291bnQgPSBpO1xuICAvLyAgICAgY29uc29sZS5sb2coXCJQUkVWXCIpXG4gIC8vICAgICBwcmV2RXhwbG9zaW9uKCk7XG4gIC8vIH1cbiAgLy8gaWYgKGNvdW50LWkgPT0gLTEpIHtcbiAgLy8gICAgIGNvdW50Kys7XG4gIC8vICAgICBuZXh0RXhwbG9zaW9uKCk7XG4gIC8vIH0gZWxzZSB7XG4gICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5wYXVzZSgpO1xuICAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0uY3VycmVudFRpbWUgPSAwO1xuICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkpLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbiAgJChcIiNleHBcIiArIChjb3VudCkpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICBjb3VudCA9IGk7XG4gIGNvbnNvbGUubG9nKGNvdW50KVxuICBuZXh0RXhwbG9zaW9uKCk7XG4gIC8vIH1cbn1cblxuLy8gSE9WRVIgU09VTkRcbnZhciBhdWRpbyA9ICQoXCIjaG92ZXJzb3VuZFwiKVswXTtcbiQoXCIjaG92ZXJ0ZXh0XCIpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gIGF1ZGlvLnBsYXkoKTtcbn0pO1xuXG4vLyBTQ0FUTUFOISEhIChCb3R0b20gcmlnaHQpXG52YXIgYXVkaW8yID0gJChcIiNzY2F0bWFuXCIpWzBdO1xuJChcIi5zY2F0YnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXG4gIGF1ZGlvMi5jdXJyZW50VGltZSA9IDY7XG4gIGF1ZGlvMi52b2x1bWUgPSAuMztcbiAgYXVkaW8yLnBsYXkoKTtcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpIHthdWRpby5wYXVzZSgpO30sIDcxNTApO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGF1ZGlvMi5wYXVzZSgpO1xuICB9LCA3OTUwKTtcbiAgYWxlcnQoXCJJVFMgU0NBVE1BTiBUSU1FISEhIVwiKTtcblxufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoXCIjaHVkbW9iaWxlXCIpLnN3aXBlKHtcbiAgICAvL0dlbmVyaWMgc3dpcGUgaGFuZGxlciBmb3IgYWxsIGRpcmVjdGlvbnNcbiAgICBzd2lwZVJpZ2h0OiBmdW5jdGlvbihldmVudCwgZGlyZWN0aW9uLCBkaXN0YW5jZSwgZHVyYXRpb24sIGZpbmdlckNvdW50LCBmaW5nZXJEYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdSBzd2lwZWQgXCIgKyBkaXJlY3Rpb24pO1xuICAgICAgc3dhcEhVRCgpO1xuICAgIH0sXG4gICAgc3dpcGVMZWZ0OiBmdW5jdGlvbihldmVudCwgZGlyZWN0aW9uLCBkaXN0YW5jZSwgZHVyYXRpb24sIGZpbmdlckNvdW50LCBmaW5nZXJEYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdSBzd2lwZWQgXCIgKyBkaXJlY3Rpb24pO1xuICAgICAgc3dhcEhVRCgpO1xuICAgIH0sXG4gICAgYWxsb3dQYWdlU2Nyb2xsOiAndmVydGljYWwnLFxuICAgIHByZXZlbnREZWZhdWx0RXZlbnRzOiBmYWxzZVxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBob3ZlcihlbGVtZW50KSB7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3JjXCIpLnJlcGxhY2UoXCItYmxhY2tcIiwgXCItcmVkXCIpKTtcbn1cblxuZnVuY3Rpb24gdW5ob3ZlcihlbGVtZW50KSB7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3JjXCIpLnJlcGxhY2UoXCItcmVkXCIsIFwiLWJsYWNrXCIpKTtcbn1cbiIsIm5ldyAocmVxdWlyZSgnbGF5enIuanMnKSkoe1xuICBhdHRyOiAnZGF0YS1zcmMnLFxuICBzZWxlY3RvcjogJ1tkYXRhLXNyY10nLFxuICB0aHJlc2hvbGQ6IDI1LFxuICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG4gIH1cbn0pO1xuIiwiLyohXG4gKiBMYXl6ci5qcyAxLjQuMiAtIEEgc21hbGwsIGZhc3QsIG1vZGVybiwgYW5kIGRlcGVuZGVuY3ktZnJlZSBsaWJyYXJ5IGZvciBsYXp5IGxvYWRpbmcuXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTWljaGFlbCBDYXZhbGVhIC0gaHR0cDovL2NhbGxtZWNhdnMuZ2l0aHViLmlvL2xheXpyLmpzL1xuICogTGljZW5zZTogTUlUXG4gKi9cblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5MYXl6ciA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gQ09OU1RSVUNUT1JcblxuZnVuY3Rpb24gTGF5enIob3B0aW9ucykge1xuICAvLyBkZWJvdW5jZVxuICB0aGlzLl9sYXN0U2Nyb2xsID0gMDtcbiAgdGhpcy5fdGlja2luZyAgICA9IGZhbHNlO1xuXG4gIC8vIG9wdGlvbnNcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdGhpcy5fb3B0aW9uc0NvbnRhaW5lciAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGFpbmVyKSB8fCB3aW5kb3c7XG4gIHRoaXMuX29wdGlvbnNTZWxlY3RvciAgID0gb3B0aW9ucy5zZWxlY3RvciB8fCAnW2RhdGEtbGF5enJdJztcbiAgdGhpcy5fb3B0aW9uc0F0dHIgICAgICAgPSBvcHRpb25zLmF0dHIgfHwgJ2RhdGEtbGF5enInO1xuICB0aGlzLl9vcHRpb25zQXR0clJldGluYSA9IG9wdGlvbnMucmV0aW5hQXR0ciB8fCAnZGF0YS1sYXl6ci1yZXRpbmEnO1xuICB0aGlzLl9vcHRpb25zQXR0ckJnICAgICA9IG9wdGlvbnMuYmdBdHRyIHx8ICdkYXRhLWxheXpyLWJnJztcbiAgdGhpcy5fb3B0aW9uc0F0dHJIaWRkZW4gPSBvcHRpb25zLmhpZGRlbkF0dHIgfHwgJ2RhdGEtbGF5enItaGlkZGVuJztcbiAgdGhpcy5fb3B0aW9uc1RocmVzaG9sZCAgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAwO1xuICB0aGlzLl9vcHRpb25zQ2FsbGJhY2sgICA9IG9wdGlvbnMuY2FsbGJhY2sgfHwgbnVsbDtcblxuICAvLyBwcm9wZXJ0aWVzXG4gIHRoaXMuX3JldGluYSAgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDE7XG4gIHRoaXMuX3NyY0F0dHIgPSB0aGlzLl9yZXRpbmEgPyB0aGlzLl9vcHRpb25zQXR0clJldGluYSA6IHRoaXMuX29wdGlvbnNBdHRyO1xuXG4gIC8vIG5vZGVsaXN0XG4gIHRoaXMuX25vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9vcHRpb25zU2VsZWN0b3IpO1xuXG4gIC8vIHNjcm9sbCBhbmQgcmVzaXplIGhhbmRsZXJcbiAgdGhpcy5faGFuZGxlckJpbmQgPSB0aGlzLl9yZXF1ZXN0U2Nyb2xsLmJpbmQodGhpcyk7XG5cbiAgLy8gY2FsbCB0byBjcmVhdGVcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cbi8vIERFQk9VTkNFIEhFTFBFUlNcbi8vIGFkYXB0ZWQgZnJvbTogaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvc3BlZWQvYW5pbWF0aW9ucy9cblxuTGF5enIucHJvdG90eXBlLl9yZXF1ZXN0U2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gIGlmKHRoaXMuX29wdGlvbnNDb250YWluZXIgPT09IHdpbmRvdykge1xuICAgIHRoaXMuX2xhc3RTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fbGFzdFNjcm9sbCA9IHRoaXMuX29wdGlvbnNDb250YWluZXIuc2Nyb2xsVG9wICsgdGhpcy5fZ2V0T2Zmc2V0KHRoaXMuX29wdGlvbnNDb250YWluZXIpO1xuICB9XG5cbiAgdGhpcy5fcmVxdWVzdFRpY2soKTtcbn07XG5cbkxheXpyLnByb3RvdHlwZS5fcmVxdWVzdFRpY2sgPSBmdW5jdGlvbigpIHtcbiAgaWYoIXRoaXMuX3RpY2tpbmcpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fdGlja2luZyA9IHRydWU7XG4gIH1cbn07XG5cbi8vIE9GRlNFVCBIRUxQRVJcbi8vIHJlbWVtYmVyLCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG5cbkxheXpyLnByb3RvdHlwZS5fZ2V0T2Zmc2V0ID0gZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG59O1xuXG4vLyBIRUlHSFQgSEVMUEVSXG5cbkxheXpyLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVySGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9vcHRpb25zQ29udGFpbmVyLmlubmVySGVpZ2h0XG4gICAgICB8fCB0aGlzLl9vcHRpb25zQ29udGFpbmVyLm9mZnNldEhlaWdodDtcbn1cblxuLy8gTEFZWlIgTUVUSE9EU1xuXG5MYXl6ci5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBmaXJlIHNjcm9sbCBldmVudCBvbmNlXG4gIHRoaXMuX2hhbmRsZXJCaW5kKCk7XG5cbiAgLy8gYmluZCBzY3JvbGwgYW5kIHJlc2l6ZSBldmVudFxuICB0aGlzLl9vcHRpb25zQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZXJCaW5kLCBmYWxzZSk7XG4gIHRoaXMuX29wdGlvbnNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlckJpbmQsIGZhbHNlKTtcbn07XG5cbkxheXpyLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAvLyB1bmJpbmQgc2Nyb2xsIGFuZCByZXNpemUgZXZlbnRcbiAgdGhpcy5fb3B0aW9uc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVyQmluZCwgZmFsc2UpO1xuICB0aGlzLl9vcHRpb25zQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZXJCaW5kLCBmYWxzZSk7XG59O1xuXG5MYXl6ci5wcm90b3R5cGUuX2luVmlld3BvcnQgPSBmdW5jdGlvbihub2RlKSB7XG4gIC8vIGdldCB2aWV3cG9ydCB0b3AgYW5kIGJvdHRvbSBvZmZzZXRcbiAgdmFyIHZpZXdwb3J0VG9wID0gdGhpcy5fbGFzdFNjcm9sbDtcbiAgdmFyIHZpZXdwb3J0Qm90dG9tID0gdmlld3BvcnRUb3AgKyB0aGlzLl9nZXRDb250YWluZXJIZWlnaHQoKTtcblxuICAvLyBnZXQgbm9kZSB0b3AgYW5kIGJvdHRvbSBvZmZzZXRcbiAgdmFyIG5vZGVUb3AgPSB0aGlzLl9nZXRPZmZzZXQobm9kZSk7XG4gIHZhciBub2RlQm90dG9tID0gbm9kZVRvcCArIHRoaXMuX2dldENvbnRhaW5lckhlaWdodCgpO1xuXG4gIC8vIGNhbGN1bGF0ZSB0aHJlc2hvbGQsIGNvbnZlcnQgcGVyY2VudGFnZSB0byBwaXhlbCB2YWx1ZVxuICB2YXIgdGhyZXNob2xkID0gKHRoaXMuX29wdGlvbnNUaHJlc2hvbGQgLyAxMDApICogd2luZG93LmlubmVySGVpZ2h0O1xuXG4gIC8vIHJldHVybiBpZiBub2RlIGluIHZpZXdwb3J0XG4gIHJldHVybiBub2RlQm90dG9tID49IHZpZXdwb3J0VG9wIC0gdGhyZXNob2xkXG4gICAgICAmJiBub2RlVG9wIDw9IHZpZXdwb3J0Qm90dG9tICsgdGhyZXNob2xkXG4gICAgICAmJiAhbm9kZS5oYXNBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHJIaWRkZW4pO1xufTtcblxuTGF5enIucHJvdG90eXBlLl9yZXZlYWwgPSBmdW5jdGlvbihub2RlKSB7XG4gIC8vIGdldCBub2RlIHNvdXJjZVxuICB2YXIgc291cmNlID0gbm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5fc3JjQXR0cikgfHwgbm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHIpO1xuXG4gIC8vIHNldCBub2RlIHNyYyBvciBiZyBpbWFnZVxuICBpZihub2RlLmhhc0F0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0ckJnKSkge1xuICAgIG5vZGUuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgc291cmNlICsgJyknO1xuICB9XG4gIGVsc2Uge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzcmMnLCBzb3VyY2UpO1xuICB9XG5cbiAgLy8gY2FsbCB0aGUgY2FsbGJhY2tcbiAgaWYodHlwZW9mIHRoaXMuX29wdGlvbnNDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFwidGhpc1wiIHdpbGwgYmUgdGhlIG5vZGUgaW4gdGhlIGNhbGxiYWNrXG4gICAgdGhpcy5fb3B0aW9uc0NhbGxiYWNrLmNhbGwobm9kZSk7XG4gIH1cblxuICAvLyByZW1vdmUgbm9kZSBkYXRhIGF0dHJpYnV0ZXNcbiAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHIpO1xuICBub2RlLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0clJldGluYSk7XG4gIG5vZGUucmVtb3ZlQXR0cmlidXRlKHRoaXMuX29wdGlvbnNBdHRyQmcpO1xuICBub2RlLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0ckhpZGRlbik7XG59O1xuXG5MYXl6ci5wcm90b3R5cGUudXBkYXRlU2VsZWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgLy8gdXBkYXRlIGNhY2hlZCBsaXN0IG9mIG5vZGVzIG1hdGNoaW5nIHNlbGVjdG9yXG4gIHRoaXMuX25vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9vcHRpb25zU2VsZWN0b3IpO1xufTtcblxuTGF5enIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjYWNoZSBub2RlbGlzdCBsZW5ndGhcbiAgdmFyIG5vZGVzTGVuZ3RoID0gdGhpcy5fbm9kZXMubGVuZ3RoO1xuXG4gIC8vIGxvb3AgdGhyb3VnaCBub2Rlc1xuICBmb3IodmFyIGkgPSAwOyBpIDwgbm9kZXNMZW5ndGg7IGkrKykge1xuICAgIC8vIGNhY2hlIG5vZGVcbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGVzW2ldO1xuXG4gICAgLy8gY2hlY2sgaWYgbm9kZSBoYXMgbWFuZGF0b3J5IGF0dHJpYnV0ZVxuICAgIGlmKG5vZGUuaGFzQXR0cmlidXRlKHRoaXMuX29wdGlvbnNBdHRyKSkge1xuICAgICAgLy8gY2hlY2sgaWYgbm9kZSBpbiB2aWV3cG9ydFxuICAgICAgaWYodGhpcy5faW5WaWV3cG9ydChub2RlKSkge1xuICAgICAgICAvLyByZXZlYWwgbm9kZVxuICAgICAgICB0aGlzLl9yZXZlYWwobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gYWxsb3cgZm9yIG1vcmUgYW5pbWF0aW9uIGZyYW1lc1xuICB0aGlzLl90aWNraW5nID0gZmFsc2U7XG59O1xuXG5yZXR1cm4gTGF5enI7XG59KSk7XG4iXX0=
