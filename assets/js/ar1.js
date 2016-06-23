

function test() {
    if (count < 5) {
        console.log($(".explosive-active")[0] + " STARTED")
        document.getElementsByClassName("explosive-active")[0].addEventListener('ended', function() {
            console.log($(".explosive-active")[0] + " ENDED")
            nextExplosion();
        })
    }
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

window.goToExplosion = goToExplosion;
var hudPlaying = 0;
var count = 1;
var inExplosive = false;
var forwards = true;


if (window.mobilecheck()) {
    $("footer").css("display", "none");
} else {
    document.getElementById("explosive").innerHTML =
        ' <div id="explosive-previous-holder"> <a id="explosive-previous" onclick="prevExplosion()"> <i class="icon-uparrow icon-md"></i> </a> </div> <div id="explosive-next-holder"> <a id="explosive-next" onclick="nextExplosion()"> <i class="icon-downarrow icon-md"></i> </a> </div> <video id="explosive-vid1" class="explosive-active"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.mp4" type="video/mp4"> </video> <video id="explosive-vid2"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.mp4" type="video/mp4"> </video> <video id="explosive-vid3"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.mp4" type="video/mp4"> </video> <video id="explosive-vid4"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.mp4" type="video/mp4"> </video> <video id="explosive-vid5"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.mp4" type="video/mp4"> </video> <video id="explosive-vid1b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid2b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid3b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid4b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid5b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.mp4" type="video/mp4"> </video>'


    document.getElementById("hud").innerHTML = '<video id="hudvid" muted style="height:100%; position:absolute; right: 0; top: 0;"> <source id="hudwebm" class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.webm" type="video/webm"> <source id="hudmp4" class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.mp4" type="video/mp4"> <source id="hudogv" class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/HUD1.ogv" type="video/ogv"> </video> <div class="container" id="hudtext"> <div id="hudheader" class="mb56 row"> <div class="col-md-12"> <h2 class="xbold uppercase">360&deg; Awareness, <br>Every Second</h2> </div> </div> <div class="hudbody row"> <div class="col-md-4"> <h5 class="uppercase xbold"> <i class="icon-HUD_3 icon-sm2"></i> Heads-Up Display</h5> <p class="subheader">Always in focus and floating <br>right in front of you.</p> <hr> </div> </div> <div class="hudbody row"> <div class="col-md-4"> <h5 class="uppercase xbold"> <i class="icon-blindspot_w2 icon-sm2"></i> 180° Blindspot Camera</h5> <p class="subheader">Ultra-wide to show you more <br> than conventional mirrors.</p> <hr> </div> </div> <div class="mb32" id="hudbuttons"> <a class="btn btn-hud active-hud" onclick="swapHUD()"></a> <a class="btn btn-hud" onclick="swapHUD()"></a> </div> </div> <div class="container" id="hudtext2"> <div class="row mb56"> <div class="col-md-12"> <h2 class="xbold uppercase">Vital, Real-time Data <br> at a Glance</h2> </div> </div> <div class="row"> <div class="col-md-4"> <h5 class="xbold uppercase"> <i class="icon-mph_w2 icon-sm2"></i> Speed</h5> <p class="subheader">Instantly glanceable MPH in <br>your Heads-Up Display. </p> <hr> </div> </div> <div class="row"> <div class="col-md-4"> <h5 class="bold uppercase"> <i class="icon-checktech_w2 icon-sm2"></i> Turn-by-Turn GPS</h5> <p class="subheader">Audio and visual navigation <br>when you need it.</p> <hr> </div> </div> <a class="btn btn-hud" onclick="swapHUD()"></a> <a class="btn btn-hud active-hud" onclick="swapHUD()"></a> </div>'

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
require('./lazyload')