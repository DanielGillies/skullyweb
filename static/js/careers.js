!function t(e,i,o){function n(s,a){if(!i[s]){if(!e[s]){var h="function"==typeof require&&require;if(!a&&h)return h(s,!0);if(r)return r(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[s]={exports:{}};e[s][0].call(c.exports,function(t){var i=e[s][1][t];return n(i?i:t)},c,c.exports,t,e,i,o)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)n(o[s]);return n}({1:[function(t,e,i){t("./lazyload")},{"./lazyload":2}],2:[function(t,e,i){var o=t("layzr.js");o.prototype._getOffset=function(t){var e=t;if("SOURCE"==t.tagName)for(;0===e.getBoundingClientRect().top&&"BODY"!=e.tagName;)e=e.parentNode;return e.getBoundingClientRect().top+window.pageYOffset},$(document).ready(function(){new o({attr:"data-src",selector:"[data-src]",threshold:50,callback:function(){var t=$(this);if("SOURCE"==t.prop("tagName")){var e=t.closest("video")[0];e&&(e.load(),e.play()),$(e).css("opacity",1)}else t.css("opacity",1);return this.classList.add("loaded")}})})},{"layzr.js":3}],3:[function(t,e,i){!function(t,o){"function"==typeof define&&define.amd?define([],o):"object"==typeof i?e.exports=o():t.Layzr=o()}(this,function(){"use strict";function t(t){this._lastScroll=0,this._ticking=!1,t=t||{},this._optionsContainer=document.querySelector(t.container)||window,this._optionsSelector=t.selector||"[data-layzr]",this._optionsAttr=t.attr||"data-layzr",this._optionsAttrRetina=t.retinaAttr||"data-layzr-retina",this._optionsAttrBg=t.bgAttr||"data-layzr-bg",this._optionsAttrHidden=t.hiddenAttr||"data-layzr-hidden",this._optionsThreshold=t.threshold||0,this._optionsCallback=t.callback||null,this._retina=window.devicePixelRatio>1,this._srcAttr=this._retina?this._optionsAttrRetina:this._optionsAttr,this._nodes=document.querySelectorAll(this._optionsSelector),this._handlerBind=this._requestScroll.bind(this),this._create()}return t.prototype._requestScroll=function(){this._optionsContainer===window?this._lastScroll=window.pageYOffset:this._lastScroll=this._optionsContainer.scrollTop+this._getOffset(this._optionsContainer),this._requestTick()},t.prototype._requestTick=function(){this._ticking||(requestAnimationFrame(this.update.bind(this)),this._ticking=!0)},t.prototype._getOffset=function(t){return t.getBoundingClientRect().top+window.pageYOffset},t.prototype._getContainerHeight=function(){return this._optionsContainer.innerHeight||this._optionsContainer.offsetHeight},t.prototype._create=function(){this._handlerBind(),this._optionsContainer.addEventListener("scroll",this._handlerBind,!1),this._optionsContainer.addEventListener("resize",this._handlerBind,!1)},t.prototype._destroy=function(){this._optionsContainer.removeEventListener("scroll",this._handlerBind,!1),this._optionsContainer.removeEventListener("resize",this._handlerBind,!1)},t.prototype._inViewport=function(t){var e=this._lastScroll,i=e+this._getContainerHeight(),o=this._getOffset(t),n=o+this._getContainerHeight(),r=this._optionsThreshold/100*window.innerHeight;return n>=e-r&&i+r>=o&&!t.hasAttribute(this._optionsAttrHidden)},t.prototype._reveal=function(t){var e=t.getAttribute(this._srcAttr)||t.getAttribute(this._optionsAttr);t.hasAttribute(this._optionsAttrBg)?t.style.backgroundImage="url("+e+")":t.setAttribute("src",e),"function"==typeof this._optionsCallback&&this._optionsCallback.call(t),t.removeAttribute(this._optionsAttr),t.removeAttribute(this._optionsAttrRetina),t.removeAttribute(this._optionsAttrBg),t.removeAttribute(this._optionsAttrHidden)},t.prototype.updateSelector=function(){this._nodes=document.querySelectorAll(this._optionsSelector)},t.prototype.update=function(){for(var t=this._nodes.length,e=0;t>e;e++){var i=this._nodes[e];i.hasAttribute(this._optionsAttr)&&this._inViewport(i)&&this._reveal(i)}this._ticking=!1},t})},{}]},{},[1]);