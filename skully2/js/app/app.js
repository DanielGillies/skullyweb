// var app = angular.module('SkullySite', ['ui.router']);
// app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//     $urlRouterProvider.otherwise('/');
//     $stateProvider
//         .state('home', {
//             url:'/',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/home.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('app', {
//             url:'/app',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/app.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('about', {
//             url:'/about',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/about.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('careers', {
//             url:'/careers',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/careers.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('support', {
//             url:'/support',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/support.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('videos', {
//             url:'/videos',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/videos.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('faq', {
//             url:'/faq',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/faq.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('404', {
//             url:'/404',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/404.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('confirmation', {
//             url:'/confirmation',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/confirmation.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('register', {
//             url:'/register',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/register.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })

//         // SHOP STATES
//         .state('cart', {
//             url:'/cart',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/cart.html',
//                 controller: "NavController",

//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
//         .state('shophome', {
//             url:'/shop',
//             views: {
//               'navbar': {
//                 templateUrl:'js/app/directives/nav-bar/nav-bar.html',
//               },
//               'content': {
//                 templateUrl:'js/app/partials/shophome.html',
//               },
//               'footer': {
//                 templateUrl:'js/app/directives/foot-bar/foot-bar.html',
//               },
//             }
//         })
// }]);

//   /*
//    *  This angular module have been created by @subudeepak(https://github.com/subudeepak) based on the code posted by @endorama (https://github.com/endorama)
//    *  (based upon the code  posted by @olostan (https://github.com/olostan) )
//    */

//   app.directive('script', function() {
//     return {
//       restrict: 'E',
//       scope: false,
//       link: function(scope, elem, attr)
//       {
//         if (attr.type==='text/javascript-lazy')
//         {
//           var s = document.createElement("script");
//           s.type = "text/javascript";
//           var src = elem.attr('src');
//           if(src!==undefined)
//           {
//               s.src = src;
//           }
//           else
//           {
//               var code = elem.text();
//               s.text = code;
//           }
//           document.head.appendChild(s);
//           elem.remove();
//         }
//       }
//     };
//   });