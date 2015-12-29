(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./scripts')

jQuery(document).ready(function($) {
  // open the lateral panel
  $('.cd-btn').on('click', function(event) {
    event.preventDefault();
    $('.cd-panel').addClass('is-visible');
  });

  // close the lateral panel
  $('body').on('click', function(event) {
    if ($(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close')) {
      $('.cd-panel').removeClass('is-visible');
      event.preventDefault();
    }
  });

  var itemInfoWrapper = $('.cd-single-item');

  itemInfoWrapper.each(function() {
    var container = $(this),
      // create slider pagination
      sliderPagination = createSliderPagination(container);

    //update slider navigation visibility
    updateNavigation(container, container.find('.cd-slider li').eq(0));

    container.find('.cd-slider').on('click', function(event) {
      //enlarge slider images
      if (!container.hasClass('cd-slider-active') && $(event.target).is('.cd-slider')) {
        itemInfoWrapper.removeClass('cd-slider-active');
        container.addClass('cd-slider-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          $('body,html').animate({
            'scrollTop': container.offset().top
          }, 200);
        });
      }
    });

    container.find('.cd-close').on('click', function() {
      //shrink slider images
      container.removeClass('cd-slider-active');
    });

    //update visible slide
    container.find('.cd-next').on('click', function() {
      nextSlide(container, sliderPagination);
    });

    container.find('.cd-prev').on('click', function() {
      prevSlide(container, sliderPagination);
    });

    container.find('.cd-slider').on('swipeleft', function() {
      var wrapper = $(this),
        bool = enableSwipe(container);
      if (!wrapper.find('.selected').is(':last-child') && bool) {
        nextSlide(container, sliderPagination);
      }
    });

    container.find('.cd-slider').on('swiperight', function() {
      var wrapper = $(this),
        bool = enableSwipe(container);
      if (!wrapper.find('.selected').is(':first-child') && bool) {
        prevSlide(container, sliderPagination);
      }
    });

    sliderPagination.on('click', function() {
      var selectedDot = $(this);
      if (!selectedDot.hasClass('selected')) {
        var selectedPosition = selectedDot.index(),
          activePosition = container.find('.cd-slider .selected').index();
        if (activePosition < selectedPosition) {
          nextSlide(container, sliderPagination, selectedPosition);
        } else {
          prevSlide(container, sliderPagination, selectedPosition);
        }
      }
    });
  });

  //keyboard slider navigation
  $(document).keyup(function(event) {
    if (event.which == '37' && $('.cd-slider-active').length > 0 && !$('.cd-slider-active .cd-slider .selected').is(':first-child')) {
      prevSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
    } else if (event.which == '39' && $('.cd-slider-active').length && !$('.cd-slider-active .cd-slider .selected').is(':last-child')) {
      nextSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
    } else if (event.which == '27') {
      itemInfoWrapper.removeClass('cd-slider-active');
    }
  });

  function createSliderPagination($container) {
    var wrapper = $('<ul class="cd-slider-pagination"></ul>').insertAfter($container.find('.cd-slider-navigation'));
    $container.find('.cd-slider li').each(function(index) {
      var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
        dot = $('<a href="#0"></a>').appendTo(dotWrapper);
      dotWrapper.appendTo(wrapper);
      dot.text(index + 1);
    });
    return wrapper.children('li');
  }

  function nextSlide($container, $pagination, $n) {
    var visibleSlide = $container.find('.cd-slider .selected'),
      navigationDot = $container.find('.cd-slider-pagination .selected');
    if (typeof $n === 'undefined') $n = visibleSlide.index() + 1;
    visibleSlide.removeClass('selected');
    $container.find('.cd-slider li').eq($n).addClass('selected').prevAll().addClass('move-left');
    navigationDot.removeClass('selected')
    $pagination.eq($n).addClass('selected');
    updateNavigation($container, $container.find('.cd-slider li').eq($n));
  }

  function prevSlide($container, $pagination, $n) {
    var visibleSlide = $container.find('.cd-slider .selected'),
      navigationDot = $container.find('.cd-slider-pagination .selected');
    if (typeof $n === 'undefined') $n = visibleSlide.index() - 1;
    visibleSlide.removeClass('selected')
    $container.find('.cd-slider li').eq($n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
    navigationDot.removeClass('selected');
    $pagination.eq($n).addClass('selected');
    updateNavigation($container, $container.find('.cd-slider li').eq($n));
  }

  function updateNavigation($container, $active) {
    $container.find('.cd-prev').toggleClass('inactive', $active.is(':first-child'));
    $container.find('.cd-next').toggleClass('inactive', $active.is(':last-child'));
  }

  function enableSwipe($container) {
    var mq = window.getComputedStyle(document.querySelector('.cd-slider'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    return (mq == 'mobile' || $container.hasClass('cd-slider-active'));
  }
});

},{"./scripts":2}],2:[function(require,module,exports){
var mr_firstSectionHeight,
  mr_nav,
  mr_navOuterHeight,
  mr_navScrolled = false,
  mr_navFixed = false,
  mr_outOfSight = false,
  mr_floatingProjectSections,
  mr_scrollTop = 0,
  mobile = detectmob();

window.mobilecheck = function() {
  var check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function swapImage(element, index) {
  setTimeout(function() {
    var currSrc = element.children('img').eq(index).attr('src');
    element.css('background', 'url("' + currSrc + '")');
    index++;
    if (index > element.children('img').length - 1) {
      index = 0;
    }
    swapImage(element, index);
  }, 8000);
}

$(document).ready(function() {
  "use strict";

  // Smooth scroll to inner links

  // if($('.inner-link').length){
  // 	$('.inner-link').smoothScroll({
  // 		offset: -55,
  // 		speed: 800
  // 	});
  //    }

  // Update scroll variable for scrolling functions

  // addEventListener('scroll', function() {
  //     mr_scrollTop = window.pageYOffset;
  // }, false);

  // Append .background-image-holder <img>'s as CSS backgrounds

  // $('.background-image-holder').each(function() {
  //   var imgSrc = $(this).children('img').attr('src');
  //   $(this).css('background', 'url("' + imgSrc + '")');
  //   $(this).children('img').hide();
  //   $(this).css('background-position', 'initial');
  //   $(this).css('opacity', '1');
  //   if ($(this).children('img').length > 1) {
  //     swapImage($(this), 1);
  //   }
  // });

  // Fade in background images

  // $('.background-image-holder').each(function() {
  //     $(this).addClass('fadeIn');
  // });

  // Initialize Tooltips

  $('[data-toggle="tooltip"]').tooltip();

  // Checkboxes

  // $('.checkbox-option').click(function() {
  //     $(this).toggleClass('checked');
  //     var checkbox = $(this).find('input');
  //     if (checkbox.prop('checked') === false) {
  //         checkbox.prop('checked', true);
  //     } else {
  //         checkbox.prop('checked', false);
  //     }
  // });

  // Radio Buttons

  $('.radio-option').click(function() {
    $(this).closest('form').find('.radio-option').removeClass('checked');
    $(this).addClass('checked');
    $(this).find('input').prop('checked', true);
  });


  // Accordions

  // $('.accordion li').click(function() {
  //     if ($(this).closest('.accordion').hasClass('one-open')) {
  //         $(this).closest('.accordion').find('li').removeClass('active');
  //         $(this).addClass('active');
  //     } else {
  //         $(this).toggleClass('active');
  //     }
  // });

  // Tabbed Content

  $('.tabbed-content').each(function() {
    $(this).append('<ul class="content"></ul>');
  });

  $('.tabs li').each(function() {
    var originalTab = $(this),
      activeClass = "";
    if (originalTab.is('.tabs li:first-child')) {
      activeClass = ' class="active"';
    }
    var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
    originalTab.closest('.tabbed-content').find('.content').append(tabContent);
  });

  $('.tabs li').click(function() {
    $(this).closest('.tabs').find('li').removeClass('active');
    $(this).addClass('active');
    var liIndex = $(this).index() + 1;
    $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
    $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
  });

  // Progress Bars

  // $('.progress-bar').each(function() {
  //     $(this).css('width', $(this).attr('data-progress') + '%');
  // });

  // Navigation

  if (!$('nav').hasClass('fixed') && !$('nav').hasClass('absolute')) {

    // Make nav container height of nav

    $('.nav-container').css('min-height', $('nav').outerHeight(true));

    $(window).resize(function() {
      $('.nav-container').css('min-height', $('nav').outerHeight(true));
    });

    // Compensate the height of parallax element for inline nav

    // if ($(window).width() > 768) {
    //     $('.parallax:nth-of-type(1) .background-image-holder').css('top', -($('nav').outerHeight(true)));
    // }

    // Adjust fullscreen elements

    // if ($(window).width() > 768) {
    // $('section.fullscreen:nth-of-type(1)').css('height', ($(window).height() - $('nav').outerHeight(true)));
    // }

  } else {
    $('body').addClass('nav-is-overlay');
  }

  if ($('nav').hasClass('bg-dark')) {
    $('.nav-container').addClass('bg-dark');
  }


  // Fix nav to top while scrolling

  mr_nav = $('body .nav-container nav:first');
  mr_navOuterHeight = $('body .nav-container nav:first').outerHeight();
  // window.addEventListener("scroll", updateNav, false);

  // Menu dropdown positioning

  $('.menu > li > ul').each(function() {
    var menu = $(this).offset();
    var farRight = menu.left + $(this).outerWidth(true);
    if (farRight > $(window).width() && !$(this).hasClass('mega-menu')) {
      $(this).addClass('make-right');
    } else if (farRight > $(window).width() && $(this).hasClass('mega-menu')) {
      var isOnScreen = $(window).width() - menu.left;
      var difference = $(this).outerWidth(true) - isOnScreen;
      $(this).css('margin-left', -(difference));
    }
  });

  // Mobile Menu
  $('.mobile-toggle').click(function() {
    $('.nav-bar').toggleClass('nav-open');
    $('.dropdownfix').toggleClass('toggle-sub');
    $('.dropdownfix').toggleClass('has-dropdown');
    $(this).toggleClass('active');
  });

  // $('.menu li').click(function(e) {
  //     if (!e) e = window.event;
  //     e.stopPropagation();
  //     if ($(this).find('ul').length) {
  // $(this).toggleClass('toggle-sub');
  //     } else {
  //         $(this).parents('.toggle-sub').removeClass('toggle-sub');
  //     }
  // });

  $('.module.widget-handle').click(function() {
    $(this).toggleClass('toggle-widget-handle');
  });

  // Offscreen Nav

  // if($('.offscreen-toggle').length){
  // 	$('body').addClass('has-offscreen-nav');
  // }

  // $('.offscreen-toggle').click(function(){
  // 	$('.main-container').toggleClass('reveal-nav');
  // 	$('.offscreen-container').toggleClass('reveal-nav');
  // });

  // $('.main-container').click(function(){
  // 	if($(this).hasClass('reveal-nav')){
  // 		$(this).removeClass('reveal-nav');
  // 		$('.offscreen-container').removeClass('reveal-nav');
  // 	}
  // });

  // $('.offscreen-container a').click(function(){
  // 	$('.offscreen-container').removeClass('reveal-nav');
  // 	$('.main-container').removeClass('reveal-nav');
  // });

  // Populate filters

  // $('.projects').each(function() {

  //     var filters = "";

  //     $(this).find('.project').each(function() {

  //         var filterTags = $(this).attr('data-filter').split(',');

  //         filterTags.forEach(function(tagName) {
  //             if (filters.indexOf(tagName) == -1) {
  //                 filters += '<li data-filter="' + tagName + '" class="active">' + capitaliseFirstLetter(tagName) + '</li>';
  //             }
  //         });
  //         $(this).closest('.projects')
  //             .find('ul.filters').empty().append(filters);
  //     });
  // });

  // $('.filters li').click(function() {
  //     var filter = $(this).attr('data-filter');
  //     $(this).closest('.filters').find('li').removeClass('active');
  //     $(this).addClass('active');

  //     $(this).closest('.projects').find('.project').each(function() {
  //         var filters = $(this).data('filter');

  //         if (filters.indexOf(filter) == -1) {
  //             $(this).addClass('inactive');
  //         } else {
  //             $(this).removeClass('inactive');
  //         }
  //     });

  //     if (filter == 'all') {
  //         $(this).closest('.projects').find('.project').removeClass('inactive');
  //     }
  // });

  // Twitter Feed

  $('.tweets-feed').each(function(index) {
    $(this).attr('id', 'tweets-' + index);
  }).each(function(index) {

    function handleTweets(tweets) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById('tweets-' + index);
      var html = '<ul class="slides">';
      while (n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;
      return html;
    }

    twitterFetcher.fetch($('#tweets-' + index).attr('data-widget-id'), '', 5, true, true, true, '', false, handleTweets);

  });

  // Instagram Feed

  if ($('.instafeed').length) {
    jQuery.fn.spectragram.accessData = {
      accessToken: '791988178.2d41dbd.97f234bc6dd248f18807726f637719c2',
      clientID: '2d41dbd502f7436fa1cc66d4cbe0174c'
    };
  }

  $('.instafeed').each(function() {
    var feedID = $(this).attr('data-user-name') + '-';
    $(this).children('ul').spectragram('getUserFeed', {
      query: feedID,
      max: 15
    });
  });

  // Image Sliders

  // $('.slider-all-controls').flexslider({});
  // $('.slider-paging-controls').flexslider({
  //     animation: "slide",
  //     directionNav: false
  // });
  // $('.slider-arrow-controls').flexslider({
  //     controlNav: false
  // });
  // $('.slider-thumb-controls .slides li').each(function() {
  //     var imgSrc = $(this).find('img').attr('src');
  //     $(this).attr('data-thumb', imgSrc);
  // });
  // $('.slider-thumb-controls').flexslider({
  //     animation: "slide",
  //     controlNav: "thumbnails",
  //     directionNav: true
  // });
  $('.logo-carousel').flexslider({
    minItems: 1,
    maxItems: 4,
    move: 1,
    itemWidth: 200,
    itemMargin: 0,
    animation: "slide",
    slideshow: true,
    slideshowSpeed: 3000,
    directionNav: false,
    controlNav: false
  });

  // Lightbox gallery titles

  $('.lightbox-grid li a').each(function() {
    var galleryTitle = $(this).closest('.lightbox-grid').attr('data-gallery-title');
    $(this).attr('data-lightbox', galleryTitle);
  });


  // Video Modals
  $('section').closest('body').find('.modal-video[video-link]').remove();

  $('.modal-video-container').each(function(index) {
    $(this).find('.play-button').attr('video-link', index);
    $(this).find('.modal-video').clone().appendTo('body').attr('video-link', index);
  });

  $('.modal-video-container .play-button').click(function() {
    var linkedVideo = $('section').closest('body').find('.modal-video[video-link="' + $(this).attr('video-link') + '"]');
    linkedVideo.toggleClass('reveal-modal');

    if (linkedVideo.find('video').length) {
      linkedVideo.find('video').get(0).play();
    }

    if (linkedVideo.find('iframe').length) {
      var iframe = linkedVideo.find('iframe');
      var iframeSrc = iframe.attr('data-src') + '&autoplay=1';
      iframe.attr('src', iframeSrc);
    }
  });

  $('section').closest('body').find('.close-iframe').click(function() {
    $(this).closest('.modal-video').toggleClass('reveal-modal');
    $(this).siblings('iframe').attr('src', '');
    $(this).siblings('video').get(0).pause();
  });

  // Local Videos

  $('section').closest('body').find('.local-video-container .play-button').click(function() {
    $(this).siblings('.background-image-holder').removeClass('fadeIn');
    $(this).siblings('.background-image-holder').css('z-index', -1);
    $(this).css('opacity', 0);
    $(this).siblings('video').get(0).play();
  });

  // Youtube Videos

  $('section').closest('body').find('.player').each(function() {
    var src = $(this).attr('data-video-id');
    var startat = $(this).attr('data-start-at');
    $(this).attr('data-property', "{videoURL:'http://youtu.be/" + src + "',containment:'self',autoPlay:true, mute:true, startAt:" + startat + ", opacity:1, showControls:false}");
  });

  $('section').closest('body').find(".player").YTPlayer();

  // FS Vid Background

  $(window).resize(function() {
    resizeVid();
  });

  // Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map

  $('.map-holder').click(function() {
    $(this).addClass('interact');
  });

  // $(window).scroll(function() {
  //     if ($('.map-holder.interact').length) {
  //         $('.map-holder.interact').removeClass('interact');
  //     }
  // });

  // Countdown Timers

  if ($('.countdown').length) {
    $('.countdown').each(function() {
      var date = $(this).attr('data-date');
      $(this).countdown(date, function(event) {
        $(this).text(
          event.strftime('%D days %H:%M:%S')
        );
      });
    });
  }

  // Contact form code

  $('form.form-email, form.form-newsletter').submit(function(e) {

    // return false so form submits through jQuery rather than reloading page.
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;

    var thisForm = $(this).closest('form.form-email, form.form-newsletter'),
      error = 0,
      originalError = thisForm.attr('original-error'),
      loadingSpinner, iFrame, userEmail, userFullName, userFirstName, userLastName, successRedirect;

    // Mailchimp/Campaign Monitor Mail List Form Scripts
    iFrame = $(thisForm).find('iframe.mail-list-form');

    thisForm.find('.form-error, .form-success').remove();
    thisForm.append('<div class="form-error" style="display: none;">' + thisForm.attr('data-error') + '</div>');
    thisForm.append('<div class="form-success" style="display: none;">' + thisForm.attr('data-success') + '</div>');


    if ((iFrame.length) && (typeof iFrame.attr('srcdoc') !== "undefined") && (iFrame.attr('srcdoc') !== "")) {

      console.log('Mail list form signup detected.');
      userEmail = $(thisForm).find('.signup-email-field').val();
      userFullName = $(thisForm).find('.signup-name-field').val();
      if ($(thisForm).find('input.signup-first-name-field').length) {
        userFirstName = $(thisForm).find('input.signup-first-name-field').val();
      } else {
        userFirstName = $(thisForm).find('.signup-name-field').val();
      }
      userLastName = $(thisForm).find('.signup-last-name-field').val();

      // validateFields returns 1 on error;
      if (validateFields(thisForm) !== 1) {
        console.log('Mail list signup form validation passed.');
        console.log(userEmail);
        console.log(userLastName);
        console.log(userFirstName);
        console.log(userFullName);

        iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
        iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
        iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
        iFrame.contents().find('#mce-NAME, #fieldName').val(userFullName);
        iFrame.contents().find('form').attr('target', '_blank').submit();
        successRedirect = thisForm.attr('success-redirect');
        // For some browsers, if empty `successRedirect` is undefined; for others,
        // `successRedirect` is false.  Check for both.
        if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
          window.location = successRedirect;
        }
      } else {
        thisForm.find('.form-error').fadeIn(1000);
        setTimeout(function() {
          thisForm.find('.form-error').fadeOut(500);
        }, 5000);
      }
    } else {
      console.log('Send email form detected.');
      if (typeof originalError !== typeof undefined && originalError !== false) {
        thisForm.find('.form-error').text(originalError);
      }


      error = validateFields(thisForm);


      if (error === 1) {
        $(this).closest('form').find('.form-error').fadeIn(200);
        setTimeout(function() {
          $(thisForm).find('.form-error').fadeOut(500);
        }, 3000);
      } else {
        // Hide the error if one was shown
        $(this).closest('form').find('.form-error').fadeOut(200);
        // Create a new loading spinner while hiding the submit button.
        loadingSpinner = jQuery('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
        $(thisForm).find('input[type="submit"]').hide();

        jQuery.ajax({
          type: "POST",
          url: "mail/mail.php",
          data: thisForm.serialize(),
          success: function(response) {
            // Swiftmailer always sends back a number representing numner of emails sent.
            // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
            $(thisForm).find('.form-loading').remove();

            successRedirect = thisForm.attr('success-redirect');
            // For some browsers, if empty `successRedirect` is undefined; for others,
            // `successRedirect` is false.  Check for both.
            if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
              window.location = successRedirect;
            }

            $(thisForm).find('input[type="submit"]').show();
            if ($.isNumeric(response)) {
              if (parseInt(response) > 0) {
                thisForm.find('input[type="text"]').val("");
                thisForm.find('textarea').val("");
                thisForm.find('.form-success').fadeIn(1000);

                thisForm.find('.form-error').fadeOut(1000);
                setTimeout(function() {
                  thisForm.find('.form-success').fadeOut(500);
                }, 5000);
              }
            }
            // If error text was returned, put the text in the .form-error div and show it.
            else {
              // Keep the current error text in a data attribute on the form
              thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
              // Show the error with the returned error text.
              thisForm.find('.form-error').text(response).fadeIn(1000);
              thisForm.find('.form-success').fadeOut(1000);
            }
          },
          error: function(errorObject, errorText, errorHTTP) {
            // Keep the current error text in a data attribute on the form
            thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
            // Show the error with the returned error text.
            thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
            thisForm.find('.form-success').fadeOut(1000);
            $(thisForm).find('.form-loading').remove();
            $(thisForm).find('input[type="submit"]').show();
          }
        });
      }
    }
    return false;
  });

  $('.validate-required, .validate-email').on('blur change', function() {
    validateFields($(this).closest('form'));
  });

  $('form').each(function() {
    if ($(this).find('.form-error').length) {
      $(this).attr('original-error', $(this).find('.form-error').text());
    }
  });

  function validateFields(form) {
    var name, error, originalErrorMessage;

    $(form).find('.validate-required[type="checkbox"]').each(function() {
      if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
        error = 1;
        name = $(this).attr('name').replace('[]', '');
        form.find('.form-error').text('Please tick at least one ' + name + ' box.');
      }
    });

    $(form).find('.validate-required').each(function() {
      if ($(this).val() === '') {
        $(this).addClass('field-error');
        error = 1;
      } else {
        $(this).removeClass('field-error');
      }
    });

    $(form).find('.validate-email').each(function() {
      if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
        $(this).addClass('field-error');
        error = 1;
      } else {
        $(this).removeClass('field-error');
      }
    });

    if (!form.find('.field-error').length) {
      form.find('.form-error').fadeOut(1000);
    }

    return error;
  }
  // End contact form code

  // Get referrer from URL string
  if (getURLParameter("ref")) {
    $('form.form-email').append('<input type="text" name="referrer" class="hidden" value="' + getURLParameter("ref") + '"/>');
  }

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }

  // Disable parallax on mobile

  if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
    $('section').removeClass('parallax');
  }

  // Disqus Comments

  if ($('.disqus-comments').length) {
    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = $('.disqus-comments').attr('data-shortname');

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  }

});

