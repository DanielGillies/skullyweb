

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
var count = 1;
var inExplosive = false;
var forwards = true;

if (window.mobilecheck()) {
  console.log("mobile?")
} else {
    document.getElementById("explosive").innerHTML =
        ' <div id="explosive-previous-holder"> <a id="explosive-previous" onclick="prevExplosion()"> <i class="icon-uparrow icon-md"></i> </a> </div> <div id="explosive-next-holder"> <a id="explosive-next" onclick="nextExplosion()"> <i class="icon-downarrow icon-md"></i> </a> </div> <video id="explosive-vid1" class="explosive-active"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1.mp4" type="video/mp4"> </video> <video id="explosive-vid2"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2.mp4" type="video/mp4"> </video> <video id="explosive-vid3"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3.mp4" type="video/mp4"> </video> <video id="explosive-vid4"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4.mp4" type="video/mp4"> </video> <video id="explosive-vid5"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5.mp4" type="video/mp4"> </video> <video id="explosive-vid1b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive1backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid2b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive2backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid3b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive3backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid4b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive4backwards.mp4" type="video/mp4"> </video> <video id="explosive-vid5b"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.webm" type="video/webm"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.ogv" type="video/ogv"> <source class="lazy" data-src="//dg6vcgn2vehm4.cloudfront.net/videos/Explosive5backwards.mp4" type="video/mp4"> </video>'

    var nextButton = $('#explosive-next');
    var prevButton = $('#explosive-previous');
}
require('./lazyload')