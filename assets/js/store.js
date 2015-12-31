var origSize = $("input[type='radio'][name='size']:checked");
var origColor = $("input[type='radio'][name='color']:checked");
var selectedSize = origSize;
var selectedColor = origColor;
$("#" + selectedColor.val() + "-" + selectedSize.val()).removeClass('shopify-button');


$("input[name='size']:radio").change(function() {
    origSize = selectedSize;
    origColor = selectedColor;
    selectedSize = $("input[type='radio'][name='size']:checked");
    selectedColor = $("input[type='radio'][name='color']:checked");
    $("#" + origColor.val() + "-" + origSize.val()).addClass('shopify-button');
    $("#" + selectedColor.val() + "-" + selectedSize.val()).removeClass('shopify-button');
});

$("input[name='color']:radio").change(function() {
    origSize = selectedSize;
    origColor = selectedColor;
    selectedSize = $("input[type='radio'][name='size']:checked");
    selectedColor = $("input[type='radio'][name='color']:checked");
    $("#" + origColor.val() + "-" + origSize.val()).addClass('shopify-button');
    $("#" + selectedColor.val() + "-" + selectedSize.val()).removeClass('shopify-button');

    if ($('input[name=color]:checked').attr('id') == 'black') {
        $('#helmet_img').fadeOut(200, function() {
            $('#helmet_img').attr('src', 'static/img/blackhelmet_store.jpg');
        }).fadeIn(200);
    } else {
        $('#helmet_img').fadeOut(200, function() {
            $('#helmet_img').attr('src', 'static/img/whitehelmet_store.jpg');
        }).fadeIn(200);
    }

});
require('./lazyload')