$(window).load(function() {
  "use strict";

  // Initialize Masonry

  // if ($('.masonry').length) {
  //     var container = document.querySelector('.masonry');
  //     var msnry = new Masonry(container, {
  //         itemSelector: '.masonry-item'
  //     });

  //     msnry.on('layoutComplete', function() {

  //         mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);

  //         // Fix floating project filters to bottom of projects container

  //         if ($('.filters.floating').length) {
  //             setupFloatingProjectFilters();
  //             updateFloatingFilters();
  //             window.addEventListener("scroll", updateFloatingFilters, false);
  //         }

  //         $('.masonry').addClass('fadeIn');
  //         $('.masonry-loader').addClass('fadeOut');
  //         if ($('.masonryFlyIn').length) {
  //             masonryFlyIn();
  //         }
  //     });

  //     msnry.layout();
  // }

  // Initialize twitter feed

  var setUpTweets = setInterval(function() {
    if ($('.tweets-slider').find('li.flex-active-slide').length) {
      clearInterval(setUpTweets);
      return;
    } else {
      if ($('.tweets-slider').length) {
        $('.tweets-slider').flexslider({
          directionNav: false,
          controlNav: false
        });
      }
    }
  }, 500);

  mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);

});

$('document').ready(function() {
  resizeVid();
})

function prepcta() {
  console.log(document.body);
  var iframe = document.getElementsByClassName('wistia_embed');
  console.log(iframe);
  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  console.log(innerDoc.onended);
  var vid = document.getElementById("wistia_14");
  vid.onended = function() {
    alert("Starting to load video");
  };
}

function resizeVid() {

  $('.fs-vid-background video').each(function() {
    var vid = $(this);
    var ratio = (vid.width() / vid.height());
    var section = vid.closest('section');
    if (section.width() > section.outerHeight()) {
      console.log(section.width())
      vid.css('width', (section.width() * ratio) * .95);
      vid.css('margin-left', -((section.width() * ratio) / 4) * .8);
      vid.css('height', 'auto');
    } else {
      console.log("TE<")
      vid.css('width', 'auto');
      vid.css('height', (section.outerHeight() * ratio));
      vid.css('margin-left', '0');
    }
  });

}

function detectmob() {
  if (window.innerWidth <= 997) {
    return true;
  } else {
    return false;
  }
}

