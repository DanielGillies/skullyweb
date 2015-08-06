app.controller('NavController', function($scope, $location, $route, $state) {

$scope.onFormSubmit = function () {
    $state.href('/cart');
}
    
});