angular.module('openboiler', ['ngRoute']);

angular.module('openboiler').config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		controller: 'HomeController',
		templateUrl: 'views/home/home.html'
	}).when('/profiles', {
		controller: 'ProfilesController',
		templateUrl: 'views/profiles/profiles.html'
	}).otherwise({
		redirectTo: '/'
	});
}]);

angular.module('openboiler').constant('WebApiUrl', 'http://192.168.1.5:8081');
angular.module('openboiler').constant('WebSocketUrl', 'ws://192.168.1.5:8082');