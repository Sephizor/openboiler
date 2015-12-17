angular.module('openboiler').controller('MainController', ['$scope', '$location', function ($scope, $location) {
    $scope.changeView = function(view) {
        $location.path(view);
    }
    $scope.profiles = [];
}]);