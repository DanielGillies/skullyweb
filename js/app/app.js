var app = angular
.module("SkullySite", ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html'
      })
      .when('/app', {
      	templateUrl: 'home-app-landing.html'
      })
      .when('/about', {
      	templateUrl: 'page-about-us-3.html'
      })
      .when('/careers', {
      	templateUrl: 'page-about-us-2.html'
      })
      .when('/news', {
        templateUrl: 'index.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  
  /*
   *  This angular module have been created by @subudeepak(https://github.com/subudeepak) based on the code posted by @endorama (https://github.com/endorama) 
   *  (based upon the code  posted by @olostan (https://github.com/olostan) )
   */
  
  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) 
      {
        if (attr.type==='text/javascript-lazy') 
        {
          var s = document.createElement("script");
          s.type = "text/javascript";                
          var src = elem.attr('src');
          if(src!==undefined)
          {
              s.src = src;
          }
          else
          {
              var code = elem.text();
              s.text = code;
          }
          document.head.appendChild(s);
          elem.remove();
        }
      }
    };
  });