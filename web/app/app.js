angular.module('openboiler', ['ngRoute']);

angular.module('openboiler').config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		controller: 'HomeController',
		templateUrl: 'views/home/home.html'
	}).otherwise({
		redirectTo: '/'
	});
}]);