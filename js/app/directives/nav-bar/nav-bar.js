// Template for navigation bar
app.directive('navBar', function() {
    return {
      templateUrl: 'js/app/directives/nav-bar/nav-bar.html'
    };
});

//  // Mobile Menu
//     $('.mobile-toggle').click(function() {
//         console.log("FFFFFF");
//         $('.nav-bar').toggleClass('nav-open');
//         $(this).toggleClass('active');
//     });

//     $('.menu li').click(function(e) {
//         if (!e) e = window.event;
//         e.stopPropagation();
//         if ($(this).find('ul').length) {
//             $(this).toggleClass('toggle-sub');
//         } else {
//             $(this).parents('.toggle-sub').removeClass('toggle-sub');
//         }
//     });

//     $('.module.widget-handle').click(function() {
//         $(this).toggleClass('toggle-widget-handle');
//     });