angular.module('openboiler').controller('HomeController', ['$scope', '$filter', 'ApiService', function ($scope, $filter, ApiService) {
    $scope.weatherData = {};
    $scope.targetTemperature = 20;
    $scope.isManual = false;

    ApiService.getWeather(function (data) {
        $scope.weatherData = data.data;
    });

    ApiService.getActiveProfile(function (data) {
        if(data.data.resetTime) {
            $scope.targetTemperature = data.data.temp;
            isManual = true;
        }
    });

    $scope.formatDate = function () {
        var date = new Date();

        return $filter('date')(date, 'EEEE dd MMMM yyyy');
    };


    $scope.setTemperature = function (newTemp) {
        if(newTemp > 6 && newTemp < 35) {
            $scope.targetTemperature = newTemp;
        }
    };

    $scope.override = function () {
        $scope.isManual = true;
    };

    $scope.stopOverride = function () {
        $scope.isManual = false;
    }
}]);