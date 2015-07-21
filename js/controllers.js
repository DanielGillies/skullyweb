app.controller('NavController', function($scope, $location) {

    $scope.navGoTo = function(page) {
        $location.path(page);
        console.log(page);
    }
    
});