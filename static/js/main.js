function detectmob(){return window.innerWidth<=990&&window.innerHeight<=600?!0:!1}function resizeVid(){$(".fs-vid-background video").each(function(){var e=$(this),t=e.width()/e.height(),i=e.closest("section");i.width()>i.outerHeight()?(e.css("width",i.width()*t),e.css("margin-left",-(i.width()*t/4)),e.css("height","auto")):(e.css("width","auto"),e.css("height",i.outerHeight()*t),e.css("margin-left","0"))})}function updateNav(){var e=mr_scrollTop;if(0>=e)return mr_navFixed&&(mr_navFixed=!1,mr_nav.removeClass("fixed")),mr_outOfSight&&(mr_outOfSight=!1,mr_nav.removeClass("outOfSight")),void(mr_navScrolled&&(mr_navScrolled=!1,mr_nav.removeClass("scrolled")));if(e>mr_firstSectionHeight){if(!mr_navScrolled)return mr_nav.addClass("scrolled"),void(mr_navScrolled=!0)}else e>mr_navOuterHeight?(mr_navFixed||(mr_nav.addClass("fixed"),mr_navFixed=!0),e>2*mr_navOuterHeight?mr_outOfSight||(mr_nav.addClass("outOfSight"),mr_outOfSight=!0):mr_outOfSight&&(mr_outOfSight=!1,mr_nav.removeClass("outOfSight"))):(mr_navFixed&&(mr_navFixed=!1,mr_nav.removeClass("fixed")),mr_outOfSight&&(mr_outOfSight=!1,mr_nav.removeClass("outOfSight"))),mr_navScrolled&&(mr_navScrolled=!1,mr_nav.removeClass("scrolled"))}function capitaliseFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}function masonryFlyIn(){var e=$(".masonryFlyIn .masonry-item"),t=0;e.each(function(){var e=$(this);setTimeout(function(){e.addClass("fadeIn")},t),t+=170})}function setupFloatingProjectFilters(){mr_floatingProjectSections=[],$(".filters.floating").closest("section").each(function(){var e=$(this);mr_floatingProjectSections.push({section:e.get(0),outerHeight:e.outerHeight(),elemTop:e.offset().top,elemBottom:e.offset().top+e.outerHeight(),filters:e.find(".filters.floating"),filersHeight:e.find(".filters.floating").outerHeight(!0)})})}function updateFloatingFilters(){for(var e=mr_floatingProjectSections.length;e--;){var t=mr_floatingProjectSections[e];t.elemTop<mr_scrollTop?(t.filters.css({position:"fixed",top:"16px",bottom:"auto"}),mr_navScrolled&&t.filters.css({transform:"translate3d(-50%,48px,0)"}),mr_scrollTop>t.elemBottom-70&&(t.filters.css({position:"absolute",bottom:"16px",top:"auto"}),t.filters.css({transform:"translate3d(-50%,0,0)"}))):t.filters.css({position:"absolute",transform:"translate3d(-50%,0,0)"})}}jQuery(document).ready(function(e){function t(t){var i=e('<ul class="cd-slider-pagination"></ul>').insertAfter(t.find(".cd-slider-navigation"));return t.find(".cd-slider li").each(function(t){var n=e(0==t?'<li class="selected"></li>':"<li></li>"),s=e('<a href="#0"></a>').appendTo(n);n.appendTo(i),s.text(t+1)}),i.children("li")}function i(e,t,i){var n=e.find(".cd-slider .selected"),a=e.find(".cd-slider-pagination .selected");"undefined"==typeof i&&(i=n.index()+1),n.removeClass("selected"),e.find(".cd-slider li").eq(i).addClass("selected").prevAll().addClass("move-left"),a.removeClass("selected"),t.eq(i).addClass("selected"),s(e,e.find(".cd-slider li").eq(i))}function n(e,t,i){var n=e.find(".cd-slider .selected"),a=e.find(".cd-slider-pagination .selected");"undefined"==typeof i&&(i=n.index()-1),n.removeClass("selected"),e.find(".cd-slider li").eq(i).addClass("selected").removeClass("move-left").nextAll().removeClass("move-left"),a.removeClass("selected"),t.eq(i).addClass("selected"),s(e,e.find(".cd-slider li").eq(i))}function s(e,t){e.find(".cd-prev").toggleClass("inactive",t.is(":first-child")),e.find(".cd-next").toggleClass("inactive",t.is(":last-child"))}function a(e){var t=window.getComputedStyle(document.querySelector(".cd-slider"),"::before").getPropertyValue("content").replace(/"/g,"").replace(/'/g,"");return"mobile"==t||e.hasClass("cd-slider-active")}var o=e(".cd-single-item");o.each(function(){var r=e(this),l=t(r);s(r,r.find(".cd-slider li").eq(0)),r.find(".cd-slider").on("click",function(t){!r.hasClass("cd-slider-active")&&e(t.target).is(".cd-slider")&&(o.removeClass("cd-slider-active"),r.addClass("cd-slider-active").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){e("body,html").animate({scrollTop:r.offset().top},200)}))}),r.find(".cd-close").on("click",function(){r.removeClass("cd-slider-active")}),r.find(".cd-next").on("click",function(){i(r,l)}),r.find(".cd-prev").on("click",function(){n(r,l)}),r.find(".cd-slider").on("swipeleft",function(){var t=e(this),n=a(r);!t.find(".selected").is(":last-child")&&n&&i(r,l)}),r.find(".cd-slider").on("swiperight",function(){var t=e(this),i=a(r);!t.find(".selected").is(":first-child")&&i&&n(r,l)}),l.on("click",function(){var t=e(this);if(!t.hasClass("selected")){var s=t.index(),a=r.find(".cd-slider .selected").index();s>a?i(r,l,s):n(r,l,s)}})}),e(document).keyup(function(t){"37"==t.which&&e(".cd-slider-active").length>0&&!e(".cd-slider-active .cd-slider .selected").is(":first-child")?n(e(".cd-slider-active"),e(".cd-slider-active").find(".cd-slider-pagination li")):"39"==t.which&&e(".cd-slider-active").length&&!e(".cd-slider-active .cd-slider .selected").is(":last-child")?i(e(".cd-slider-active"),e(".cd-slider-active").find(".cd-slider-pagination li")):"27"==t.which&&o.removeClass("cd-slider-active")})});var mr_firstSectionHeight,mr_nav,mr_navOuterHeight,mr_navScrolled=!1,mr_navFixed=!1,mr_outOfSight=!1,mr_floatingProjectSections,mr_scrollTop=0;$(document).ready(function(){"use strict";function e(e){var t,i;return $(e).find('.validate-required[type="checkbox"]').each(function(){$('[name="'+$(this).attr("name")+'"]:checked').length||(i=1,t=$(this).attr("name").replace("[]",""),e.find(".form-error").text("Please tick at least one "+t+" box."))}),$(e).find(".validate-required").each(function(){""===$(this).val()?($(this).addClass("field-error"),i=1):$(this).removeClass("field-error")}),$(e).find(".validate-email").each(function(){/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val())?$(this).removeClass("field-error"):($(this).addClass("field-error"),i=1)}),e.find(".field-error").length||e.find(".form-error").fadeOut(1e3),i}function t(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}if($(".inner-link").length&&$(".inner-link").smoothScroll({offset:-55,speed:800}),addEventListener("scroll",function(){mr_scrollTop=window.pageYOffset},!1),$(".background-image-holder").each(function(){var e=$(this).children("img").attr("src");$(this).css("background",'url("'+e+'")'),$(this).children("img").hide(),$(this).css("background-position","initial")}),setTimeout(function(){$(".background-image-holder").each(function(){$(this).addClass("fadeIn")})},200),$('[data-toggle="tooltip"]').tooltip(),$(".checkbox-option").click(function(){$(this).toggleClass("checked");var e=$(this).find("input");e.prop("checked")===!1?e.prop("checked",!0):e.prop("checked",!1)}),$(".radio-option").click(function(){$(this).closest("form").find(".radio-option").removeClass("checked"),$(this).addClass("checked"),$(this).find("input").prop("checked",!0)}),$(".accordion li").click(function(){$(this).closest(".accordion").hasClass("one-open")?($(this).closest(".accordion").find("li").removeClass("active"),$(this).addClass("active")):$(this).toggleClass("active")}),$(".tabbed-content").each(function(){$(this).append('<ul class="content"></ul>')}),$(".tabs li").each(function(){var e=$(this),t="";e.is(".tabs li:first-child")&&(t=' class="active"');var i=e.find(".tab-content").detach().wrap("<li"+t+"></li>").parent();e.closest(".tabbed-content").find(".content").append(i)}),$(".tabs li").click(function(){$(this).closest(".tabs").find("li").removeClass("active"),$(this).addClass("active");var e=$(this).index()+1;$(this).closest(".tabbed-content").find(".content>li").removeClass("active"),$(this).closest(".tabbed-content").find(".content>li:nth-of-type("+e+")").addClass("active")}),$(".progress-bar").each(function(){$(this).css("width",$(this).attr("data-progress")+"%")}),$("nav").hasClass("fixed")||$("nav").hasClass("absolute")?$("body").addClass("nav-is-overlay"):($(".nav-container").css("min-height",$("nav").outerHeight(!0)),$(window).resize(function(){$(".nav-container").css("min-height",$("nav").outerHeight(!0))}),$(window).width()>768&&$(".parallax:nth-of-type(1) .background-image-holder").css("top",-$("nav").outerHeight(!0)),$(window).width()>768&&$("section.fullscreen:nth-of-type(1)").css("height",$(window).height()-$("nav").outerHeight(!0))),$("nav").hasClass("bg-dark")&&$(".nav-container").addClass("bg-dark"),mr_nav=$("body .nav-container nav:first"),mr_navOuterHeight=$("body .nav-container nav:first").outerHeight(),window.addEventListener("scroll",updateNav,!1),$(".menu > li > ul").each(function(){var e=$(this).offset(),t=e.left+$(this).outerWidth(!0);if(t>$(window).width()&&!$(this).hasClass("mega-menu"))$(this).addClass("make-right");else if(t>$(window).width()&&$(this).hasClass("mega-menu")){var i=$(window).width()-e.left,n=$(this).outerWidth(!0)-i;$(this).css("margin-left",-n)}}),$(".mobile-toggle").click(function(){$(".nav-bar").toggleClass("nav-open"),$(".dropdownfix").toggleClass("toggle-sub"),$(".dropdownfix").toggleClass("has-dropdown"),$(this).toggleClass("active")}),$(".menu li").click(function(e){e||(e=window.event),e.stopPropagation(),$(this).find("ul").length?$(this).toggleClass("toggle-sub"):$(this).parents(".toggle-sub").removeClass("toggle-sub")}),$(".module.widget-handle").click(function(){$(this).toggleClass("toggle-widget-handle")}),$(".offscreen-toggle").length&&$("body").addClass("has-offscreen-nav"),$(".offscreen-toggle").click(function(){$(".main-container").toggleClass("reveal-nav"),$(".offscreen-container").toggleClass("reveal-nav")}),$(".main-container").click(function(){$(this).hasClass("reveal-nav")&&($(this).removeClass("reveal-nav"),$(".offscreen-container").removeClass("reveal-nav"))}),$(".offscreen-container a").click(function(){$(".offscreen-container").removeClass("reveal-nav"),$(".main-container").removeClass("reveal-nav")}),$(".projects").each(function(){var e="";$(this).find(".project").each(function(){var t=$(this).attr("data-filter").split(",");t.forEach(function(t){-1==e.indexOf(t)&&(e+='<li data-filter="'+t+'" class="active">'+capitaliseFirstLetter(t)+"</li>")}),$(this).closest(".projects").find("ul.filters").empty().append(e)})}),$(".filters li").click(function(){var e=$(this).attr("data-filter");$(this).closest(".filters").find("li").removeClass("active"),$(this).addClass("active"),$(this).closest(".projects").find(".project").each(function(){var t=$(this).data("filter");-1==t.indexOf(e)?$(this).addClass("inactive"):$(this).removeClass("inactive")}),"all"==e&&$(this).closest(".projects").find(".project").removeClass("inactive")}),$(".tweets-feed").each(function(e){$(this).attr("id","tweets-"+e)}).each(function(e){function t(t){for(var i=t.length,n=0,s=document.getElementById("tweets-"+e),a='<ul class="slides">';i>n;)a+="<li>"+t[n]+"</li>",n++;return a+="</ul>",s.innerHTML=a,a}twitterFetcher.fetch($("#tweets-"+e).attr("data-widget-id"),"",5,!0,!0,!0,"",!1,t)}),$(".instafeed").length&&(jQuery.fn.spectragram.accessData={accessToken:"791988178.1fb234f.533baea5e20548cc80a810473287fb0d",clientID:"7b3c70afac0244049c981456912dabfe"}),$(".instafeed").each(function(){var e=$(this).attr("data-user-name")+"-";$(this).children("ul").spectragram("getUserFeed",{query:e,max:12})}),$(".slider-all-controls").flexslider({}),$(".slider-paging-controls").flexslider({animation:"slide",directionNav:!1}),$(".slider-arrow-controls").flexslider({controlNav:!1}),$(".slider-thumb-controls .slides li").each(function(){var e=$(this).find("img").attr("src");$(this).attr("data-thumb",e)}),$(".slider-thumb-controls").flexslider({animation:"slide",controlNav:"thumbnails",directionNav:!0}),$(".logo-carousel").flexslider({minItems:1,maxItems:4,move:1,itemWidth:200,itemMargin:0,animation:"slide",slideshow:!0,slideshowSpeed:3e3,directionNav:!1,controlNav:!1}),$(".lightbox-grid li a").each(function(){var e=$(this).closest(".lightbox-grid").attr("data-gallery-title");$(this).attr("data-lightbox",e)}),$("section").closest("body").find(".modal-video[video-link]").remove(),$(".modal-video-container").each(function(e){$(this).find(".play-button").attr("video-link",e),$(this).find(".modal-video").clone().appendTo("body").attr("video-link",e)}),$(".modal-video-container .play-button").click(function(){var e=$("section").closest("body").find('.modal-video[video-link="'+$(this).attr("video-link")+'"]');if(e.toggleClass("reveal-modal"),e.find("video").length&&e.find("video").get(0).play(),e.find("iframe").length){var t=e.find("iframe"),i=t.attr("data-src")+"&autoplay=1";t.attr("src",i)}}),$("section").closest("body").find(".close-iframe").click(function(){$(this).closest(".modal-video").toggleClass("reveal-modal"),$(this).siblings("iframe").attr("src",""),$(this).siblings("video").get(0).pause()}),$("section").closest("body").find(".local-video-container .play-button").click(function(){$(this).siblings(".background-image-holder").removeClass("fadeIn"),$(this).siblings(".background-image-holder").css("z-index",-1),$(this).css("opacity",0),$(this).siblings("video").get(0).play()}),$("section").closest("body").find(".player").each(function(){var e=$(this).attr("data-video-id"),t=$(this).attr("data-start-at");$(this).attr("data-property","{videoURL:'http://youtu.be/"+e+"',containment:'self',autoPlay:true, mute:true, startAt:"+t+", opacity:1, showControls:false}")}),$("section").closest("body").find(".player").YTPlayer(),$(window).resize(function(){resizeVid()}),$(".map-holder").click(function(){$(this).addClass("interact")}),$(window).scroll(function(){$(".map-holder.interact").length&&$(".map-holder.interact").removeClass("interact")}),$(".countdown").length&&$(".countdown").each(function(){var e=$(this).attr("data-date");$(this).countdown(e,function(e){$(this).text(e.strftime("%D days %H:%M:%S"))})}),$("form.form-email, form.form-newsletter").submit(function(t){t.preventDefault?t.preventDefault():t.returnValue=!1;var i,n,s,a,o,r,l,d=$(this).closest("form.form-email, form.form-newsletter"),c=0,f=d.attr("original-error");return n=$(d).find("iframe.mail-list-form"),d.find(".form-error, .form-success").remove(),d.append('<div class="form-error" style="display: none;">'+d.attr("data-error")+"</div>"),d.append('<div class="form-success" style="display: none;">'+d.attr("data-success")+"</div>"),n.length&&"undefined"!=typeof n.attr("srcdoc")&&""!==n.attr("srcdoc")?(console.log("Mail list form signup detected."),s=$(d).find(".signup-email-field").val(),a=$(d).find(".signup-name-field").val(),o=$(d).find("input.signup-first-name-field").length?$(d).find("input.signup-first-name-field").val():$(d).find(".signup-name-field").val(),r=$(d).find(".signup-last-name-field").val(),1!==e(d)?(console.log("Mail list signup form validation passed."),console.log(s),console.log(r),console.log(o),console.log(a),n.contents().find("#mce-EMAIL, #fieldEmail").val(s),n.contents().find("#mce-LNAME, #fieldLastName").val(r),n.contents().find("#mce-FNAME, #fieldFirstName").val(o),n.contents().find("#mce-NAME, #fieldName").val(a),n.contents().find("form").attr("target","_blank").submit(),l=d.attr("success-redirect"),"undefined"!=typeof l&&l!==!1&&""!==l&&(window.location=l)):(d.find(".form-error").fadeIn(1e3),setTimeout(function(){d.find(".form-error").fadeOut(500)},5e3))):(console.log("Send email form detected."),"undefined"!=typeof f&&f!==!1&&d.find(".form-error").text(f),c=e(d),1===c?($(this).closest("form").find(".form-error").fadeIn(200),setTimeout(function(){$(d).find(".form-error").fadeOut(500)},3e3)):($(this).closest("form").find(".form-error").fadeOut(200),i=jQuery("<div />").addClass("form-loading").insertAfter($(d).find('input[type="submit"]')),$(d).find('input[type="submit"]').hide(),jQuery.ajax({type:"POST",url:"mail/mail.php",data:d.serialize(),success:function(e){$(d).find(".form-loading").remove(),l=d.attr("success-redirect"),"undefined"!=typeof l&&l!==!1&&""!==l&&(window.location=l),$(d).find('input[type="submit"]').show(),$.isNumeric(e)?parseInt(e)>0&&(d.find('input[type="text"]').val(""),d.find("textarea").val(""),d.find(".form-success").fadeIn(1e3),d.find(".form-error").fadeOut(1e3),setTimeout(function(){d.find(".form-success").fadeOut(500)},5e3)):(d.find(".form-error").attr("original-error",d.find(".form-error").text()),d.find(".form-error").text(e).fadeIn(1e3),d.find(".form-success").fadeOut(1e3))},error:function(e,t,i){d.find(".form-error").attr("original-error",d.find(".form-error").text()),d.find(".form-error").text(i).fadeIn(1e3),d.find(".form-success").fadeOut(1e3),$(d).find(".form-loading").remove(),$(d).find('input[type="submit"]').show()}}))),!1}),$(".validate-required, .validate-email").on("blur change",function(){e($(this).closest("form"))}),$("form").each(function(){$(this).find(".form-error").length&&$(this).attr("original-error",$(this).find(".form-error").text())}),t("ref")&&$("form.form-email").append('<input type="text" name="referrer" class="hidden" value="'+t("ref")+'"/>'),/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent||navigator.vendor||window.opera)&&$("section").removeClass("parallax"),$(".disqus-comments").length){var i=$(".disqus-comments").attr("data-shortname");!function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="//"+i+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(e)}()}}),$(window).load(function(){"use strict";if($(".masonry").length){var e=document.querySelector(".masonry"),t=new Masonry(e,{itemSelector:".masonry-item"});t.on("layoutComplete",function(){mr_firstSectionHeight=$(".main-container section:nth-of-type(1)").outerHeight(!0),$(".filters.floating").length&&(setupFloatingProjectFilters(),updateFloatingFilters(),window.addEventListener("scroll",updateFloatingFilters,!1)),$(".masonry").addClass("fadeIn"),$(".masonry-loader").addClass("fadeOut"),$(".masonryFlyIn").length&&masonryFlyIn()}),t.layout()}var i=setInterval(function(){return $(".tweets-slider").find("li.flex-active-slide").length?void clearInterval(i):void($(".tweets-slider").length&&$(".tweets-slider").flexslider({directionNav:!1,controlNav:!1}))},500);mr_firstSectionHeight=$(".main-container section:nth-of-type(1)").outerHeight(!0)}),$("document").ready(function(){resizeVid()});