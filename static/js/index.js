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
    $(this).css('opacity', 1)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvaW5kZXguanMiLCJhc3NldHMvanMvbGF6eWxvYWQuanMiLCJub2RlX21vZHVsZXMvbGF5enIuanMvZGlzdC9sYXl6ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL2xhenlsb2FkJylcblxud2luZG93Ll93cSA9IHdpbmRvdy5fd3EgfHwgW107XG5fd3EucHVzaCh7XG4gIFwiMW53XCI6IGZ1bmN0aW9uKHZpZGVvKSB7XG4gICAgdmlkZW8uYmluZChcImVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICQoXCIjd2lzdGlhXzI2X3JvbXVsdXNcIikuYXBwZW5kKFwiPGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J3N0b3JlJyBjbGFzcz0nY3RhYnV0dG9uJz5TaG9wIE5vdzwvYT5cIik7XG4gICAgfSlcbiAgfVxufSk7XG5cbmlmICh3aW5kb3cubW9iaWxlY2hlY2soKSkge1xuICAkKFwiI2h1ZFwiKS50b2dnbGUoKTtcbiAgJChcIiNodWRtb2JpbGVcIikudG9nZ2xlKCk7XG4gICQoXCIjcG92XCIpLnRvZ2dsZSgpO1xuICAkKFwiI3Bvdm1vYmlsZVwiKS50b2dnbGUoKTtcbiAgJChcIiNleHBsb3NpdmVcIikudG9nZ2xlKCk7XG4gICQoXCIjZXhwbG9zaXZlbW9iaWxlXCIpLnRvZ2dsZSgpO1xuICAkKFwic2VjdGlvblwiKS5yZW1vdmVDbGFzcyhcImZ1bGxoZWlnaHRcIik7XG4gICQoXCJzZWN0aW9uXCIpLnJlbW92ZUNsYXNzKFwiZnVsbGhlaWdodDJcIik7XG4gICQoXCJzZWN0aW9uXCIpLmFkZENsYXNzKFwibW9iaWxlZnVsbGhlaWdodFwiKTtcbiAgJChcIiNleHBsb3NpdmVtb2JpbGVcIikucmVtb3ZlQ2xhc3MoXCJtb2JpbGVmdWxsaGVpZ2h0XCIpO1xuICAkKFwiI2JlYXV0eVwiKS5hZGRDbGFzcyhcIm92ZXJsYXk0XCIpO1xuICAkKFwiI2JlYXV0eVwiKS5yZW1vdmVDbGFzcyhcImJnLXdoaXRlXCIpO1xuICAkKFwiI2JlYXV0eVwiKS5hZGRDbGFzcyhcImJnLWJsYWNrXCIpO1xuICAkKFwiI3ZpZGhvbGRlclwiKS5hZGRDbGFzcyhcIm92ZXJsYXlcIik7XG4gICQoXCIjdmlkaG9sZGVyXCIpLmFkZENsYXNzKFwibWg2MDBweFwiKTtcbiAgJChcIiNiZWF1dHlwdXJjaGFzZWltYWdlXCIpLmF0dHIoXCJzcmNcIiwgXCJzdGF0aWMvaW1nL2JlYXV0eS1jdGEtbW9iaWxlLmpwZ1wiKTtcbiAgJChcIiNiZWF1dHlwdXJjaGFzZWltYWdlaG9sZGVyXCIpLmNzcyhcImJhY2tncm91bmRcIiwgXCJ1cmwoJ3N0YXRpYy9pbWcvYmVhdXR5LWN0YS1tb2JpbGUuanBnJylcIik7XG4gICQoXCIjYXBwXCIpLnJlbW92ZUNsYXNzKFwiYmctYmxhY2tcIik7XG4gICQoXCIjYXBwXCIpLmFkZENsYXNzKFwiYmctd2hpdGVcIik7XG4gICQoXCIjYXBwYmFja2dyb3VuZFwiKS5hdHRyKFwic3JjXCIsIFwic3RhdGljL2ltZy9reWxlMWJ3bW9iaWxlLmpwZ1wiKTtcbiAgJChcIiNhcHBiYWNrZ3JvdW5kaG9sZGVyXCIpLmNzcyhcImJhY2tncm91bmRcIiwgXCJ1cmwoJ3N0YXRpYy9pbWcva3lsZTFid21vYmlsZS5qcGcnKVwiKTtcbn1cblxudmFyIGh1ZFN3YXAgPSAxO1xuXG4vLyAgdmFyIHZpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwbG9zaXZlLXZpZDJcIilcbnZhciBodWR2aWQgPSAkKFwiI2h1ZHZpZFwiKVswXTtcbi8vIGh1ZHZpZC5wYXVzZSgpO1xuLy8gaHVkdmlkLmN1cnJlbnRUaW1lID0gMTtcblxudmFyIG5leHRCdXR0b24gPSAkKCcjZXhwbG9zaXZlLW5leHQnKTtcbnZhciBwcmV2QnV0dG9uID0gJCgnI2V4cGxvc2l2ZS1wcmV2aW91cycpO1xudmFyIGV4cGxvc2l2ZVRvcCA9ICQoJyNleHBsb3NpdmUnKS5vZmZzZXQoKS50b3A7XG52YXIgZXhwbG9zaXZlQm90ID0gZXhwbG9zaXZlVG9wICsgJCgnI2V4cGxvc2l2ZS12aWQnKS5oZWlnaHQoKTtcbnZhciBhcHBUb3AgPSAkKCcjYXBwJykub2Zmc2V0KCkudG9wO1xudmFyIGFwcEJvdCA9IGFwcFRvcCArICQoJyNhcHAnKS5oZWlnaHQoKTtcbnZhciBzaWdudXBUb3AgPSAkKCcjc2lnbnVwJykub2Zmc2V0KCkudG9wO1xudmFyIHNpZ251cEJvdCA9IHNpZ251cFRvcCArICQoJyNzaWdudXAnKS5oZWlnaHQoKTtcbnZhciBodWRUb3AgPSAkKCcjaHVkdmlkJykub2Zmc2V0KCkudG9wO1xudmFyIHBvdlRvcCA9ICQoJyNwb3YnKS5vZmZzZXQoKS50b3A7XG52YXIgbmV4dFNlY3Rpb25Ub3AgPSAkKCcjZXhwbG9zaXZlJykubmV4dCgnc2VjdGlvbicpLm9mZnNldCgpLnRvcDtcbnZhciBodWRQbGF5aW5nID0gMDtcbnZhciBwb3ZDb21wbGV0ZSA9IDA7XG52YXIgY291bnQgPSAwO1xudmFyIGluRXhwbG9zaXZlID0gZmFsc2U7XG52YXIgZm9yd2FyZHMgPSB0cnVlO1xuXG5pZiAoIXdpbmRvdy5tb2JpbGVjaGVjaygpKSB7XG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7IC8vIGFzc2lnbiBzY3JvbGwgZXZlbnQgbGlzdGVuZXJcbiAgICB2YXIgY3VycmVudFNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsgLy8gZ2V0IGN1cnJlbnQgcG9zaXRpb25cbiAgICBpZiAoY3VycmVudFNjcm9sbCA+PSBleHBsb3NpdmVUb3AgLSA1NSAmJiBjdXJyZW50U2Nyb2xsIDw9IGV4cGxvc2l2ZUJvdCAmJiAhaW5FeHBsb3NpdmUpIHtcbiAgICAgIGluRXhwbG9zaXZlID0gdHJ1ZTtcbiAgICAgIG5leHRFeHBsb3Npb24oKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudFNjcm9sbCA+PSBodWRUb3AgLSA1NSAmJiBodWRQbGF5aW5nID09PSAwKSB7XG4gICAgICBodWRQbGF5aW5nID0gMTtcbiAgICAgIGh1ZHZpZC5wbGF5KCk7XG4gICAgICAkKFwiI2h1ZHRleHRcIikuZmFkZUluKDEwMCk7XG4gICAgICAkKFwiI2h1ZGhlYWRlclwiKS5mYWRlSW4oNTAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJChcIi5odWRib2R5XCIpLmZhZGVJbig1MDApO1xuICAgICAgICAkKFwiI2h1ZGJ1dHRvbnNcIikuZmFkZUluKDUwMCk7XG4gICAgICB9KTtcbiAgICAgICQoXCIjaHVkdmlkXCIpLm9uKFwiZW5kZWRcIiwgc3dhcEhVRCk7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRTY3JvbGwgPj0gcG92VG9wIC0gNTUgJiYgY3VycmVudFNjcm9sbCA8PSBleHBsb3NpdmVUb3AgLSA1NSAmJiBwb3ZDb21wbGV0ZSA9PT0gMCkge1xuICAgICAgcG92Q29tcGxldGUgPSAxO1xuICAgICAgVHdlZW5MaXRlLnNldChcIi5odWQtYW5pbWF0aW9uXCIsIHtcbiAgICAgICAgcGVyc3BlY3RpdmU6IDUwMFxuICAgICAgfSk7XG4gICAgICBUd2Vlbk1heC50byhcIiNodWQtYmdcIiwgMS41LCB7XG4gICAgICAgIHJvdGF0aW9uWTogMjAsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCJsZWZ0IDUwJVwiLFxuICAgICAgICBsZWZ0OiBcIi09MjAlXCIsXG4gICAgICAgIG9wYWNpdHk6IC43LFxuICAgICAgICBlYXNlOiBQb3dlcjEuZWFzZUluT3V0XG4gICAgICB9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKFwiI2h1ZC1ub3NlXCIsIDEuNSwge1xuICAgICAgICByb3RhdGlvblk6IDIwLFxuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwibGVmdCA1MCVcIixcbiAgICAgICAgbGVmdDogXCItPTIwJVwiLFxuICAgICAgICBvcGFjaXR5OiAuOSxcbiAgICAgICAgZWFzZTogUG93ZXIxLmVhc2VJbk91dFxuICAgICAgfSk7XG4gICAgICBUd2Vlbk1heC50byhcIiNodWQtcmVhclwiLCAxLjUsIHtcbiAgICAgICAgcm90YXRpb25ZOiAyMCxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImxlZnQgNTAlXCIsXG4gICAgICAgIGxlZnQ6IFwiLT0yMCVcIixcbiAgICAgICAgZWFzZTogUG93ZXIxLmVhc2VJbk91dFxuICAgICAgfSk7XG4gICAgICBUd2Vlbk1heC50byhcIiNodWQtbXBoXCIsIDEuNSwge1xuICAgICAgICByb3RhdGlvblk6IDIwLFxuICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwibGVmdCA1MCVcIixcbiAgICAgICAgbGVmdDogXCItPTIwJVwiLFxuICAgICAgICBlYXNlOiBQb3dlcjEuZWFzZUluT3V0XG4gICAgICB9KTtcblxuICAgICAgVHdlZW5NYXgudG8oXCIjaHVkLW5vc2VcIiwgMSwge1xuICAgICAgICBsZWZ0OiBcIis9MSVcIixcbiAgICAgICAgZGVsYXk6IDEsXG4gICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlSW5PdXRcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oXCIjaHVkLXJlYXJcIiwgMS41LCB7XG4gICAgICAgIHNjYWxlOiAyLFxuICAgICAgICB0b3A6IFwiLT0zNSVcIixcbiAgICAgICAgbGVmdDogXCItPTU1JVwiLFxuICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZUluT3V0LFxuICAgICAgICBkZWxheTogLjVcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oXCIjaHVkLW1waFwiLCAxLjUsIHtcbiAgICAgICAgc2NhbGU6IDIuNSxcbiAgICAgICAgdG9wOiBcIi09NTUlXCIsXG4gICAgICAgIGxlZnQ6IFwiLT04MCVcIixcbiAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VJbk91dCxcbiAgICAgICAgZGVsYXk6IC41XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzd2FwSFVEKCkge1xuICBpZiAoIXdpbmRvdy5tb2JpbGVjaGVjaygpKSB7XG4gICAgaHVkU3dhcCAqPSAtMTtcbiAgICBpZiAoaHVkU3dhcCA8IDApIHtcbiAgICAgICQoXCIjaHVkdmlkXCIpLmZpbmQoXCIjaHVkd2VibVwiKS5hdHRyKFwic3JjXCIsIFwiaHR0cDovL2RnNnZjZ24ydmVobTQuY2xvdWRmcm9udC5uZXQvdmlkZW9zL0hVRDIud2VibVwiKVxuICAgICAgJChcIiNodWR2aWRcIikuZmluZChcIiNodWRtcDRcIikuYXR0cihcInNyY1wiLCBcImh0dHA6Ly9kZzZ2Y2duMnZlaG00LmNsb3VkZnJvbnQubmV0L3ZpZGVvcy9IVUQyLm1wNFwiKVxuICAgICAgJChcIiNodWR2aWRcIikuZmluZChcIiNodWRvZ3ZcIikuYXR0cihcInNyY1wiLCBcImh0dHA6Ly9kZzZ2Y2duMnZlaG00LmNsb3VkZnJvbnQubmV0L3ZpZGVvcy9IVUQyLm9ndlwiKVxuICAgICAgJChcIiNodWR2aWRcIikubG9hZCgpO1xuICAgICAgJChcIiNodWR2aWRcIilbMF0ucGxheSgpO1xuICAgICAgJChcIiNodWR0ZXh0XCIpLmZhZGVPdXQoNjAwKTtcbiAgICAgICQoXCIjaHVkdGV4dDJcIikuZmFkZUluKDYwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjaHVkdmlkXCIpLmZpbmQoXCIjaHVkd2VibVwiKS5hdHRyKFwic3JjXCIsIFwiaHR0cDovL2RnNnZjZ24ydmVobTQuY2xvdWRmcm9udC5uZXQvdmlkZW9zL0hVRDEud2VibVwiKVxuICAgICAgJChcIiNodWR2aWRcIikuZmluZChcIiNodWRtcDRcIikuYXR0cihcInNyY1wiLCBcImh0dHA6Ly9kZzZ2Y2duMnZlaG00LmNsb3VkZnJvbnQubmV0L3ZpZGVvcy9IVUQxLm1wNFwiKVxuICAgICAgJChcIiNodWR2aWRcIikuZmluZChcIiNodWRvZ3ZcIikuYXR0cihcInNyY1wiLCBcImh0dHA6Ly9kZzZ2Y2duMnZlaG00LmNsb3VkZnJvbnQubmV0L3ZpZGVvcy9IVUQxLm9ndlwiKVxuICAgICAgJChcIiNodWR2aWRcIikubG9hZCgpO1xuICAgICAgJChcIiNodWR2aWRcIilbMF0ucGxheSgpO1xuICAgICAgJChcIiNodWR0ZXh0MlwiKS5mYWRlT3V0KDYwMCk7XG4gICAgICAkKFwiI2h1ZHRleHRcIikuZmFkZUluKDYwMCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGh1ZFN3YXAgKj0gLTE7XG4gICAgaWYgKGh1ZFN3YXAgPCAwKSB7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1iYWNrZ3JvdW5kXCIpLmZhZGVPdXQoNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxlLWJhY2tncm91bmQyXCIpLmZhZGVJbig2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGV0ZXh0XCIpLmZhZGVPdXQoNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxldGV4dDJcIikuZmFkZUluKDYwMCk7XG4gICAgICAkKFwiI2h1ZG1vYmlsZS1zbGlkZTFcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtaHVkXCIpO1xuICAgICAgJChcIiNodWRtb2JpbGUtc2xpZGUyXCIpLmFkZENsYXNzKFwiYWN0aXZlLWh1ZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNodWRtb2JpbGUtYmFja2dyb3VuZDJcIikuZmFkZU91dCg2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGUtYmFja2dyb3VuZFwiKS5mYWRlSW4oNjAwKTtcbiAgICAgICQoXCIjaHVkbW9iaWxldGV4dDJcIikuZmFkZU91dCg2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGV0ZXh0XCIpLmZhZGVJbig2MDApO1xuICAgICAgJChcIiNodWRtb2JpbGUtc2xpZGUyXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLWh1ZFwiKTtcbiAgICAgICQoXCIjaHVkbW9iaWxlLXNsaWRlMVwiKS5hZGRDbGFzcyhcImFjdGl2ZS1odWRcIik7XG4gICAgfVxuICB9XG59XG5cbi8vIGZ1bmN0aW9uIG5leHRFeHBsb3Npb24oKSB7XG4vLyAgICAgaWYgKGNvdW50IDwgNikge1xuLy8gICAgICAgICBpZiAoY291bnQgPT09IDUpIHtcbi8vICAgICAgICAgICAgIG5leHRCdXR0b24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA+PSAzKSB7XG4vLyAgICAgICAgICAgICBwcmV2QnV0dG9uLmNzcygnZGlzcGxheScsICdpbmxpbmUnKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXlpbmcgdmlkZW8gXCIgKyBjb3VudCArIFwiLiBGT1JXQVJEUzogXCIgKyBmb3J3YXJkcyk7XG4vLyAgICAgICAgIGlmIChmb3J3YXJkcykge1xuLy8gICAgICAgICAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQgLSAxKSkuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuLy8gICAgICAgICAgICAgJChcIiNleHBcIiArIChjb3VudCAtIDEpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KSArIFwiYlwiKS5hdHRyKFwiY2xhc3NcIiwgXCJcIik7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cFwiICsgKGNvdW50LTEpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIGNvdW50KS5hZGRDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4vLyAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQpKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXkoKTtcbi8vICAgICAgICAgLy8gJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXliYWNrUmF0ZSA9IDM7XG4vLyAgICAgICAgIGNvdW50Kys7XG4vLyAgICAgICAgIGZvcndhcmRzID0gdHJ1ZTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gcHJldkV4cGxvc2lvbigpIHtcbi8vICAgICBpZiAoY291bnQgPiAwKSB7XG4vLyAgICAgICAgIGlmIChjb3VudCA9PT0gMikge1xuLy8gICAgICAgICAgICAgcHJldkJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGNvdW50IDw9IDUpIHtcbi8vICAgICAgICAgICAgIG5leHRCdXR0b24uY3NzKCdkaXNwbGF5JywgJ2lubGluZScpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWluZyB2aWRlbyBcIiArIGNvdW50ICsgXCIuIEZPUldBUkRTOiBcIiArIGZvcndhcmRzKTtcbi8vICAgICAgICAgaWYgKGZvcndhcmRzKSB7XG4vLyAgICAgICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkpLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbi8vICAgICAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KzEpICsgXCJiXCIpLmF0dHIoXCJjbGFzc1wiLCBcIlwiKTtcbi8vICAgICAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudC0xKSArIFwiYlwiKS5hZGRDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4vLyAgICAgICAgICQoXCIjZXhwXCIgKyAoY291bnQtMSkpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuLy8gICAgICAgICAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0ucGxheSgpO1xuLy8gICAgICAgICAvLyAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0ucGxheWJhY2tSYXRlID0gMztcbi8vICAgICAgICAgY291bnQtLTtcbi8vICAgICAgICAgZm9yd2FyZHMgPSBmYWxzZVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgfVxuLy8gfVxuXG5mdW5jdGlvbiBuZXh0RXhwbG9zaW9uKCkge1xuICBjb25zb2xlLmxvZyhjb3VudCk7XG4gIGluRXhwbG9zaXZlID0gdHJ1ZTtcbiAgaWYgKGNvdW50ID4gMCkge1xuICAgIGlmICgkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIikubGVuZ3RoICE9IDApIHtcbiAgICAgICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5wYXVzZSgpO1xuICAgICAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLmN1cnJlbnRUaW1lID0gMDtcbiAgICB9XG4gICAgaWYgKGZvcndhcmRzKSB7XG4gICAgICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIChjb3VudCkpLnJlbW92ZUNsYXNzKFwiZXhwbG9zaXZlLWFjdGl2ZVwiKTtcbiAgICAgIGNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgY291bnQgKyBcImJcIikucmVtb3ZlQ2xhc3MoXCJleHBsb3NpdmUtYWN0aXZlXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb3VudCsrO1xuICB9XG4gICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgY291bnQpLmFkZENsYXNzKFwiZXhwbG9zaXZlLWFjdGl2ZVwiKTtcbiAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXkoKTtcbiAgaWYgKGNvdW50ID09PSA1KSB7XG4gICAgbmV4dEJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICB9IGVsc2UgaWYgKGNvdW50ID49IDEpIHtcbiAgICBwcmV2QnV0dG9uLmNzcygnZGlzcGxheScsICdpbmxpbmUnKTtcbiAgfVxuICBmb3J3YXJkcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHByZXZFeHBsb3Npb24oKSB7XG4gIGlmIChjb3VudCA8IDYpIHtcbiAgICAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0ucGF1c2UoKTtcbiAgICAkKFwiLmV4cGxvc2l2ZS1hY3RpdmVcIilbMF0uY3VycmVudFRpbWUgPSAwO1xuICAgIGlmIChmb3J3YXJkcykge1xuICAgICAgJChcIiNleHBsb3NpdmUtdmlkXCIgKyAoY291bnQpKS5yZW1vdmVDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KSArIFwiYlwiKS5yZW1vdmVDbGFzcyhcImV4cGxvc2l2ZS1hY3RpdmVcIik7XG4gICAgICBjb3VudC0tO1xuICAgIH1cbiAgfVxuICAkKFwiI2V4cGxvc2l2ZS12aWRcIiArIGNvdW50ICsgXCJiXCIpLmFkZENsYXNzKFwiZXhwbG9zaXZlLWFjdGl2ZVwiKTtcbiAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBsYXkoKTtcbiAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgcHJldkJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICB9IGVsc2UgaWYgKGNvdW50IDw9IDUpIHtcbiAgICBuZXh0QnV0dG9uLmNzcygnZGlzcGxheScsICdpbmxpbmUnKTtcbiAgfVxuICBmb3J3YXJkcyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnb1RvRXhwbG9zaW9uKGkpIHtcbiAgLy8gY29uc29sZS5sb2coY291bnQtaSk7XG4gIC8vIGlmIChjb3VudC1pID09IDEpIHtcbiAgLy8gICAgICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KSArIFwiYlwiKS5hdHRyKFwiY2xhc3NcIiwgXCJcIik7XG4gIC8vICAgICAkKFwiI2V4cFwiICsgKGNvdW50KSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIC8vICAgICBjb3VudCA9IGk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhcIlBSRVZcIilcbiAgLy8gICAgIHByZXZFeHBsb3Npb24oKTtcbiAgLy8gfVxuICAvLyBpZiAoY291bnQtaSA9PSAtMSkge1xuICAvLyAgICAgY291bnQrKztcbiAgLy8gICAgIG5leHRFeHBsb3Npb24oKTtcbiAgLy8gfSBlbHNlIHtcbiAgJChcIi5leHBsb3NpdmUtYWN0aXZlXCIpWzBdLnBhdXNlKCk7XG4gICQoXCIuZXhwbG9zaXZlLWFjdGl2ZVwiKVswXS5jdXJyZW50VGltZSA9IDA7XG4gICQoXCIjZXhwbG9zaXZlLXZpZFwiICsgKGNvdW50KSkuYXR0cihcImNsYXNzXCIsIFwiXCIpO1xuICAkKFwiI2V4cFwiICsgKGNvdW50KSkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gIGNvdW50ID0gaTtcbiAgY29uc29sZS5sb2coY291bnQpXG4gIG5leHRFeHBsb3Npb24oKTtcbiAgLy8gfVxufVxuXG4vLyBIT1ZFUiBTT1VORFxudmFyIGF1ZGlvID0gJChcIiNob3ZlcnNvdW5kXCIpWzBdO1xuJChcIiNob3ZlcnRleHRcIikubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgYXVkaW8ucGxheSgpO1xufSk7XG5cbi8vIFNDQVRNQU4hISEgKEJvdHRvbSByaWdodClcbnZhciBhdWRpbzIgPSAkKFwiI3NjYXRtYW5cIilbMF07XG4kKFwiLnNjYXRidXR0b25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG5cbiAgYXVkaW8yLmN1cnJlbnRUaW1lID0gNjtcbiAgYXVkaW8yLnZvbHVtZSA9IC4zO1xuICBhdWRpbzIucGxheSgpO1xuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge2F1ZGlvLnBhdXNlKCk7fSwgNzE1MCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgYXVkaW8yLnBhdXNlKCk7XG4gIH0sIDc5NTApO1xuICBhbGVydChcIklUUyBTQ0FUTUFOIFRJTUUhISEhXCIpO1xuXG59KTtcblxuJChmdW5jdGlvbigpIHtcbiAgJChcIiNodWRtb2JpbGVcIikuc3dpcGUoe1xuICAgIC8vR2VuZXJpYyBzd2lwZSBoYW5kbGVyIGZvciBhbGwgZGlyZWN0aW9uc1xuICAgIHN3aXBlUmlnaHQ6IGZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24sIGRpc3RhbmNlLCBkdXJhdGlvbiwgZmluZ2VyQ291bnQsIGZpbmdlckRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91IHN3aXBlZCBcIiArIGRpcmVjdGlvbik7XG4gICAgICBzd2FwSFVEKCk7XG4gICAgfSxcbiAgICBzd2lwZUxlZnQ6IGZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24sIGRpc3RhbmNlLCBkdXJhdGlvbiwgZmluZ2VyQ291bnQsIGZpbmdlckRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91IHN3aXBlZCBcIiArIGRpcmVjdGlvbik7XG4gICAgICBzd2FwSFVEKCk7XG4gICAgfSxcbiAgICBhbGxvd1BhZ2VTY3JvbGw6ICd2ZXJ0aWNhbCcsXG4gICAgcHJldmVudERlZmF1bHRFdmVudHM6IGZhbHNlXG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGhvdmVyKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIikucmVwbGFjZShcIi1ibGFja1wiLCBcIi1yZWRcIikpO1xufVxuXG5mdW5jdGlvbiB1bmhvdmVyKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIikucmVwbGFjZShcIi1yZWRcIiwgXCItYmxhY2tcIikpO1xufVxuIiwibmV3IChyZXF1aXJlKCdsYXl6ci5qcycpKSh7XG4gIGF0dHI6ICdkYXRhLXNyYycsXG4gIHNlbGVjdG9yOiAnW2RhdGEtc3JjXScsXG4gIHRocmVzaG9sZDogMjUsXG4gIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLmNzcygnb3BhY2l0eScsIDEpXG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG4gIH1cbn0pO1xuIiwiLyohXG4gKiBMYXl6ci5qcyAxLjQuMiAtIEEgc21hbGwsIGZhc3QsIG1vZGVybiwgYW5kIGRlcGVuZGVuY3ktZnJlZSBsaWJyYXJ5IGZvciBsYXp5IGxvYWRpbmcuXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTWljaGFlbCBDYXZhbGVhIC0gaHR0cDovL2NhbGxtZWNhdnMuZ2l0aHViLmlvL2xheXpyLmpzL1xuICogTGljZW5zZTogTUlUXG4gKi9cblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5MYXl6ciA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gQ09OU1RSVUNUT1JcblxuZnVuY3Rpb24gTGF5enIob3B0aW9ucykge1xuICAvLyBkZWJvdW5jZVxuICB0aGlzLl9sYXN0U2Nyb2xsID0gMDtcbiAgdGhpcy5fdGlja2luZyAgICA9IGZhbHNlO1xuXG4gIC8vIG9wdGlvbnNcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdGhpcy5fb3B0aW9uc0NvbnRhaW5lciAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGFpbmVyKSB8fCB3aW5kb3c7XG4gIHRoaXMuX29wdGlvbnNTZWxlY3RvciAgID0gb3B0aW9ucy5zZWxlY3RvciB8fCAnW2RhdGEtbGF5enJdJztcbiAgdGhpcy5fb3B0aW9uc0F0dHIgICAgICAgPSBvcHRpb25zLmF0dHIgfHwgJ2RhdGEtbGF5enInO1xuICB0aGlzLl9vcHRpb25zQXR0clJldGluYSA9IG9wdGlvbnMucmV0aW5hQXR0ciB8fCAnZGF0YS1sYXl6ci1yZXRpbmEnO1xuICB0aGlzLl9vcHRpb25zQXR0ckJnICAgICA9IG9wdGlvbnMuYmdBdHRyIHx8ICdkYXRhLWxheXpyLWJnJztcbiAgdGhpcy5fb3B0aW9uc0F0dHJIaWRkZW4gPSBvcHRpb25zLmhpZGRlbkF0dHIgfHwgJ2RhdGEtbGF5enItaGlkZGVuJztcbiAgdGhpcy5fb3B0aW9uc1RocmVzaG9sZCAgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAwO1xuICB0aGlzLl9vcHRpb25zQ2FsbGJhY2sgICA9IG9wdGlvbnMuY2FsbGJhY2sgfHwgbnVsbDtcblxuICAvLyBwcm9wZXJ0aWVzXG4gIHRoaXMuX3JldGluYSAgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDE7XG4gIHRoaXMuX3NyY0F0dHIgPSB0aGlzLl9yZXRpbmEgPyB0aGlzLl9vcHRpb25zQXR0clJldGluYSA6IHRoaXMuX29wdGlvbnNBdHRyO1xuXG4gIC8vIG5vZGVsaXN0XG4gIHRoaXMuX25vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9vcHRpb25zU2VsZWN0b3IpO1xuXG4gIC8vIHNjcm9sbCBhbmQgcmVzaXplIGhhbmRsZXJcbiAgdGhpcy5faGFuZGxlckJpbmQgPSB0aGlzLl9yZXF1ZXN0U2Nyb2xsLmJpbmQodGhpcyk7XG5cbiAgLy8gY2FsbCB0byBjcmVhdGVcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cbi8vIERFQk9VTkNFIEhFTFBFUlNcbi8vIGFkYXB0ZWQgZnJvbTogaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvc3BlZWQvYW5pbWF0aW9ucy9cblxuTGF5enIucHJvdG90eXBlLl9yZXF1ZXN0U2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gIGlmKHRoaXMuX29wdGlvbnNDb250YWluZXIgPT09IHdpbmRvdykge1xuICAgIHRoaXMuX2xhc3RTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fbGFzdFNjcm9sbCA9IHRoaXMuX29wdGlvbnNDb250YWluZXIuc2Nyb2xsVG9wICsgdGhpcy5fZ2V0T2Zmc2V0KHRoaXMuX29wdGlvbnNDb250YWluZXIpO1xuICB9XG5cbiAgdGhpcy5fcmVxdWVzdFRpY2soKTtcbn07XG5cbkxheXpyLnByb3RvdHlwZS5fcmVxdWVzdFRpY2sgPSBmdW5jdGlvbigpIHtcbiAgaWYoIXRoaXMuX3RpY2tpbmcpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fdGlja2luZyA9IHRydWU7XG4gIH1cbn07XG5cbi8vIE9GRlNFVCBIRUxQRVJcbi8vIHJlbWVtYmVyLCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG5cbkxheXpyLnByb3RvdHlwZS5fZ2V0T2Zmc2V0ID0gZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG59O1xuXG4vLyBIRUlHSFQgSEVMUEVSXG5cbkxheXpyLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVySGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9vcHRpb25zQ29udGFpbmVyLmlubmVySGVpZ2h0XG4gICAgICB8fCB0aGlzLl9vcHRpb25zQ29udGFpbmVyLm9mZnNldEhlaWdodDtcbn1cblxuLy8gTEFZWlIgTUVUSE9EU1xuXG5MYXl6ci5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBmaXJlIHNjcm9sbCBldmVudCBvbmNlXG4gIHRoaXMuX2hhbmRsZXJCaW5kKCk7XG5cbiAgLy8gYmluZCBzY3JvbGwgYW5kIHJlc2l6ZSBldmVudFxuICB0aGlzLl9vcHRpb25zQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX2hhbmRsZXJCaW5kLCBmYWxzZSk7XG4gIHRoaXMuX29wdGlvbnNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5faGFuZGxlckJpbmQsIGZhbHNlKTtcbn07XG5cbkxheXpyLnByb3RvdHlwZS5fZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAvLyB1bmJpbmQgc2Nyb2xsIGFuZCByZXNpemUgZXZlbnRcbiAgdGhpcy5fb3B0aW9uc0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9oYW5kbGVyQmluZCwgZmFsc2UpO1xuICB0aGlzLl9vcHRpb25zQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2hhbmRsZXJCaW5kLCBmYWxzZSk7XG59O1xuXG5MYXl6ci5wcm90b3R5cGUuX2luVmlld3BvcnQgPSBmdW5jdGlvbihub2RlKSB7XG4gIC8vIGdldCB2aWV3cG9ydCB0b3AgYW5kIGJvdHRvbSBvZmZzZXRcbiAgdmFyIHZpZXdwb3J0VG9wID0gdGhpcy5fbGFzdFNjcm9sbDtcbiAgdmFyIHZpZXdwb3J0Qm90dG9tID0gdmlld3BvcnRUb3AgKyB0aGlzLl9nZXRDb250YWluZXJIZWlnaHQoKTtcblxuICAvLyBnZXQgbm9kZSB0b3AgYW5kIGJvdHRvbSBvZmZzZXRcbiAgdmFyIG5vZGVUb3AgPSB0aGlzLl9nZXRPZmZzZXQobm9kZSk7XG4gIHZhciBub2RlQm90dG9tID0gbm9kZVRvcCArIHRoaXMuX2dldENvbnRhaW5lckhlaWdodCgpO1xuXG4gIC8vIGNhbGN1bGF0ZSB0aHJlc2hvbGQsIGNvbnZlcnQgcGVyY2VudGFnZSB0byBwaXhlbCB2YWx1ZVxuICB2YXIgdGhyZXNob2xkID0gKHRoaXMuX29wdGlvbnNUaHJlc2hvbGQgLyAxMDApICogd2luZG93LmlubmVySGVpZ2h0O1xuXG4gIC8vIHJldHVybiBpZiBub2RlIGluIHZpZXdwb3J0XG4gIHJldHVybiBub2RlQm90dG9tID49IHZpZXdwb3J0VG9wIC0gdGhyZXNob2xkXG4gICAgICAmJiBub2RlVG9wIDw9IHZpZXdwb3J0Qm90dG9tICsgdGhyZXNob2xkXG4gICAgICAmJiAhbm9kZS5oYXNBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHJIaWRkZW4pO1xufTtcblxuTGF5enIucHJvdG90eXBlLl9yZXZlYWwgPSBmdW5jdGlvbihub2RlKSB7XG4gIC8vIGdldCBub2RlIHNvdXJjZVxuICB2YXIgc291cmNlID0gbm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5fc3JjQXR0cikgfHwgbm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHIpO1xuXG4gIC8vIHNldCBub2RlIHNyYyBvciBiZyBpbWFnZVxuICBpZihub2RlLmhhc0F0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0ckJnKSkge1xuICAgIG5vZGUuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgc291cmNlICsgJyknO1xuICB9XG4gIGVsc2Uge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzcmMnLCBzb3VyY2UpO1xuICB9XG5cbiAgLy8gY2FsbCB0aGUgY2FsbGJhY2tcbiAgaWYodHlwZW9mIHRoaXMuX29wdGlvbnNDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFwidGhpc1wiIHdpbGwgYmUgdGhlIG5vZGUgaW4gdGhlIGNhbGxiYWNrXG4gICAgdGhpcy5fb3B0aW9uc0NhbGxiYWNrLmNhbGwobm9kZSk7XG4gIH1cblxuICAvLyByZW1vdmUgbm9kZSBkYXRhIGF0dHJpYnV0ZXNcbiAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fb3B0aW9uc0F0dHIpO1xuICBub2RlLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0clJldGluYSk7XG4gIG5vZGUucmVtb3ZlQXR0cmlidXRlKHRoaXMuX29wdGlvbnNBdHRyQmcpO1xuICBub2RlLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9vcHRpb25zQXR0ckhpZGRlbik7XG59O1xuXG5MYXl6ci5wcm90b3R5cGUudXBkYXRlU2VsZWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgLy8gdXBkYXRlIGNhY2hlZCBsaXN0IG9mIG5vZGVzIG1hdGNoaW5nIHNlbGVjdG9yXG4gIHRoaXMuX25vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9vcHRpb25zU2VsZWN0b3IpO1xufTtcblxuTGF5enIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjYWNoZSBub2RlbGlzdCBsZW5ndGhcbiAgdmFyIG5vZGVzTGVuZ3RoID0gdGhpcy5fbm9kZXMubGVuZ3RoO1xuXG4gIC8vIGxvb3AgdGhyb3VnaCBub2Rlc1xuICBmb3IodmFyIGkgPSAwOyBpIDwgbm9kZXNMZW5ndGg7IGkrKykge1xuICAgIC8vIGNhY2hlIG5vZGVcbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGVzW2ldO1xuXG4gICAgLy8gY2hlY2sgaWYgbm9kZSBoYXMgbWFuZGF0b3J5IGF0dHJpYnV0ZVxuICAgIGlmKG5vZGUuaGFzQXR0cmlidXRlKHRoaXMuX29wdGlvbnNBdHRyKSkge1xuICAgICAgLy8gY2hlY2sgaWYgbm9kZSBpbiB2aWV3cG9ydFxuICAgICAgaWYodGhpcy5faW5WaWV3cG9ydChub2RlKSkge1xuICAgICAgICAvLyByZXZlYWwgbm9kZVxuICAgICAgICB0aGlzLl9yZXZlYWwobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gYWxsb3cgZm9yIG1vcmUgYW5pbWF0aW9uIGZyYW1lc1xuICB0aGlzLl90aWNraW5nID0gZmFsc2U7XG59O1xuXG5yZXR1cm4gTGF5enI7XG59KSk7XG4iXX0=
