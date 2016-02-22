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
        ApiService.overrideTemperature($scope.targetTemperature, 60 * 1000 * 60);
    };

    $scope.stopOverride = function () {
        $scope.isManual = false;
        ApiService.cancelOverride();
    }

    $scope.getWeatherFontClass = function () {
	switch($scope.weatherData.icon) {
	    case "01d":
		return "wi wi-day-sunny";
	    case "02d":
		return "wi wi-day-cloudy";
	    case "03d":
		return "wi wi-cloud";
	    case "04d":
		return "wi wi-cloudy";
	    case "09d":
		return "wi wi-showers";
	    case "10d":
		return "wi wi-day-rain";
	    case "11d":
		return "wi wi-day-lightning";
	    case "13d":
		return "wi wi-day-snow";
	    case "50d":
		return "wi wi-fog";
	    case "01n":
		return "wi wi-night-clear";
	    case "02n":
		return "wi wi-night-cloudy";
	    case "03n":
		return "wi wi-cloud";
	    case "04n":
		return "wi wi-cloudy";
	    case "09n":
		return "wi wi-showers";
	    case "10n":
		return "wi wi-night-rain";
	    case "11n":
		return "wi wi-night-lightning";
	    case "13n":
		return "wi wi-night-snow";
	    case "50n":
		return "wi wi-fog";
	    default:
		return "wi wi-cloud-refresh";
        }
    }
}]);
