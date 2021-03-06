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
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

/** Document Ready Functions **/
/********************************************************************/

$(document).ready(function() {

    // Resive video
    scaleVideoContainer();

    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container video');
    });

});

/** Reusable Functions **/
/********************************************************************/
function scaleVideoContainer() {

    var height = $(window).height();
    var unitHeight = parseInt(height) + 'px';
    $('.video-background').css('height', unitHeight);

}

function initBannerVideoSize(element) {

    $(element).each(function() {
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element) {

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
            $(this).css({
                'margin-top': 0,
                'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
            });
        }

        $(this).width(videoWidth).height(videoHeight);

        $('.video-background .video-container video').addClass('fadeIn animated');


    });
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

    var handleTweets = function(tweets) {
      console.log('handling tweets...');
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
    };

    var config = {
      "id": '623173244095303680',
      "domId": 'tweets-0',
      "maxTweets": 5,
      "showUser": true,
      "enableLinks": true,
      // "showImages" : true,
      "showPermalinks": false,
      "customCallback": handleTweets
    };

    //twitterFetcher.fetch($('#tweets-' + index).attr('data-widget-id'), '', 5, true, true, true, '', false, handleTweets);
    twitterFetcher.fetch(config);

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
      max: 12
    });
  });
  
  // Local Videos

  $('section').closest('body').find('.local-video-container .play-button').click(function() {
    $(this).siblings('.background-image-holder').removeClass('fadeIn');
    $(this).siblings('.background-image-holder').css('z-index', -1);
    $(this).css('opacity', 0);
    $(this).siblings('video').get(0).play();
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

// $('document').ready(function() {
//   resizeVid();
// })

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

// function resizeVid() {

//   $('.fs-vid-background video').each(function() {
//     var vid = $(this);
//     var ratio = (vid.width() / vid.height());
//     var section = vid.closest('section');
//     if (section.width() > section.outerHeight()) {
//       vid.css('width', (section.width() * ratio) * .95);
//       vid.css('margin-left', -((section.width() * ratio) / 4) * .8);
//       vid.css('height', 'auto');
//     } else {
//       vid.css('width', 'auto');
//       vid.css('height', (section.outerHeight() * ratio));
//       vid.css('margin-left', '0');
//     }
//   });
// }

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

function greedyJumbotron() {
    var HEIGHT_CHANGE_TOLERANCE = 100; // Approximately URL bar height in Chrome on tablet

    var jumbotron = $(this);
    var viewportHeight = $(window).height();

    $(window).resize(function () {
        if (Math.abs(viewportHeight - $(window).height()) > HEIGHT_CHANGE_TOLERANCE) {
            viewportHeight = $(window).height();
            update();
        }
    });

    function update() {
        jumbotron.css('min-height', viewportHeight + 60 + 'px');
    }

    update();
}

$('.fullheight').each(greedyJumbotron);
