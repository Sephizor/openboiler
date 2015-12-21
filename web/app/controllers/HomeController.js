angular.module('openboiler').controller('HomeController', ['$scope', '$filter', 'ApiService', function ($scope, $filter, ApiService) {
    $scope.weatherData = {};

    ApiService.getWeather(function (data) {
        $scope.weatherData = data.data;
    });

    $scope.formatDate = function () {
        var date = new Date();

        return $filter('date')(date, 'EEEE dd MMMM yyyy');
    };
}]);