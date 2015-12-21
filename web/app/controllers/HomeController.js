angular.module('openboiler').controller('HomeController', ['$scope', '$filter', function ($scope, $filter) {
	$scope.formatDate = function () {
		var date = new Date();

		return $filter('date')(date, 'EEEE dd MMMM yyyy');
	};
}]);