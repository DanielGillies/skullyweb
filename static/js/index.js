(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window._wq = window._wq || [];
_wq.push({
    "1nw": function(video) {
        // console.log(video.name())
        video.bind("play", function() {
            // console.log("START THIS BISH");
        })
    }
});

window.wistiaEmbedShepherdReady = function() {
    // console.log("THE SHEPHERD IS READY MOFO");
}

var hudSwap = 1;

function test() {
    if (count < 5) {
        console.log($(".explosive-active")[0] + " STARTED")
        document.getElementsByClassName("explosive-active")[0].addEventListener('ended', function() {
            console.log($(".explosive-active")[0] + " ENDED")
            nextExplosion();
        })
    }
}

var hudPlaying = 0;
var count = 1;
var inExplosive = false;
var forwards = true;

if (window.mobilecheck()) {
    $("footer").css("display", "none");
} else {
    document.getElementById("explosive").innerHTML =
        ' <div id="explosive-previous-holder"> <a id="explosive-previous" onclick="prevExplosion()"> <i class="icon-uparrow icon-md"></i> </a> </div> <div id="explosive-next-holder"> <a id="explosive-next" onclick="nextExplosion()"> <i class="icon-downarrow icon-md"></i> </a> </div> <video id="explosive-vid1" class="explosive-active"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.mp4" type="video/mp4"> </video> <video id="explosive-vid2"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.mp4" type="video/mp4"> </video> <video id="explosive-vid3"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.mp4" type="video/mp4"> </video> <video id="explosive-vid4"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.mp4" type="video/mp4"> </video> <video id="explosive-vid5"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.mp4" type="video/mp4"> </video> <video id="explosive-vid1b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid2b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid3b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid4b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid5b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.mp4" type="video/mp4"> </video>'

    document.getElementById("indexhero").innerHTML =
        '<video autoplay loop class="fillWidth"> <source src="//dg6vcgn2vehm4.cloudfront.net/videos/indexvid.mp4" type="video/mp4"> <source src="//dg6vcgn2vehm4.cloudfront.net/videos/indexvid.webm" type="video/webm"> <source src="//dg6vcgn2vehm4.cloudfront.net/videos/indexvid.ogv" type="video/ogv"> Your browser does not support the video tag. I suggest you upgrade your browser. </video>'

    document.getElementById("hud").innerHTML = '<video id="hudvid" muted style="height:100%; position:absolute; right: 0; top: 0;"> <source id="hudwebm" class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.webm" type="video/webm"> <source id="hudmp4" class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.mp4" type="video/mp4"> <source id="hudogv" class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.ogv" type="video/ogv"> </video> <div class="container" id="hudtext"> <div id="hudheader" class="mb56 row"> <div class="col-md-12"> <h2 class="xbold uppercase">360&deg; Awareness, <br>Every Second</h2> </div> </div> <div class="hudbody row"> <div class="col-md-4"> <h5 class="uppercase xbold"> <i class="icon-HUD_3 icon-sm2"></i> Heads-Up Display</h5> <p class="subheader">Always in focus and floating <br>right in front of you.</p> <hr> </div> </div> <div class="hudbody row"> <div class="col-md-4"> <h5 class="uppercase xbold"> <i class="icon-blindspot_w2 icon-sm2"></i> 180° Blindspot Camera</h5> <p class="subheader">Ultra-wide to show you more <br> than conventional mirrors.</p> <hr> </div> </div> <div class="mb32" id="hudbuttons"> <a class="btn btn-hud active-hud" onclick="swapHUD()"></a> <a class="btn btn-hud" onclick="swapHUD()"></a> </div> </div> <div class="container" id="hudtext2"> <div class="row mb56"> <div class="col-md-12"> <h2 class="xbold uppercase">Vital, Real-time Data <br> at a Glance</h2> </div> </div> <div class="row"> <div class="col-md-4"> <h5 class="xbold uppercase"> <i class="icon-mph_w2 icon-sm2"></i> Speed</h5> <p class="subheader">Instantly glanceable MPH in <br>your Heads-Up Display. </p> <hr> </div> </div> <div class="row"> <div class="col-md-4"> <h5 class="bold uppercase"> <i class="icon-checktech_w2 icon-sm2"></i> Turn-by-Turn GPS</h5> <p class="subheader">Audio and visual navigation <br>when you need it.</p> <hr> </div> </div> <a class="btn btn-hud" onclick="swapHUD()"></a> <a class="btn btn-hud active-hud" onclick="swapHUD()"></a> </div>'

    document.getElementById("pov-vid").innerHTML = '<video autoplay loop class="fillWidth"> <source src="//dg6vcgn2vehm4.cloudfront.net/videos/pov.webm" type="video/webm"> <source src="//dg6vcgn2vehm4.cloudfront.net/videos/pov.ogv" type="video/ogv"> <source src="//dg6vcgn2vehm4.cloudfront.net/videos/pov.mp4" type="video/mp4"> </video>'

    document.getElementById("rearview-img").innerHTML = '<img class="traditional-fov lazy" data-src="static/img/fov_conventional.png"><img class="skully-fov transparent lazy" data-src="static/img/fov.png">'


    $("#pov").addClass('video-background');

    var hudTop = $('#hudvid').offset().top;
    var hudvid = $("#hudvid")[0];

    var nextButton = $('#explosive-next');
    var prevButton = $('#explosive-previous');

    $(window).scroll(function() { // assign scroll event listener
        var currentScroll = $(window).scrollTop(); // get current position

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
    })
}

function swapHUD() {
    if (!window.mobilecheck()) {
        hudSwap *= -1;
        if (hudSwap < 0) {
            $("#hudvid").find("#hudwebm").attr("src", "//dg6vcgn2vehm4.cloudfront.net/videos/HUD2.webm")
            $("#hudvid").find("#hudmp4").attr("src", "//dg6vcgn2vehm4.cloudfront.net/videos/HUD2.mp4")
            $("#hudvid").find("#hudogv").attr("src", "//dg6vcgn2vehm4.cloudfront.net/videos/HUD2.ogv")
            $("#hudvid").load();
            $("#hudvid")[0].play();
            $("#hudtext").fadeOut(600);
            $("#hudtext2").fadeIn(600);
        } else {
            $("#hudvid").find("#hudwebm").attr("src", "//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.webm")
            $("#hudvid").find("#hudmp4").attr("src", "//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.mp4")
            $("#hudvid").find("#hudogv").attr("src", "//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.ogv")
            $("#hudvid").load();
            $("#hudvid")[0].play();
            $("#hudtext2").fadeOut(600);
            $("#hudtext").fadeIn(600);
        }
    }
}

window.swapHUD = swapHUD

var minipress = document.getElementsByClassName("minipress");
for (i = 0; i < minipress.length; i++) {
    minipress[i].addEventListener("mouseover", function() {
        this.setAttribute("src", this.getAttribute("src").replace("-black", "-red"));
    })
    minipress[i].addEventListener("mouseout", function() {
        this.setAttribute("src", this.getAttribute("src").replace("-red", "-black"));
    })
}

function nextExplosion() {
    console.log(count);
    inExplosive = true;
    if (count > 0) {
        if ($(".explosive-active").length != 0) {
            var exp = $(".explosive-active")[0]
            exp.pause();
            setTimeout(function() {
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
    // document.getElementsByClassName("explosive-active")[0].addEventListener('play', test);
    $(".explosive-active")[0].currentTime = 0;
    $(".explosive-active")[0].play();
    if (count === 5) {
        nextButton.css('display', 'none');
    } else if (count >= 1) {
        prevButton.css('display', 'inline');
    }
    forwards = true;
}

// document.getElementById("explosive").addEventListener("click", function() {
//     document.getElementsByClassName("explosive-active")[0].removeEventListener('ended');
// });

window.nextExplosion = nextExplosion

function prevExplosion() {
    if (count < 6) {
        var exp = $(".explosive-active")[0]
        exp.pause();
        setTimeout(function() {
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
    setTimeout(function() {
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
// var audio = $("#hoversound")[0];
// $("#hovertext").mouseenter(function() {
//     audio.play();
// });

// SCATMAN!!! (Bottom right)
// var audio2 = $("#scatman")[0];
// $(".scatbutton").click(function() {

//     audio2.volume = .3;
//     audio2.play();

//     alert("ITS SCATMAN TIME!!!!");

// });

var canvidControl = canvid({
    selector: '#index1img',
    videos: {
        clip1: {
            src: '/static/img/indexvid.jpg',
            frames: 100,
            cols: 6,
            width: 1920,
            height: 1080,
            onEnd: function() {
                console.log('clip1 ended.');
            }
        },
    },
    loaded: function() {
        initCanvas("#index1img canvas");
        console.log("LOADED")
        canvidControl.play('clip1');
        // reverse playback
        // canvidControl.play('clip1', true);
    }
});

function initCanvas(element) {
    $(element).each(function() {
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    console.log($(this).data('width'))

    scaleCanvas(element);
}

function scaleCanvas(element) {

    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        videoWidth,
        videoHeight;

    $(element).each(function() {
        var videoAspectRatio = $(this).data('height') / $(this).data('width'),
            windowAspectRatio = windowHeight / windowWidth;

        if (videoAspectRatio > windowAspectRatio) {
            videoWidth = windowWidth;
            videoHeight = videoWidth * videoAspectRatio;
            console.log(windowWidth);
            console.log(videoWidth);
            $(this).css({
                'top': -(videoHeight - windowHeight) / 2 + 'px',
                'margin-left': 0
            });
        } else {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            // console.log(videoWidth);
            $(this).css({
                'margin-top': 0,
                'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
            });
        }

        $(this).width(videoWidth).height(videoHeight);
    })
}

$(window).on('resize', function() {
    scaleCanvas('#index1img canvas');
});

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