function updateNav() {

  var scrollY = mr_scrollTop;

  if (scrollY <= 0) {
    if (mr_navFixed) {
      mr_navFixed = false;
      mr_nav.removeClass('fixed');
    }
    if (mr_outOfSight) {
      mr_outOfSight = false;
      mr_nav.removeClass('outOfSight');
    }
    if (mr_navScrolled) {
      mr_navScrolled = false;
      mr_nav.removeClass('scrolled');
    }
    return;
  }

  if (scrollY > mr_firstSectionHeight) {
    if (!mr_navScrolled) {
      mr_nav.addClass('scrolled');
      mr_navScrolled = true;
      return;
    }
  } else {
    if (scrollY > mr_navOuterHeight) {
      if (!mr_navFixed && !mobile) {
        mr_nav.addClass('fixed');
        mr_navFixed = true;
      }

      if (scrollY > mr_navOuterHeight * 2) {
        console.log("FFFFF");
        if (!mr_outOfSight && !mobile) {
          mr_nav.addClass('outOfSight');
          mr_outOfSight = true;
        }
      } else {
        if (mr_outOfSight) {
          mr_outOfSight = false;
          mr_nav.removeClass('outOfSight');
        }
      }
    } else {
      if (mr_navFixed) {
        mr_navFixed = false;
        mr_nav.removeClass('fixed');
      }
      if (mr_outOfSight) {
        mr_outOfSight = false;
        mr_nav.removeClass('outOfSight');
      }
    }

    if (mr_navScrolled) {
      mr_navScrolled = false;
      mr_nav.removeClass('scrolled');
    }

  }
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// function masonryFlyIn() {
//     var $items = $('.masonryFlyIn .masonry-item');
//     var time = 0;

//     $items.each(function() {
//         var item = $(this);
//         setTimeout(function() {
//             item.addClass('fadeIn');
//         }, time);
//         time += 170;
//     });
// }

function setupFloatingProjectFilters() {
  mr_floatingProjectSections = [];
  $('.filters.floating').closest('section').each(function() {
    var section = $(this);

    mr_floatingProjectSections.push({
      section: section.get(0),
      outerHeight: section.outerHeight(),
      elemTop: section.offset().top,
      elemBottom: section.offset().top + section.outerHeight(),
      filters: section.find('.filters.floating'),
      filersHeight: section.find('.filters.floating').outerHeight(true)
    });
  });
}

function updateFloatingFilters() {
  var l = mr_floatingProjectSections.length;
  while (l--) {
    var section = mr_floatingProjectSections[l];

    if (section.elemTop < mr_scrollTop) {
      section.filters.css({
        position: 'fixed',
        top: '16px',
        bottom: 'auto'
      });
      if (mr_navScrolled) {
        section.filters.css({
          transform: 'translate3d(-50%,48px,0)'
        });
      }
      if (mr_scrollTop > (section.elemBottom - 70)) {
        section.filters.css({
          position: 'absolute',
          bottom: '16px',
          top: 'auto'
        });
        section.filters.css({
          transform: 'translate3d(-50%,0,0)'
        });
      }
    } else {
      section.filters.css({
        position: 'absolute',
        transform: 'translate3d(-50%,0,0)'
      });
    }
  }
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvbWFpbi5qcyIsImFzc2V0cy9qcy9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3NjcmlwdHMnKVxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcbiAgLy8gb3BlbiB0aGUgbGF0ZXJhbCBwYW5lbFxuICAkKCcuY2QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5jZC1wYW5lbCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gIH0pO1xuXG4gIC8vIGNsb3NlIHRoZSBsYXRlcmFsIHBhbmVsXG4gICQoJ2JvZHknKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaXMoJy5jZC1wYW5lbCcpIHx8ICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXBhbmVsLWNsb3NlJykpIHtcbiAgICAgICQoJy5jZC1wYW5lbCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGl0ZW1JbmZvV3JhcHBlciA9ICQoJy5jZC1zaW5nbGUtaXRlbScpO1xuXG4gIGl0ZW1JbmZvV3JhcHBlci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250YWluZXIgPSAkKHRoaXMpLFxuICAgICAgLy8gY3JlYXRlIHNsaWRlciBwYWdpbmF0aW9uXG4gICAgICBzbGlkZXJQYWdpbmF0aW9uID0gY3JlYXRlU2xpZGVyUGFnaW5hdGlvbihjb250YWluZXIpO1xuXG4gICAgLy91cGRhdGUgc2xpZGVyIG5hdmlnYXRpb24gdmlzaWJpbGl0eVxuICAgIHVwZGF0ZU5hdmlnYXRpb24oY29udGFpbmVyLCBjb250YWluZXIuZmluZCgnLmNkLXNsaWRlciBsaScpLmVxKDApKTtcblxuICAgIGNvbnRhaW5lci5maW5kKCcuY2Qtc2xpZGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIC8vZW5sYXJnZSBzbGlkZXIgaW1hZ2VzXG4gICAgICBpZiAoIWNvbnRhaW5lci5oYXNDbGFzcygnY2Qtc2xpZGVyLWFjdGl2ZScpICYmICQoZXZlbnQudGFyZ2V0KS5pcygnLmNkLXNsaWRlcicpKSB7XG4gICAgICAgIGl0ZW1JbmZvV3JhcHBlci5yZW1vdmVDbGFzcygnY2Qtc2xpZGVyLWFjdGl2ZScpO1xuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2NkLXNsaWRlci1hY3RpdmUnKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgICAgICdzY3JvbGxUb3AnOiBjb250YWluZXIub2Zmc2V0KCkudG9wXG4gICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuZmluZCgnLmNkLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAvL3NocmluayBzbGlkZXIgaW1hZ2VzXG4gICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NkLXNsaWRlci1hY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIC8vdXBkYXRlIHZpc2libGUgc2xpZGVcbiAgICBjb250YWluZXIuZmluZCgnLmNkLW5leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIG5leHRTbGlkZShjb250YWluZXIsIHNsaWRlclBhZ2luYXRpb24pO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJy5jZC1wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2U2xpZGUoY29udGFpbmVyLCBzbGlkZXJQYWdpbmF0aW9uKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5maW5kKCcuY2Qtc2xpZGVyJykub24oJ3N3aXBlbGVmdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHdyYXBwZXIgPSAkKHRoaXMpLFxuICAgICAgICBib29sID0gZW5hYmxlU3dpcGUoY29udGFpbmVyKTtcbiAgICAgIGlmICghd3JhcHBlci5maW5kKCcuc2VsZWN0ZWQnKS5pcygnOmxhc3QtY2hpbGQnKSAmJiBib29sKSB7XG4gICAgICAgIG5leHRTbGlkZShjb250YWluZXIsIHNsaWRlclBhZ2luYXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJy5jZC1zbGlkZXInKS5vbignc3dpcGVyaWdodCcsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHdyYXBwZXIgPSAkKHRoaXMpLFxuICAgICAgICBib29sID0gZW5hYmxlU3dpcGUoY29udGFpbmVyKTtcbiAgICAgIGlmICghd3JhcHBlci5maW5kKCcuc2VsZWN0ZWQnKS5pcygnOmZpcnN0LWNoaWxkJykgJiYgYm9vbCkge1xuICAgICAgICBwcmV2U2xpZGUoY29udGFpbmVyLCBzbGlkZXJQYWdpbmF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNsaWRlclBhZ2luYXRpb24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZWN0ZWREb3QgPSAkKHRoaXMpO1xuICAgICAgaWYgKCFzZWxlY3RlZERvdC5oYXNDbGFzcygnc2VsZWN0ZWQnKSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWRQb3NpdGlvbiA9IHNlbGVjdGVkRG90LmluZGV4KCksXG4gICAgICAgICAgYWN0aXZlUG9zaXRpb24gPSBjb250YWluZXIuZmluZCgnLmNkLXNsaWRlciAuc2VsZWN0ZWQnKS5pbmRleCgpO1xuICAgICAgICBpZiAoYWN0aXZlUG9zaXRpb24gPCBzZWxlY3RlZFBvc2l0aW9uKSB7XG4gICAgICAgICAgbmV4dFNsaWRlKGNvbnRhaW5lciwgc2xpZGVyUGFnaW5hdGlvbiwgc2VsZWN0ZWRQb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldlNsaWRlKGNvbnRhaW5lciwgc2xpZGVyUGFnaW5hdGlvbiwgc2VsZWN0ZWRQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9rZXlib2FyZCBzbGlkZXIgbmF2aWdhdGlvblxuICAkKGRvY3VtZW50KS5rZXl1cChmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC53aGljaCA9PSAnMzcnICYmICQoJy5jZC1zbGlkZXItYWN0aXZlJykubGVuZ3RoID4gMCAmJiAhJCgnLmNkLXNsaWRlci1hY3RpdmUgLmNkLXNsaWRlciAuc2VsZWN0ZWQnKS5pcygnOmZpcnN0LWNoaWxkJykpIHtcbiAgICAgIHByZXZTbGlkZSgkKCcuY2Qtc2xpZGVyLWFjdGl2ZScpLCAkKCcuY2Qtc2xpZGVyLWFjdGl2ZScpLmZpbmQoJy5jZC1zbGlkZXItcGFnaW5hdGlvbiBsaScpKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09ICczOScgJiYgJCgnLmNkLXNsaWRlci1hY3RpdmUnKS5sZW5ndGggJiYgISQoJy5jZC1zbGlkZXItYWN0aXZlIC5jZC1zbGlkZXIgLnNlbGVjdGVkJykuaXMoJzpsYXN0LWNoaWxkJykpIHtcbiAgICAgIG5leHRTbGlkZSgkKCcuY2Qtc2xpZGVyLWFjdGl2ZScpLCAkKCcuY2Qtc2xpZGVyLWFjdGl2ZScpLmZpbmQoJy5jZC1zbGlkZXItcGFnaW5hdGlvbiBsaScpKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09ICcyNycpIHtcbiAgICAgIGl0ZW1JbmZvV3JhcHBlci5yZW1vdmVDbGFzcygnY2Qtc2xpZGVyLWFjdGl2ZScpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2xpZGVyUGFnaW5hdGlvbigkY29udGFpbmVyKSB7XG4gICAgdmFyIHdyYXBwZXIgPSAkKCc8dWwgY2xhc3M9XCJjZC1zbGlkZXItcGFnaW5hdGlvblwiPjwvdWw+JykuaW5zZXJ0QWZ0ZXIoJGNvbnRhaW5lci5maW5kKCcuY2Qtc2xpZGVyLW5hdmlnYXRpb24nKSk7XG4gICAgJGNvbnRhaW5lci5maW5kKCcuY2Qtc2xpZGVyIGxpJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgdmFyIGRvdFdyYXBwZXIgPSAoaW5kZXggPT0gMCkgPyAkKCc8bGkgY2xhc3M9XCJzZWxlY3RlZFwiPjwvbGk+JykgOiAkKCc8bGk+PC9saT4nKSxcbiAgICAgICAgZG90ID0gJCgnPGEgaHJlZj1cIiMwXCI+PC9hPicpLmFwcGVuZFRvKGRvdFdyYXBwZXIpO1xuICAgICAgZG90V3JhcHBlci5hcHBlbmRUbyh3cmFwcGVyKTtcbiAgICAgIGRvdC50ZXh0KGluZGV4ICsgMSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHdyYXBwZXIuY2hpbGRyZW4oJ2xpJyk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0U2xpZGUoJGNvbnRhaW5lciwgJHBhZ2luYXRpb24sICRuKSB7XG4gICAgdmFyIHZpc2libGVTbGlkZSA9ICRjb250YWluZXIuZmluZCgnLmNkLXNsaWRlciAuc2VsZWN0ZWQnKSxcbiAgICAgIG5hdmlnYXRpb25Eb3QgPSAkY29udGFpbmVyLmZpbmQoJy5jZC1zbGlkZXItcGFnaW5hdGlvbiAuc2VsZWN0ZWQnKTtcbiAgICBpZiAodHlwZW9mICRuID09PSAndW5kZWZpbmVkJykgJG4gPSB2aXNpYmxlU2xpZGUuaW5kZXgoKSArIDE7XG4gICAgdmlzaWJsZVNsaWRlLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICRjb250YWluZXIuZmluZCgnLmNkLXNsaWRlciBsaScpLmVxKCRuKS5hZGRDbGFzcygnc2VsZWN0ZWQnKS5wcmV2QWxsKCkuYWRkQ2xhc3MoJ21vdmUtbGVmdCcpO1xuICAgIG5hdmlnYXRpb25Eb3QucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJylcbiAgICAkcGFnaW5hdGlvbi5lcSgkbikuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgdXBkYXRlTmF2aWdhdGlvbigkY29udGFpbmVyLCAkY29udGFpbmVyLmZpbmQoJy5jZC1zbGlkZXIgbGknKS5lcSgkbikpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJldlNsaWRlKCRjb250YWluZXIsICRwYWdpbmF0aW9uLCAkbikge1xuICAgIHZhciB2aXNpYmxlU2xpZGUgPSAkY29udGFpbmVyLmZpbmQoJy5jZC1zbGlkZXIgLnNlbGVjdGVkJyksXG4gICAgICBuYXZpZ2F0aW9uRG90ID0gJGNvbnRhaW5lci5maW5kKCcuY2Qtc2xpZGVyLXBhZ2luYXRpb24gLnNlbGVjdGVkJyk7XG4gICAgaWYgKHR5cGVvZiAkbiA9PT0gJ3VuZGVmaW5lZCcpICRuID0gdmlzaWJsZVNsaWRlLmluZGV4KCkgLSAxO1xuICAgIHZpc2libGVTbGlkZS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKVxuICAgICRjb250YWluZXIuZmluZCgnLmNkLXNsaWRlciBsaScpLmVxKCRuKS5hZGRDbGFzcygnc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnbW92ZS1sZWZ0JykubmV4dEFsbCgpLnJlbW92ZUNsYXNzKCdtb3ZlLWxlZnQnKTtcbiAgICBuYXZpZ2F0aW9uRG90LnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICRwYWdpbmF0aW9uLmVxKCRuKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICB1cGRhdGVOYXZpZ2F0aW9uKCRjb250YWluZXIsICRjb250YWluZXIuZmluZCgnLmNkLXNsaWRlciBsaScpLmVxKCRuKSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVOYXZpZ2F0aW9uKCRjb250YWluZXIsICRhY3RpdmUpIHtcbiAgICAkY29udGFpbmVyLmZpbmQoJy5jZC1wcmV2JykudG9nZ2xlQ2xhc3MoJ2luYWN0aXZlJywgJGFjdGl2ZS5pcygnOmZpcnN0LWNoaWxkJykpO1xuICAgICRjb250YWluZXIuZmluZCgnLmNkLW5leHQnKS50b2dnbGVDbGFzcygnaW5hY3RpdmUnLCAkYWN0aXZlLmlzKCc6bGFzdC1jaGlsZCcpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuYWJsZVN3aXBlKCRjb250YWluZXIpIHtcbiAgICB2YXIgbXEgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Qtc2xpZGVyJyksICc6OmJlZm9yZScpLmdldFByb3BlcnR5VmFsdWUoJ2NvbnRlbnQnKS5yZXBsYWNlKC9cIi9nLCBcIlwiKS5yZXBsYWNlKC8nL2csIFwiXCIpO1xuICAgIHJldHVybiAobXEgPT0gJ21vYmlsZScgfHwgJGNvbnRhaW5lci5oYXNDbGFzcygnY2Qtc2xpZGVyLWFjdGl2ZScpKTtcbiAgfVxufSk7XG4iLCJ2YXIgbXJfZmlyc3RTZWN0aW9uSGVpZ2h0LFxuICBtcl9uYXYsXG4gIG1yX25hdk91dGVySGVpZ2h0LFxuICBtcl9uYXZTY3JvbGxlZCA9IGZhbHNlLFxuICBtcl9uYXZGaXhlZCA9IGZhbHNlLFxuICBtcl9vdXRPZlNpZ2h0ID0gZmFsc2UsXG4gIG1yX2Zsb2F0aW5nUHJvamVjdFNlY3Rpb25zLFxuICBtcl9zY3JvbGxUb3AgPSAwLFxuICBtb2JpbGUgPSBkZXRlY3Rtb2IoKTtcblxud2luZG93Lm1vYmlsZWNoZWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjaGVjayA9IGZhbHNlO1xuICAoZnVuY3Rpb24oYSkge1xuICAgIGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSkgY2hlY2sgPSB0cnVlXG4gIH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmEpO1xuICByZXR1cm4gY2hlY2s7XG59XG5cbmZ1bmN0aW9uIHN3YXBJbWFnZShlbGVtZW50LCBpbmRleCkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyU3JjID0gZWxlbWVudC5jaGlsZHJlbignaW1nJykuZXEoaW5kZXgpLmF0dHIoJ3NyYycpO1xuICAgIGVsZW1lbnQuY3NzKCdiYWNrZ3JvdW5kJywgJ3VybChcIicgKyBjdXJyU3JjICsgJ1wiKScpO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKGluZGV4ID4gZWxlbWVudC5jaGlsZHJlbignaW1nJykubGVuZ3RoIC0gMSkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICBzd2FwSW1hZ2UoZWxlbWVudCwgaW5kZXgpO1xuICB9LCA4MDAwKTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIFNtb290aCBzY3JvbGwgdG8gaW5uZXIgbGlua3NcblxuICAvLyBpZigkKCcuaW5uZXItbGluaycpLmxlbmd0aCl7XG4gIC8vIFx0JCgnLmlubmVyLWxpbmsnKS5zbW9vdGhTY3JvbGwoe1xuICAvLyBcdFx0b2Zmc2V0OiAtNTUsXG4gIC8vIFx0XHRzcGVlZDogODAwXG4gIC8vIFx0fSk7XG4gIC8vICAgIH1cblxuICAvLyBVcGRhdGUgc2Nyb2xsIHZhcmlhYmxlIGZvciBzY3JvbGxpbmcgZnVuY3Rpb25zXG5cbiAgLy8gYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgICBtcl9zY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIC8vIH0sIGZhbHNlKTtcblxuICAvLyBBcHBlbmQgLmJhY2tncm91bmQtaW1hZ2UtaG9sZGVyIDxpbWc+J3MgYXMgQ1NTIGJhY2tncm91bmRzXG5cbiAgLy8gJCgnLmJhY2tncm91bmQtaW1hZ2UtaG9sZGVyJykuZWFjaChmdW5jdGlvbigpIHtcbiAgLy8gICB2YXIgaW1nU3JjID0gJCh0aGlzKS5jaGlsZHJlbignaW1nJykuYXR0cignc3JjJyk7XG4gIC8vICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQnLCAndXJsKFwiJyArIGltZ1NyYyArICdcIiknKTtcbiAgLy8gICAkKHRoaXMpLmNoaWxkcmVuKCdpbWcnKS5oaWRlKCk7XG4gIC8vICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nLCAnaW5pdGlhbCcpO1xuICAvLyAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgLy8gICBpZiAoJCh0aGlzKS5jaGlsZHJlbignaW1nJykubGVuZ3RoID4gMSkge1xuICAvLyAgICAgc3dhcEltYWdlKCQodGhpcyksIDEpO1xuICAvLyAgIH1cbiAgLy8gfSk7XG5cbiAgLy8gRmFkZSBpbiBiYWNrZ3JvdW5kIGltYWdlc1xuXG4gIC8vICQoJy5iYWNrZ3JvdW5kLWltYWdlLWhvbGRlcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gIC8vICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYWRlSW4nKTtcbiAgLy8gfSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBUb29sdGlwc1xuXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cbiAgLy8gQ2hlY2tib3hlc1xuXG4gIC8vICQoJy5jaGVja2JveC1vcHRpb24nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgLy8gICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgLy8gICAgIHZhciBjaGVja2JveCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcbiAgLy8gICAgIGlmIChjaGVja2JveC5wcm9wKCdjaGVja2VkJykgPT09IGZhbHNlKSB7XG4gIC8vICAgICAgICAgY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAvLyAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICBjaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAvLyAgICAgfVxuICAvLyB9KTtcblxuICAvLyBSYWRpbyBCdXR0b25zXG5cbiAgJCgnLnJhZGlvLW9wdGlvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuY2xvc2VzdCgnZm9ybScpLmZpbmQoJy5yYWRpby1vcHRpb24nKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAkKHRoaXMpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICB9KTtcblxuXG4gIC8vIEFjY29yZGlvbnNcblxuICAvLyAkKCcuYWNjb3JkaW9uIGxpJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gIC8vICAgICBpZiAoJCh0aGlzKS5jbG9zZXN0KCcuYWNjb3JkaW9uJykuaGFzQ2xhc3MoJ29uZS1vcGVuJykpIHtcbiAgLy8gICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5hY2NvcmRpb24nKS5maW5kKCdsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgLy8gICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgLy8gICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gIC8vICAgICB9XG4gIC8vIH0pO1xuXG4gIC8vIFRhYmJlZCBDb250ZW50XG5cbiAgJCgnLnRhYmJlZC1jb250ZW50JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLmFwcGVuZCgnPHVsIGNsYXNzPVwiY29udGVudFwiPjwvdWw+Jyk7XG4gIH0pO1xuXG4gICQoJy50YWJzIGxpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgb3JpZ2luYWxUYWIgPSAkKHRoaXMpLFxuICAgICAgYWN0aXZlQ2xhc3MgPSBcIlwiO1xuICAgIGlmIChvcmlnaW5hbFRhYi5pcygnLnRhYnMgbGk6Zmlyc3QtY2hpbGQnKSkge1xuICAgICAgYWN0aXZlQ2xhc3MgPSAnIGNsYXNzPVwiYWN0aXZlXCInO1xuICAgIH1cbiAgICB2YXIgdGFiQ29udGVudCA9IG9yaWdpbmFsVGFiLmZpbmQoJy50YWItY29udGVudCcpLmRldGFjaCgpLndyYXAoJzxsaScgKyBhY3RpdmVDbGFzcyArICc+PC9saT4nKS5wYXJlbnQoKTtcbiAgICBvcmlnaW5hbFRhYi5jbG9zZXN0KCcudGFiYmVkLWNvbnRlbnQnKS5maW5kKCcuY29udGVudCcpLmFwcGVuZCh0YWJDb250ZW50KTtcbiAgfSk7XG5cbiAgJCgnLnRhYnMgbGknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy50YWJzJykuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdmFyIGxpSW5kZXggPSAkKHRoaXMpLmluZGV4KCkgKyAxO1xuICAgICQodGhpcykuY2xvc2VzdCgnLnRhYmJlZC1jb250ZW50JykuZmluZCgnLmNvbnRlbnQ+bGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5jbG9zZXN0KCcudGFiYmVkLWNvbnRlbnQnKS5maW5kKCcuY29udGVudD5saTpudGgtb2YtdHlwZSgnICsgbGlJbmRleCArICcpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTtcblxuICAvLyBQcm9ncmVzcyBCYXJzXG5cbiAgLy8gJCgnLnByb2dyZXNzLWJhcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gIC8vICAgICAkKHRoaXMpLmNzcygnd2lkdGgnLCAkKHRoaXMpLmF0dHIoJ2RhdGEtcHJvZ3Jlc3MnKSArICclJyk7XG4gIC8vIH0pO1xuXG4gIC8vIE5hdmlnYXRpb25cblxuICBpZiAoISQoJ25hdicpLmhhc0NsYXNzKCdmaXhlZCcpICYmICEkKCduYXYnKS5oYXNDbGFzcygnYWJzb2x1dGUnKSkge1xuXG4gICAgLy8gTWFrZSBuYXYgY29udGFpbmVyIGhlaWdodCBvZiBuYXZcblxuICAgICQoJy5uYXYtY29udGFpbmVyJykuY3NzKCdtaW4taGVpZ2h0JywgJCgnbmF2Jykub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICQoJy5uYXYtY29udGFpbmVyJykuY3NzKCdtaW4taGVpZ2h0JywgJCgnbmF2Jykub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgIH0pO1xuXG4gICAgLy8gQ29tcGVuc2F0ZSB0aGUgaGVpZ2h0IG9mIHBhcmFsbGF4IGVsZW1lbnQgZm9yIGlubGluZSBuYXZcblxuICAgIC8vIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgIC8vICAgICAkKCcucGFyYWxsYXg6bnRoLW9mLXR5cGUoMSkgLmJhY2tncm91bmQtaW1hZ2UtaG9sZGVyJykuY3NzKCd0b3AnLCAtKCQoJ25hdicpLm91dGVySGVpZ2h0KHRydWUpKSk7XG4gICAgLy8gfVxuXG4gICAgLy8gQWRqdXN0IGZ1bGxzY3JlZW4gZWxlbWVudHNcblxuICAgIC8vIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgIC8vICQoJ3NlY3Rpb24uZnVsbHNjcmVlbjpudGgtb2YtdHlwZSgxKScpLmNzcygnaGVpZ2h0JywgKCQod2luZG93KS5oZWlnaHQoKSAtICQoJ25hdicpLm91dGVySGVpZ2h0KHRydWUpKSk7XG4gICAgLy8gfVxuXG4gIH0gZWxzZSB7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKCduYXYtaXMtb3ZlcmxheScpO1xuICB9XG5cbiAgaWYgKCQoJ25hdicpLmhhc0NsYXNzKCdiZy1kYXJrJykpIHtcbiAgICAkKCcubmF2LWNvbnRhaW5lcicpLmFkZENsYXNzKCdiZy1kYXJrJyk7XG4gIH1cblxuXG4gIC8vIEZpeCBuYXYgdG8gdG9wIHdoaWxlIHNjcm9sbGluZ1xuXG4gIG1yX25hdiA9ICQoJ2JvZHkgLm5hdi1jb250YWluZXIgbmF2OmZpcnN0Jyk7XG4gIG1yX25hdk91dGVySGVpZ2h0ID0gJCgnYm9keSAubmF2LWNvbnRhaW5lciBuYXY6Zmlyc3QnKS5vdXRlckhlaWdodCgpO1xuICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB1cGRhdGVOYXYsIGZhbHNlKTtcblxuICAvLyBNZW51IGRyb3Bkb3duIHBvc2l0aW9uaW5nXG5cbiAgJCgnLm1lbnUgPiBsaSA+IHVsJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgbWVudSA9ICQodGhpcykub2Zmc2V0KCk7XG4gICAgdmFyIGZhclJpZ2h0ID0gbWVudS5sZWZ0ICsgJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xuICAgIGlmIChmYXJSaWdodCA+ICQod2luZG93KS53aWR0aCgpICYmICEkKHRoaXMpLmhhc0NsYXNzKCdtZWdhLW1lbnUnKSkge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbWFrZS1yaWdodCcpO1xuICAgIH0gZWxzZSBpZiAoZmFyUmlnaHQgPiAkKHdpbmRvdykud2lkdGgoKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdtZWdhLW1lbnUnKSkge1xuICAgICAgdmFyIGlzT25TY3JlZW4gPSAkKHdpbmRvdykud2lkdGgoKSAtIG1lbnUubGVmdDtcbiAgICAgIHZhciBkaWZmZXJlbmNlID0gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpIC0gaXNPblNjcmVlbjtcbiAgICAgICQodGhpcykuY3NzKCdtYXJnaW4tbGVmdCcsIC0oZGlmZmVyZW5jZSkpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gTW9iaWxlIE1lbnVcbiAgJCgnLm1vYmlsZS10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKCcubmF2LWJhcicpLnRvZ2dsZUNsYXNzKCduYXYtb3BlbicpO1xuICAgICQoJy5kcm9wZG93bmZpeCcpLnRvZ2dsZUNsYXNzKCd0b2dnbGUtc3ViJyk7XG4gICAgJCgnLmRyb3Bkb3duZml4JykudG9nZ2xlQ2xhc3MoJ2hhcy1kcm9wZG93bicpO1xuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICB9KTtcblxuICAvLyAkKCcubWVudSBsaScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgLy8gICAgIGlmICghZSkgZSA9IHdpbmRvdy5ldmVudDtcbiAgLy8gICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIC8vICAgICBpZiAoJCh0aGlzKS5maW5kKCd1bCcpLmxlbmd0aCkge1xuICAvLyAkKHRoaXMpLnRvZ2dsZUNsYXNzKCd0b2dnbGUtc3ViJyk7XG4gIC8vICAgICB9IGVsc2Uge1xuICAvLyAgICAgICAgICQodGhpcykucGFyZW50cygnLnRvZ2dsZS1zdWInKS5yZW1vdmVDbGFzcygndG9nZ2xlLXN1YicpO1xuICAvLyAgICAgfVxuICAvLyB9KTtcblxuICAkKCcubW9kdWxlLndpZGdldC1oYW5kbGUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCd0b2dnbGUtd2lkZ2V0LWhhbmRsZScpO1xuICB9KTtcblxuICAvLyBPZmZzY3JlZW4gTmF2XG5cbiAgLy8gaWYoJCgnLm9mZnNjcmVlbi10b2dnbGUnKS5sZW5ndGgpe1xuICAvLyBcdCQoJ2JvZHknKS5hZGRDbGFzcygnaGFzLW9mZnNjcmVlbi1uYXYnKTtcbiAgLy8gfVxuXG4gIC8vICQoJy5vZmZzY3JlZW4tdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgLy8gXHQkKCcubWFpbi1jb250YWluZXInKS50b2dnbGVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAvLyBcdCQoJy5vZmZzY3JlZW4tY29udGFpbmVyJykudG9nZ2xlQ2xhc3MoJ3JldmVhbC1uYXYnKTtcbiAgLy8gfSk7XG5cbiAgLy8gJCgnLm1haW4tY29udGFpbmVyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgLy8gXHRpZigkKHRoaXMpLmhhc0NsYXNzKCdyZXZlYWwtbmF2Jykpe1xuICAvLyBcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAvLyBcdFx0JCgnLm9mZnNjcmVlbi1jb250YWluZXInKS5yZW1vdmVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAvLyBcdH1cbiAgLy8gfSk7XG5cbiAgLy8gJCgnLm9mZnNjcmVlbi1jb250YWluZXIgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gIC8vIFx0JCgnLm9mZnNjcmVlbi1jb250YWluZXInKS5yZW1vdmVDbGFzcygncmV2ZWFsLW5hdicpO1xuICAvLyBcdCQoJy5tYWluLWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdyZXZlYWwtbmF2Jyk7XG4gIC8vIH0pO1xuXG4gIC8vIFBvcHVsYXRlIGZpbHRlcnNcblxuICAvLyAkKCcucHJvamVjdHMnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gIC8vICAgICB2YXIgZmlsdGVycyA9IFwiXCI7XG5cbiAgLy8gICAgICQodGhpcykuZmluZCgnLnByb2plY3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gIC8vICAgICAgICAgdmFyIGZpbHRlclRhZ3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtZmlsdGVyJykuc3BsaXQoJywnKTtcblxuICAvLyAgICAgICAgIGZpbHRlclRhZ3MuZm9yRWFjaChmdW5jdGlvbih0YWdOYW1lKSB7XG4gIC8vICAgICAgICAgICAgIGlmIChmaWx0ZXJzLmluZGV4T2YodGFnTmFtZSkgPT0gLTEpIHtcbiAgLy8gICAgICAgICAgICAgICAgIGZpbHRlcnMgKz0gJzxsaSBkYXRhLWZpbHRlcj1cIicgKyB0YWdOYW1lICsgJ1wiIGNsYXNzPVwiYWN0aXZlXCI+JyArIGNhcGl0YWxpc2VGaXJzdExldHRlcih0YWdOYW1lKSArICc8L2xpPic7XG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9qZWN0cycpXG4gIC8vICAgICAgICAgICAgIC5maW5kKCd1bC5maWx0ZXJzJykuZW1wdHkoKS5hcHBlbmQoZmlsdGVycyk7XG4gIC8vICAgICB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gJCgnLmZpbHRlcnMgbGknKS5jbGljayhmdW5jdGlvbigpIHtcbiAgLy8gICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtZmlsdGVyJyk7XG4gIC8vICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5maWx0ZXJzJykuZmluZCgnbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gIC8vICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAvLyAgICAgJCh0aGlzKS5jbG9zZXN0KCcucHJvamVjdHMnKS5maW5kKCcucHJvamVjdCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gIC8vICAgICAgICAgdmFyIGZpbHRlcnMgPSAkKHRoaXMpLmRhdGEoJ2ZpbHRlcicpO1xuXG4gIC8vICAgICAgICAgaWYgKGZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpID09IC0xKSB7XG4gIC8vICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gIC8vICAgICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgaWYgKGZpbHRlciA9PSAnYWxsJykge1xuICAvLyAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLnByb2plY3RzJykuZmluZCgnLnByb2plY3QnKS5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcbiAgLy8gICAgIH1cbiAgLy8gfSk7XG5cbiAgLy8gVHdpdHRlciBGZWVkXG5cbiAgJCgnLnR3ZWV0cy1mZWVkJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICQodGhpcykuYXR0cignaWQnLCAndHdlZXRzLScgKyBpbmRleCk7XG4gIH0pLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVR3ZWV0cyh0d2VldHMpIHtcbiAgICAgIHZhciB4ID0gdHdlZXRzLmxlbmd0aDtcbiAgICAgIHZhciBuID0gMDtcbiAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R3ZWV0cy0nICsgaW5kZXgpO1xuICAgICAgdmFyIGh0bWwgPSAnPHVsIGNsYXNzPVwic2xpZGVzXCI+JztcbiAgICAgIHdoaWxlIChuIDwgeCkge1xuICAgICAgICBodG1sICs9ICc8bGk+JyArIHR3ZWV0c1tuXSArICc8L2xpPic7XG4gICAgICAgIG4rKztcbiAgICAgIH1cbiAgICAgIGh0bWwgKz0gJzwvdWw+JztcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH1cblxuICAgIHR3aXR0ZXJGZXRjaGVyLmZldGNoKCQoJyN0d2VldHMtJyArIGluZGV4KS5hdHRyKCdkYXRhLXdpZGdldC1pZCcpLCAnJywgNSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgJycsIGZhbHNlLCBoYW5kbGVUd2VldHMpO1xuXG4gIH0pO1xuXG4gIC8vIEluc3RhZ3JhbSBGZWVkXG5cbiAgaWYgKCQoJy5pbnN0YWZlZWQnKS5sZW5ndGgpIHtcbiAgICBqUXVlcnkuZm4uc3BlY3RyYWdyYW0uYWNjZXNzRGF0YSA9IHtcbiAgICAgIGFjY2Vzc1Rva2VuOiAnNzkxOTg4MTc4LjJkNDFkYmQuOTdmMjM0YmM2ZGQyNDhmMTg4MDc3MjZmNjM3NzE5YzInLFxuICAgICAgY2xpZW50SUQ6ICcyZDQxZGJkNTAyZjc0MzZmYTFjYzY2ZDRjYmUwMTc0YydcbiAgICB9O1xuICB9XG5cbiAgJCgnLmluc3RhZmVlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZlZWRJRCA9ICQodGhpcykuYXR0cignZGF0YS11c2VyLW5hbWUnKSArICctJztcbiAgICAkKHRoaXMpLmNoaWxkcmVuKCd1bCcpLnNwZWN0cmFncmFtKCdnZXRVc2VyRmVlZCcsIHtcbiAgICAgIHF1ZXJ5OiBmZWVkSUQsXG4gICAgICBtYXg6IDE1XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIEltYWdlIFNsaWRlcnNcblxuICAvLyAkKCcuc2xpZGVyLWFsbC1jb250cm9scycpLmZsZXhzbGlkZXIoe30pO1xuICAvLyAkKCcuc2xpZGVyLXBhZ2luZy1jb250cm9scycpLmZsZXhzbGlkZXIoe1xuICAvLyAgICAgYW5pbWF0aW9uOiBcInNsaWRlXCIsXG4gIC8vICAgICBkaXJlY3Rpb25OYXY6IGZhbHNlXG4gIC8vIH0pO1xuICAvLyAkKCcuc2xpZGVyLWFycm93LWNvbnRyb2xzJykuZmxleHNsaWRlcih7XG4gIC8vICAgICBjb250cm9sTmF2OiBmYWxzZVxuICAvLyB9KTtcbiAgLy8gJCgnLnNsaWRlci10aHVtYi1jb250cm9scyAuc2xpZGVzIGxpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgLy8gICAgIHZhciBpbWdTcmMgPSAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xuICAvLyAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLXRodW1iJywgaW1nU3JjKTtcbiAgLy8gfSk7XG4gIC8vICQoJy5zbGlkZXItdGh1bWItY29udHJvbHMnKS5mbGV4c2xpZGVyKHtcbiAgLy8gICAgIGFuaW1hdGlvbjogXCJzbGlkZVwiLFxuICAvLyAgICAgY29udHJvbE5hdjogXCJ0aHVtYm5haWxzXCIsXG4gIC8vICAgICBkaXJlY3Rpb25OYXY6IHRydWVcbiAgLy8gfSk7XG4gICQoJy5sb2dvLWNhcm91c2VsJykuZmxleHNsaWRlcih7XG4gICAgbWluSXRlbXM6IDEsXG4gICAgbWF4SXRlbXM6IDQsXG4gICAgbW92ZTogMSxcbiAgICBpdGVtV2lkdGg6IDIwMCxcbiAgICBpdGVtTWFyZ2luOiAwLFxuICAgIGFuaW1hdGlvbjogXCJzbGlkZVwiLFxuICAgIHNsaWRlc2hvdzogdHJ1ZSxcbiAgICBzbGlkZXNob3dTcGVlZDogMzAwMCxcbiAgICBkaXJlY3Rpb25OYXY6IGZhbHNlLFxuICAgIGNvbnRyb2xOYXY6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIExpZ2h0Ym94IGdhbGxlcnkgdGl0bGVzXG5cbiAgJCgnLmxpZ2h0Ym94LWdyaWQgbGkgYScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIGdhbGxlcnlUaXRsZSA9ICQodGhpcykuY2xvc2VzdCgnLmxpZ2h0Ym94LWdyaWQnKS5hdHRyKCdkYXRhLWdhbGxlcnktdGl0bGUnKTtcbiAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtbGlnaHRib3gnLCBnYWxsZXJ5VGl0bGUpO1xuICB9KTtcblxuXG4gIC8vIFZpZGVvIE1vZGFsc1xuICAkKCdzZWN0aW9uJykuY2xvc2VzdCgnYm9keScpLmZpbmQoJy5tb2RhbC12aWRlb1t2aWRlby1saW5rXScpLnJlbW92ZSgpO1xuXG4gICQoJy5tb2RhbC12aWRlby1jb250YWluZXInKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgJCh0aGlzKS5maW5kKCcucGxheS1idXR0b24nKS5hdHRyKCd2aWRlby1saW5rJywgaW5kZXgpO1xuICAgICQodGhpcykuZmluZCgnLm1vZGFsLXZpZGVvJykuY2xvbmUoKS5hcHBlbmRUbygnYm9keScpLmF0dHIoJ3ZpZGVvLWxpbmsnLCBpbmRleCk7XG4gIH0pO1xuXG4gICQoJy5tb2RhbC12aWRlby1jb250YWluZXIgLnBsYXktYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxpbmtlZFZpZGVvID0gJCgnc2VjdGlvbicpLmNsb3Nlc3QoJ2JvZHknKS5maW5kKCcubW9kYWwtdmlkZW9bdmlkZW8tbGluaz1cIicgKyAkKHRoaXMpLmF0dHIoJ3ZpZGVvLWxpbmsnKSArICdcIl0nKTtcbiAgICBsaW5rZWRWaWRlby50b2dnbGVDbGFzcygncmV2ZWFsLW1vZGFsJyk7XG5cbiAgICBpZiAobGlua2VkVmlkZW8uZmluZCgndmlkZW8nKS5sZW5ndGgpIHtcbiAgICAgIGxpbmtlZFZpZGVvLmZpbmQoJ3ZpZGVvJykuZ2V0KDApLnBsYXkoKTtcbiAgICB9XG5cbiAgICBpZiAobGlua2VkVmlkZW8uZmluZCgnaWZyYW1lJykubGVuZ3RoKSB7XG4gICAgICB2YXIgaWZyYW1lID0gbGlua2VkVmlkZW8uZmluZCgnaWZyYW1lJyk7XG4gICAgICB2YXIgaWZyYW1lU3JjID0gaWZyYW1lLmF0dHIoJ2RhdGEtc3JjJykgKyAnJmF1dG9wbGF5PTEnO1xuICAgICAgaWZyYW1lLmF0dHIoJ3NyYycsIGlmcmFtZVNyYyk7XG4gICAgfVxuICB9KTtcblxuICAkKCdzZWN0aW9uJykuY2xvc2VzdCgnYm9keScpLmZpbmQoJy5jbG9zZS1pZnJhbWUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbC12aWRlbycpLnRvZ2dsZUNsYXNzKCdyZXZlYWwtbW9kYWwnKTtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCdpZnJhbWUnKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgJCh0aGlzKS5zaWJsaW5ncygndmlkZW8nKS5nZXQoMCkucGF1c2UoKTtcbiAgfSk7XG5cbiAgLy8gTG9jYWwgVmlkZW9zXG5cbiAgJCgnc2VjdGlvbicpLmNsb3Nlc3QoJ2JvZHknKS5maW5kKCcubG9jYWwtdmlkZW8tY29udGFpbmVyIC5wbGF5LWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuc2libGluZ3MoJy5iYWNrZ3JvdW5kLWltYWdlLWhvbGRlcicpLnJlbW92ZUNsYXNzKCdmYWRlSW4nKTtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCcuYmFja2dyb3VuZC1pbWFnZS1ob2xkZXInKS5jc3MoJ3otaW5kZXgnLCAtMSk7XG4gICAgJCh0aGlzKS5jc3MoJ29wYWNpdHknLCAwKTtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCd2aWRlbycpLmdldCgwKS5wbGF5KCk7XG4gIH0pO1xuXG4gIC8vIFlvdXR1YmUgVmlkZW9zXG5cbiAgJCgnc2VjdGlvbicpLmNsb3Nlc3QoJ2JvZHknKS5maW5kKCcucGxheWVyJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgc3JjID0gJCh0aGlzKS5hdHRyKCdkYXRhLXZpZGVvLWlkJyk7XG4gICAgdmFyIHN0YXJ0YXQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc3RhcnQtYXQnKTtcbiAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtcHJvcGVydHknLCBcInt2aWRlb1VSTDonaHR0cDovL3lvdXR1LmJlL1wiICsgc3JjICsgXCInLGNvbnRhaW5tZW50OidzZWxmJyxhdXRvUGxheTp0cnVlLCBtdXRlOnRydWUsIHN0YXJ0QXQ6XCIgKyBzdGFydGF0ICsgXCIsIG9wYWNpdHk6MSwgc2hvd0NvbnRyb2xzOmZhbHNlfVwiKTtcbiAgfSk7XG5cbiAgJCgnc2VjdGlvbicpLmNsb3Nlc3QoJ2JvZHknKS5maW5kKFwiLnBsYXllclwiKS5ZVFBsYXllcigpO1xuXG4gIC8vIEZTIFZpZCBCYWNrZ3JvdW5kXG5cbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICByZXNpemVWaWQoKTtcbiAgfSk7XG5cbiAgLy8gSW50ZXJhY3Qgd2l0aCBNYXAgb25jZSB0aGUgdXNlciBoYXMgY2xpY2tlZCAodG8gcHJldmVudCBzY3JvbGxpbmcgdGhlIHBhZ2UgPSB6b29taW5nIHRoZSBtYXBcblxuICAkKCcubWFwLWhvbGRlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2ludGVyYWN0Jyk7XG4gIH0pO1xuXG4gIC8vICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gIC8vICAgICBpZiAoJCgnLm1hcC1ob2xkZXIuaW50ZXJhY3QnKS5sZW5ndGgpIHtcbiAgLy8gICAgICAgICAkKCcubWFwLWhvbGRlci5pbnRlcmFjdCcpLnJlbW92ZUNsYXNzKCdpbnRlcmFjdCcpO1xuICAvLyAgICAgfVxuICAvLyB9KTtcblxuICAvLyBDb3VudGRvd24gVGltZXJzXG5cbiAgaWYgKCQoJy5jb3VudGRvd24nKS5sZW5ndGgpIHtcbiAgICAkKCcuY291bnRkb3duJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkYXRlID0gJCh0aGlzKS5hdHRyKCdkYXRhLWRhdGUnKTtcbiAgICAgICQodGhpcykuY291bnRkb3duKGRhdGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICQodGhpcykudGV4dChcbiAgICAgICAgICBldmVudC5zdHJmdGltZSgnJUQgZGF5cyAlSDolTTolUycpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENvbnRhY3QgZm9ybSBjb2RlXG5cbiAgJCgnZm9ybS5mb3JtLWVtYWlsLCBmb3JtLmZvcm0tbmV3c2xldHRlcicpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG5cbiAgICAvLyByZXR1cm4gZmFsc2Ugc28gZm9ybSBzdWJtaXRzIHRocm91Z2ggalF1ZXJ5IHJhdGhlciB0aGFuIHJlbG9hZGluZyBwYWdlLlxuICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoJ2Zvcm0uZm9ybS1lbWFpbCwgZm9ybS5mb3JtLW5ld3NsZXR0ZXInKSxcbiAgICAgIGVycm9yID0gMCxcbiAgICAgIG9yaWdpbmFsRXJyb3IgPSB0aGlzRm9ybS5hdHRyKCdvcmlnaW5hbC1lcnJvcicpLFxuICAgICAgbG9hZGluZ1NwaW5uZXIsIGlGcmFtZSwgdXNlckVtYWlsLCB1c2VyRnVsbE5hbWUsIHVzZXJGaXJzdE5hbWUsIHVzZXJMYXN0TmFtZSwgc3VjY2Vzc1JlZGlyZWN0O1xuXG4gICAgLy8gTWFpbGNoaW1wL0NhbXBhaWduIE1vbml0b3IgTWFpbCBMaXN0IEZvcm0gU2NyaXB0c1xuICAgIGlGcmFtZSA9ICQodGhpc0Zvcm0pLmZpbmQoJ2lmcmFtZS5tYWlsLWxpc3QtZm9ybScpO1xuXG4gICAgdGhpc0Zvcm0uZmluZCgnLmZvcm0tZXJyb3IsIC5mb3JtLXN1Y2Nlc3MnKS5yZW1vdmUoKTtcbiAgICB0aGlzRm9ybS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJmb3JtLWVycm9yXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPicgKyB0aGlzRm9ybS5hdHRyKCdkYXRhLWVycm9yJykgKyAnPC9kaXY+Jyk7XG4gICAgdGhpc0Zvcm0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZm9ybS1zdWNjZXNzXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPicgKyB0aGlzRm9ybS5hdHRyKCdkYXRhLXN1Y2Nlc3MnKSArICc8L2Rpdj4nKTtcblxuXG4gICAgaWYgKChpRnJhbWUubGVuZ3RoKSAmJiAodHlwZW9mIGlGcmFtZS5hdHRyKCdzcmNkb2MnKSAhPT0gXCJ1bmRlZmluZWRcIikgJiYgKGlGcmFtZS5hdHRyKCdzcmNkb2MnKSAhPT0gXCJcIikpIHtcblxuICAgICAgY29uc29sZS5sb2coJ01haWwgbGlzdCBmb3JtIHNpZ251cCBkZXRlY3RlZC4nKTtcbiAgICAgIHVzZXJFbWFpbCA9ICQodGhpc0Zvcm0pLmZpbmQoJy5zaWdudXAtZW1haWwtZmllbGQnKS52YWwoKTtcbiAgICAgIHVzZXJGdWxsTmFtZSA9ICQodGhpc0Zvcm0pLmZpbmQoJy5zaWdudXAtbmFtZS1maWVsZCcpLnZhbCgpO1xuICAgICAgaWYgKCQodGhpc0Zvcm0pLmZpbmQoJ2lucHV0LnNpZ251cC1maXJzdC1uYW1lLWZpZWxkJykubGVuZ3RoKSB7XG4gICAgICAgIHVzZXJGaXJzdE5hbWUgPSAkKHRoaXNGb3JtKS5maW5kKCdpbnB1dC5zaWdudXAtZmlyc3QtbmFtZS1maWVsZCcpLnZhbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXNlckZpcnN0TmFtZSA9ICQodGhpc0Zvcm0pLmZpbmQoJy5zaWdudXAtbmFtZS1maWVsZCcpLnZhbCgpO1xuICAgICAgfVxuICAgICAgdXNlckxhc3ROYW1lID0gJCh0aGlzRm9ybSkuZmluZCgnLnNpZ251cC1sYXN0LW5hbWUtZmllbGQnKS52YWwoKTtcblxuICAgICAgLy8gdmFsaWRhdGVGaWVsZHMgcmV0dXJucyAxIG9uIGVycm9yO1xuICAgICAgaWYgKHZhbGlkYXRlRmllbGRzKHRoaXNGb3JtKSAhPT0gMSkge1xuICAgICAgICBjb25zb2xlLmxvZygnTWFpbCBsaXN0IHNpZ251cCBmb3JtIHZhbGlkYXRpb24gcGFzc2VkLicpO1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VyRW1haWwpO1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VyTGFzdE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VyRmlyc3ROYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2codXNlckZ1bGxOYW1lKTtcblxuICAgICAgICBpRnJhbWUuY29udGVudHMoKS5maW5kKCcjbWNlLUVNQUlMLCAjZmllbGRFbWFpbCcpLnZhbCh1c2VyRW1haWwpO1xuICAgICAgICBpRnJhbWUuY29udGVudHMoKS5maW5kKCcjbWNlLUxOQU1FLCAjZmllbGRMYXN0TmFtZScpLnZhbCh1c2VyTGFzdE5hbWUpO1xuICAgICAgICBpRnJhbWUuY29udGVudHMoKS5maW5kKCcjbWNlLUZOQU1FLCAjZmllbGRGaXJzdE5hbWUnKS52YWwodXNlckZpcnN0TmFtZSk7XG4gICAgICAgIGlGcmFtZS5jb250ZW50cygpLmZpbmQoJyNtY2UtTkFNRSwgI2ZpZWxkTmFtZScpLnZhbCh1c2VyRnVsbE5hbWUpO1xuICAgICAgICBpRnJhbWUuY29udGVudHMoKS5maW5kKCdmb3JtJykuYXR0cigndGFyZ2V0JywgJ19ibGFuaycpLnN1Ym1pdCgpO1xuICAgICAgICBzdWNjZXNzUmVkaXJlY3QgPSB0aGlzRm9ybS5hdHRyKCdzdWNjZXNzLXJlZGlyZWN0Jyk7XG4gICAgICAgIC8vIEZvciBzb21lIGJyb3dzZXJzLCBpZiBlbXB0eSBgc3VjY2Vzc1JlZGlyZWN0YCBpcyB1bmRlZmluZWQ7IGZvciBvdGhlcnMsXG4gICAgICAgIC8vIGBzdWNjZXNzUmVkaXJlY3RgIGlzIGZhbHNlLiAgQ2hlY2sgZm9yIGJvdGguXG4gICAgICAgIGlmICh0eXBlb2Ygc3VjY2Vzc1JlZGlyZWN0ICE9PSB0eXBlb2YgdW5kZWZpbmVkICYmIHN1Y2Nlc3NSZWRpcmVjdCAhPT0gZmFsc2UgJiYgc3VjY2Vzc1JlZGlyZWN0ICE9PSBcIlwiKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gc3VjY2Vzc1JlZGlyZWN0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzRm9ybS5maW5kKCcuZm9ybS1lcnJvcicpLmZhZGVJbigxMDAwKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzRm9ybS5maW5kKCcuZm9ybS1lcnJvcicpLmZhZGVPdXQoNTAwKTtcbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTZW5kIGVtYWlsIGZvcm0gZGV0ZWN0ZWQuJyk7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsRXJyb3IgIT09IHR5cGVvZiB1bmRlZmluZWQgJiYgb3JpZ2luYWxFcnJvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpc0Zvcm0uZmluZCgnLmZvcm0tZXJyb3InKS50ZXh0KG9yaWdpbmFsRXJyb3IpO1xuICAgICAgfVxuXG5cbiAgICAgIGVycm9yID0gdmFsaWRhdGVGaWVsZHModGhpc0Zvcm0pO1xuXG5cbiAgICAgIGlmIChlcnJvciA9PT0gMSkge1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJ2Zvcm0nKS5maW5kKCcuZm9ybS1lcnJvcicpLmZhZGVJbigyMDApO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpc0Zvcm0pLmZpbmQoJy5mb3JtLWVycm9yJykuZmFkZU91dCg1MDApO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEhpZGUgdGhlIGVycm9yIGlmIG9uZSB3YXMgc2hvd25cbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCdmb3JtJykuZmluZCgnLmZvcm0tZXJyb3InKS5mYWRlT3V0KDIwMCk7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBsb2FkaW5nIHNwaW5uZXIgd2hpbGUgaGlkaW5nIHRoZSBzdWJtaXQgYnV0dG9uLlxuICAgICAgICBsb2FkaW5nU3Bpbm5lciA9IGpRdWVyeSgnPGRpdiAvPicpLmFkZENsYXNzKCdmb3JtLWxvYWRpbmcnKS5pbnNlcnRBZnRlcigkKHRoaXNGb3JtKS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJykpO1xuICAgICAgICAkKHRoaXNGb3JtKS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJykuaGlkZSgpO1xuXG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IFwibWFpbC9tYWlsLnBocFwiLFxuICAgICAgICAgIGRhdGE6IHRoaXNGb3JtLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBTd2lmdG1haWxlciBhbHdheXMgc2VuZHMgYmFjayBhIG51bWJlciByZXByZXNlbnRpbmcgbnVtbmVyIG9mIGVtYWlscyBzZW50LlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBudW1lcmljIChub3QgU3dpZnQgTWFpbGVyIGVycm9yIHRleHQpIEFORCBncmVhdGVyIHRoYW4gMCB0aGVuIHNob3cgc3VjY2VzcyBtZXNzYWdlLlxuICAgICAgICAgICAgJCh0aGlzRm9ybSkuZmluZCgnLmZvcm0tbG9hZGluZycpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBzdWNjZXNzUmVkaXJlY3QgPSB0aGlzRm9ybS5hdHRyKCdzdWNjZXNzLXJlZGlyZWN0Jyk7XG4gICAgICAgICAgICAvLyBGb3Igc29tZSBicm93c2VycywgaWYgZW1wdHkgYHN1Y2Nlc3NSZWRpcmVjdGAgaXMgdW5kZWZpbmVkOyBmb3Igb3RoZXJzLFxuICAgICAgICAgICAgLy8gYHN1Y2Nlc3NSZWRpcmVjdGAgaXMgZmFsc2UuICBDaGVjayBmb3IgYm90aC5cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3VjY2Vzc1JlZGlyZWN0ICE9PSB0eXBlb2YgdW5kZWZpbmVkICYmIHN1Y2Nlc3NSZWRpcmVjdCAhPT0gZmFsc2UgJiYgc3VjY2Vzc1JlZGlyZWN0ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHN1Y2Nlc3NSZWRpcmVjdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCh0aGlzRm9ybSkuZmluZCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLnNob3coKTtcbiAgICAgICAgICAgIGlmICgkLmlzTnVtZXJpYyhyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHJlc3BvbnNlKSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzRm9ybS5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzRm9ybS5maW5kKCd0ZXh0YXJlYScpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzRm9ybS5maW5kKCcuZm9ybS1zdWNjZXNzJykuZmFkZUluKDEwMDApO1xuXG4gICAgICAgICAgICAgICAgdGhpc0Zvcm0uZmluZCgnLmZvcm0tZXJyb3InKS5mYWRlT3V0KDEwMDApO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzRm9ybS5maW5kKCcuZm9ybS1zdWNjZXNzJykuZmFkZU91dCg1MDApO1xuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBlcnJvciB0ZXh0IHdhcyByZXR1cm5lZCwgcHV0IHRoZSB0ZXh0IGluIHRoZSAuZm9ybS1lcnJvciBkaXYgYW5kIHNob3cgaXQuXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gS2VlcCB0aGUgY3VycmVudCBlcnJvciB0ZXh0IGluIGEgZGF0YSBhdHRyaWJ1dGUgb24gdGhlIGZvcm1cbiAgICAgICAgICAgICAgdGhpc0Zvcm0uZmluZCgnLmZvcm0tZXJyb3InKS5hdHRyKCdvcmlnaW5hbC1lcnJvcicsIHRoaXNGb3JtLmZpbmQoJy5mb3JtLWVycm9yJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3Igd2l0aCB0aGUgcmV0dXJuZWQgZXJyb3IgdGV4dC5cbiAgICAgICAgICAgICAgdGhpc0Zvcm0uZmluZCgnLmZvcm0tZXJyb3InKS50ZXh0KHJlc3BvbnNlKS5mYWRlSW4oMTAwMCk7XG4gICAgICAgICAgICAgIHRoaXNGb3JtLmZpbmQoJy5mb3JtLXN1Y2Nlc3MnKS5mYWRlT3V0KDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yT2JqZWN0LCBlcnJvclRleHQsIGVycm9ySFRUUCkge1xuICAgICAgICAgICAgLy8gS2VlcCB0aGUgY3VycmVudCBlcnJvciB0ZXh0IGluIGEgZGF0YSBhdHRyaWJ1dGUgb24gdGhlIGZvcm1cbiAgICAgICAgICAgIHRoaXNGb3JtLmZpbmQoJy5mb3JtLWVycm9yJykuYXR0cignb3JpZ2luYWwtZXJyb3InLCB0aGlzRm9ybS5maW5kKCcuZm9ybS1lcnJvcicpLnRleHQoKSk7XG4gICAgICAgICAgICAvLyBTaG93IHRoZSBlcnJvciB3aXRoIHRoZSByZXR1cm5lZCBlcnJvciB0ZXh0LlxuICAgICAgICAgICAgdGhpc0Zvcm0uZmluZCgnLmZvcm0tZXJyb3InKS50ZXh0KGVycm9ySFRUUCkuZmFkZUluKDEwMDApO1xuICAgICAgICAgICAgdGhpc0Zvcm0uZmluZCgnLmZvcm0tc3VjY2VzcycpLmZhZGVPdXQoMTAwMCk7XG4gICAgICAgICAgICAkKHRoaXNGb3JtKS5maW5kKCcuZm9ybS1sb2FkaW5nJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKHRoaXNGb3JtKS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJykuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG5cbiAgJCgnLnZhbGlkYXRlLXJlcXVpcmVkLCAudmFsaWRhdGUtZW1haWwnKS5vbignYmx1ciBjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YWxpZGF0ZUZpZWxkcygkKHRoaXMpLmNsb3Nlc3QoJ2Zvcm0nKSk7XG4gIH0pO1xuXG4gICQoJ2Zvcm0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLmZpbmQoJy5mb3JtLWVycm9yJykubGVuZ3RoKSB7XG4gICAgICAkKHRoaXMpLmF0dHIoJ29yaWdpbmFsLWVycm9yJywgJCh0aGlzKS5maW5kKCcuZm9ybS1lcnJvcicpLnRleHQoKSk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZUZpZWxkcyhmb3JtKSB7XG4gICAgdmFyIG5hbWUsIGVycm9yLCBvcmlnaW5hbEVycm9yTWVzc2FnZTtcblxuICAgICQoZm9ybSkuZmluZCgnLnZhbGlkYXRlLXJlcXVpcmVkW3R5cGU9XCJjaGVja2JveFwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoISQoJ1tuYW1lPVwiJyArICQodGhpcykuYXR0cignbmFtZScpICsgJ1wiXTpjaGVja2VkJykubGVuZ3RoKSB7XG4gICAgICAgIGVycm9yID0gMTtcbiAgICAgICAgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpLnJlcGxhY2UoJ1tdJywgJycpO1xuICAgICAgICBmb3JtLmZpbmQoJy5mb3JtLWVycm9yJykudGV4dCgnUGxlYXNlIHRpY2sgYXQgbGVhc3Qgb25lICcgKyBuYW1lICsgJyBib3guJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGZvcm0pLmZpbmQoJy52YWxpZGF0ZS1yZXF1aXJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZmllbGQtZXJyb3InKTtcbiAgICAgICAgZXJyb3IgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmllbGQtZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZm9ybSkuZmluZCgnLnZhbGlkYXRlLWVtYWlsJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGlmICghKC8oLispQCguKyl7Mix9XFwuKC4rKXsyLH0vLnRlc3QoJCh0aGlzKS52YWwoKSkpKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ZpZWxkLWVycm9yJyk7XG4gICAgICAgIGVycm9yID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZpZWxkLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWZvcm0uZmluZCgnLmZpZWxkLWVycm9yJykubGVuZ3RoKSB7XG4gICAgICBmb3JtLmZpbmQoJy5mb3JtLWVycm9yJykuZmFkZU91dCgxMDAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbiAgLy8gRW5kIGNvbnRhY3QgZm9ybSBjb2RlXG5cbiAgLy8gR2V0IHJlZmVycmVyIGZyb20gVVJMIHN0cmluZ1xuICBpZiAoZ2V0VVJMUGFyYW1ldGVyKFwicmVmXCIpKSB7XG4gICAgJCgnZm9ybS5mb3JtLWVtYWlsJykuYXBwZW5kKCc8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVmZXJyZXJcIiBjbGFzcz1cImhpZGRlblwiIHZhbHVlPVwiJyArIGdldFVSTFBhcmFtZXRlcihcInJlZlwiKSArICdcIi8+Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRVUkxQYXJhbWV0ZXIobmFtZSkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoKG5ldyBSZWdFeHAoJ1s/fCZdJyArIG5hbWUgKyAnPScgKyAnKFteJjtdKz8pKCZ8I3w7fCQpJykuZXhlYyhsb2NhdGlvbi5zZWFyY2gpIHx8IFssIFwiXCJdKVsxXS5yZXBsYWNlKC9cXCsvZywgJyUyMCcpKSB8fCBudWxsO1xuICB9XG5cbiAgLy8gRGlzYWJsZSBwYXJhbGxheCBvbiBtb2JpbGVcblxuICBpZiAoKC9BbmRyb2lkfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxXaW5kb3dzIFBob25lL2kpLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvdy5vcGVyYSkpIHtcbiAgICAkKCdzZWN0aW9uJykucmVtb3ZlQ2xhc3MoJ3BhcmFsbGF4Jyk7XG4gIH1cblxuICAvLyBEaXNxdXMgQ29tbWVudHNcblxuICBpZiAoJCgnLmRpc3F1cy1jb21tZW50cycpLmxlbmd0aCkge1xuICAgIC8qICogKiBDT05GSUdVUkFUSU9OIFZBUklBQkxFUyAqICogKi9cbiAgICB2YXIgZGlzcXVzX3Nob3J0bmFtZSA9ICQoJy5kaXNxdXMtY29tbWVudHMnKS5hdHRyKCdkYXRhLXNob3J0bmFtZScpO1xuXG4gICAgLyogKiAqIERPTidUIEVESVQgQkVMT1cgVEhJUyBMSU5FICogKiAqL1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkc3EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIGRzcS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICBkc3EuYXN5bmMgPSB0cnVlO1xuICAgICAgZHNxLnNyYyA9ICcvLycgKyBkaXNxdXNfc2hvcnRuYW1lICsgJy5kaXNxdXMuY29tL2VtYmVkLmpzJztcbiAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0pLmFwcGVuZENoaWxkKGRzcSk7XG4gICAgfSkoKTtcbiAgfVxuXG59KTtcblxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIEluaXRpYWxpemUgTWFzb25yeVxuXG4gIC8vIGlmICgkKCcubWFzb25yeScpLmxlbmd0aCkge1xuICAvLyAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXNvbnJ5Jyk7XG4gIC8vICAgICB2YXIgbXNucnkgPSBuZXcgTWFzb25yeShjb250YWluZXIsIHtcbiAgLy8gICAgICAgICBpdGVtU2VsZWN0b3I6ICcubWFzb25yeS1pdGVtJ1xuICAvLyAgICAgfSk7XG5cbiAgLy8gICAgIG1zbnJ5Lm9uKCdsYXlvdXRDb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuXG4gIC8vICAgICAgICAgbXJfZmlyc3RTZWN0aW9uSGVpZ2h0ID0gJCgnLm1haW4tY29udGFpbmVyIHNlY3Rpb246bnRoLW9mLXR5cGUoMSknKS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAvLyAgICAgICAgIC8vIEZpeCBmbG9hdGluZyBwcm9qZWN0IGZpbHRlcnMgdG8gYm90dG9tIG9mIHByb2plY3RzIGNvbnRhaW5lclxuXG4gIC8vICAgICAgICAgaWYgKCQoJy5maWx0ZXJzLmZsb2F0aW5nJykubGVuZ3RoKSB7XG4gIC8vICAgICAgICAgICAgIHNldHVwRmxvYXRpbmdQcm9qZWN0RmlsdGVycygpO1xuICAvLyAgICAgICAgICAgICB1cGRhdGVGbG9hdGluZ0ZpbHRlcnMoKTtcbiAgLy8gICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdXBkYXRlRmxvYXRpbmdGaWx0ZXJzLCBmYWxzZSk7XG4gIC8vICAgICAgICAgfVxuXG4gIC8vICAgICAgICAgJCgnLm1hc29ucnknKS5hZGRDbGFzcygnZmFkZUluJyk7XG4gIC8vICAgICAgICAgJCgnLm1hc29ucnktbG9hZGVyJykuYWRkQ2xhc3MoJ2ZhZGVPdXQnKTtcbiAgLy8gICAgICAgICBpZiAoJCgnLm1hc29ucnlGbHlJbicpLmxlbmd0aCkge1xuICAvLyAgICAgICAgICAgICBtYXNvbnJ5Rmx5SW4oKTtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgbXNucnkubGF5b3V0KCk7XG4gIC8vIH1cblxuICAvLyBJbml0aWFsaXplIHR3aXR0ZXIgZmVlZFxuXG4gIHZhciBzZXRVcFR3ZWV0cyA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKCcudHdlZXRzLXNsaWRlcicpLmZpbmQoJ2xpLmZsZXgtYWN0aXZlLXNsaWRlJykubGVuZ3RoKSB7XG4gICAgICBjbGVhckludGVydmFsKHNldFVwVHdlZXRzKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCQoJy50d2VldHMtc2xpZGVyJykubGVuZ3RoKSB7XG4gICAgICAgICQoJy50d2VldHMtc2xpZGVyJykuZmxleHNsaWRlcih7XG4gICAgICAgICAgZGlyZWN0aW9uTmF2OiBmYWxzZSxcbiAgICAgICAgICBjb250cm9sTmF2OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIDUwMCk7XG5cbiAgbXJfZmlyc3RTZWN0aW9uSGVpZ2h0ID0gJCgnLm1haW4tY29udGFpbmVyIHNlY3Rpb246bnRoLW9mLXR5cGUoMSknKS5vdXRlckhlaWdodCh0cnVlKTtcblxufSk7XG5cbiQoJ2RvY3VtZW50JykucmVhZHkoZnVuY3Rpb24oKSB7XG4gIHJlc2l6ZVZpZCgpO1xufSlcblxuZnVuY3Rpb24gcHJlcGN0YSgpIHtcbiAgY29uc29sZS5sb2coZG9jdW1lbnQuYm9keSk7XG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3aXN0aWFfZW1iZWQnKTtcbiAgY29uc29sZS5sb2coaWZyYW1lKTtcbiAgdmFyIGlubmVyRG9jID0gaWZyYW1lLmNvbnRlbnREb2N1bWVudCB8fCBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgY29uc29sZS5sb2coaW5uZXJEb2Mub25lbmRlZCk7XG4gIHZhciB2aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpc3RpYV8xNFwiKTtcbiAgdmlkLm9uZW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICBhbGVydChcIlN0YXJ0aW5nIHRvIGxvYWQgdmlkZW9cIik7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZVZpZCgpIHtcblxuICAkKCcuZnMtdmlkLWJhY2tncm91bmQgdmlkZW8nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2aWQgPSAkKHRoaXMpO1xuICAgIHZhciByYXRpbyA9ICh2aWQud2lkdGgoKSAvIHZpZC5oZWlnaHQoKSk7XG4gICAgdmFyIHNlY3Rpb24gPSB2aWQuY2xvc2VzdCgnc2VjdGlvbicpO1xuICAgIGlmIChzZWN0aW9uLndpZHRoKCkgPiBzZWN0aW9uLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24ud2lkdGgoKSlcbiAgICAgIHZpZC5jc3MoJ3dpZHRoJywgKHNlY3Rpb24ud2lkdGgoKSAqIHJhdGlvKSAqIC45NSk7XG4gICAgICB2aWQuY3NzKCdtYXJnaW4tbGVmdCcsIC0oKHNlY3Rpb24ud2lkdGgoKSAqIHJhdGlvKSAvIDQpICogLjgpO1xuICAgICAgdmlkLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJURTxcIilcbiAgICAgIHZpZC5jc3MoJ3dpZHRoJywgJ2F1dG8nKTtcbiAgICAgIHZpZC5jc3MoJ2hlaWdodCcsIChzZWN0aW9uLm91dGVySGVpZ2h0KCkgKiByYXRpbykpO1xuICAgICAgdmlkLmNzcygnbWFyZ2luLWxlZnQnLCAnMCcpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gZGV0ZWN0bW9iKCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gOTk3KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5hdigpIHtcblxuICB2YXIgc2Nyb2xsWSA9IG1yX3Njcm9sbFRvcDtcblxuICBpZiAoc2Nyb2xsWSA8PSAwKSB7XG4gICAgaWYgKG1yX25hdkZpeGVkKSB7XG4gICAgICBtcl9uYXZGaXhlZCA9IGZhbHNlO1xuICAgICAgbXJfbmF2LnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgIH1cbiAgICBpZiAobXJfb3V0T2ZTaWdodCkge1xuICAgICAgbXJfb3V0T2ZTaWdodCA9IGZhbHNlO1xuICAgICAgbXJfbmF2LnJlbW92ZUNsYXNzKCdvdXRPZlNpZ2h0Jyk7XG4gICAgfVxuICAgIGlmIChtcl9uYXZTY3JvbGxlZCkge1xuICAgICAgbXJfbmF2U2Nyb2xsZWQgPSBmYWxzZTtcbiAgICAgIG1yX25hdi5yZW1vdmVDbGFzcygnc2Nyb2xsZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHNjcm9sbFkgPiBtcl9maXJzdFNlY3Rpb25IZWlnaHQpIHtcbiAgICBpZiAoIW1yX25hdlNjcm9sbGVkKSB7XG4gICAgICBtcl9uYXYuYWRkQ2xhc3MoJ3Njcm9sbGVkJyk7XG4gICAgICBtcl9uYXZTY3JvbGxlZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChzY3JvbGxZID4gbXJfbmF2T3V0ZXJIZWlnaHQpIHtcbiAgICAgIGlmICghbXJfbmF2Rml4ZWQgJiYgIW1vYmlsZSkge1xuICAgICAgICBtcl9uYXYuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgIG1yX25hdkZpeGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbFkgPiBtcl9uYXZPdXRlckhlaWdodCAqIDIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGRkZGRlwiKTtcbiAgICAgICAgaWYgKCFtcl9vdXRPZlNpZ2h0ICYmICFtb2JpbGUpIHtcbiAgICAgICAgICBtcl9uYXYuYWRkQ2xhc3MoJ291dE9mU2lnaHQnKTtcbiAgICAgICAgICBtcl9vdXRPZlNpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1yX291dE9mU2lnaHQpIHtcbiAgICAgICAgICBtcl9vdXRPZlNpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgbXJfbmF2LnJlbW92ZUNsYXNzKCdvdXRPZlNpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1yX25hdkZpeGVkKSB7XG4gICAgICAgIG1yX25hdkZpeGVkID0gZmFsc2U7XG4gICAgICAgIG1yX25hdi5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChtcl9vdXRPZlNpZ2h0KSB7XG4gICAgICAgIG1yX291dE9mU2lnaHQgPSBmYWxzZTtcbiAgICAgICAgbXJfbmF2LnJlbW92ZUNsYXNzKCdvdXRPZlNpZ2h0Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1yX25hdlNjcm9sbGVkKSB7XG4gICAgICBtcl9uYXZTY3JvbGxlZCA9IGZhbHNlO1xuICAgICAgbXJfbmF2LnJlbW92ZUNsYXNzKCdzY3JvbGxlZCcpO1xuICAgIH1cblxuICB9XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpc2VGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cblxuLy8gZnVuY3Rpb24gbWFzb25yeUZseUluKCkge1xuLy8gICAgIHZhciAkaXRlbXMgPSAkKCcubWFzb25yeUZseUluIC5tYXNvbnJ5LWl0ZW0nKTtcbi8vICAgICB2YXIgdGltZSA9IDA7XG5cbi8vICAgICAkaXRlbXMuZWFjaChmdW5jdGlvbigpIHtcbi8vICAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpO1xuLy8gICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnZmFkZUluJyk7XG4vLyAgICAgICAgIH0sIHRpbWUpO1xuLy8gICAgICAgICB0aW1lICs9IDE3MDtcbi8vICAgICB9KTtcbi8vIH1cblxuZnVuY3Rpb24gc2V0dXBGbG9hdGluZ1Byb2plY3RGaWx0ZXJzKCkge1xuICBtcl9mbG9hdGluZ1Byb2plY3RTZWN0aW9ucyA9IFtdO1xuICAkKCcuZmlsdGVycy5mbG9hdGluZycpLmNsb3Nlc3QoJ3NlY3Rpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWN0aW9uID0gJCh0aGlzKTtcblxuICAgIG1yX2Zsb2F0aW5nUHJvamVjdFNlY3Rpb25zLnB1c2goe1xuICAgICAgc2VjdGlvbjogc2VjdGlvbi5nZXQoMCksXG4gICAgICBvdXRlckhlaWdodDogc2VjdGlvbi5vdXRlckhlaWdodCgpLFxuICAgICAgZWxlbVRvcDogc2VjdGlvbi5vZmZzZXQoKS50b3AsXG4gICAgICBlbGVtQm90dG9tOiBzZWN0aW9uLm9mZnNldCgpLnRvcCArIHNlY3Rpb24ub3V0ZXJIZWlnaHQoKSxcbiAgICAgIGZpbHRlcnM6IHNlY3Rpb24uZmluZCgnLmZpbHRlcnMuZmxvYXRpbmcnKSxcbiAgICAgIGZpbGVyc0hlaWdodDogc2VjdGlvbi5maW5kKCcuZmlsdGVycy5mbG9hdGluZycpLm91dGVySGVpZ2h0KHRydWUpXG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGbG9hdGluZ0ZpbHRlcnMoKSB7XG4gIHZhciBsID0gbXJfZmxvYXRpbmdQcm9qZWN0U2VjdGlvbnMubGVuZ3RoO1xuICB3aGlsZSAobC0tKSB7XG4gICAgdmFyIHNlY3Rpb24gPSBtcl9mbG9hdGluZ1Byb2plY3RTZWN0aW9uc1tsXTtcblxuICAgIGlmIChzZWN0aW9uLmVsZW1Ub3AgPCBtcl9zY3JvbGxUb3ApIHtcbiAgICAgIHNlY3Rpb24uZmlsdGVycy5jc3Moe1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAnMTZweCcsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nXG4gICAgICB9KTtcbiAgICAgIGlmIChtcl9uYXZTY3JvbGxlZCkge1xuICAgICAgICBzZWN0aW9uLmZpbHRlcnMuY3NzKHtcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLDQ4cHgsMCknXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKG1yX3Njcm9sbFRvcCA+IChzZWN0aW9uLmVsZW1Cb3R0b20gLSA3MCkpIHtcbiAgICAgICAgc2VjdGlvbi5maWx0ZXJzLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgYm90dG9tOiAnMTZweCcsXG4gICAgICAgICAgdG9wOiAnYXV0bydcbiAgICAgICAgfSk7XG4gICAgICAgIHNlY3Rpb24uZmlsdGVycy5jc3Moe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsMCwwKSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY3Rpb24uZmlsdGVycy5jc3Moe1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwwLDApJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=
