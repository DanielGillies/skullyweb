if (window.mobilecheck()) {
    $("#presspacket-background").css("background", "url('/static/img/presslowerbg.jpg')");
    $("#presspacket-image").attr("src", "/static/img/presslowerbg.jpg")
}

var contactform = document.getElementById('contactform');
contactform.setAttribute('action', '//formspree.io/' + 'pr' + '@' + 'skully' + '.' + 'com');

$("document").ready(function() {
    $(".mason").click(function() {
        window.open($(this).find("a").attr("href"), "_blank");
        return false;
    });

    $(".project").click(function() {
        window.open($(this).find("a").attr("href"), "_blank");
        return false;
    });
});
require('./lazyload')
