angular.module('openboiler').controller('MainController', ['$scope', '$location', 'WebSocketService', 'ApiService', function ($scope, $location, WebSocketService, ApiService) {
    
    $scope.changeView = function(view) {
        $location.path(view);
    }
    
    $scope.profiles = [];
    
    $scope.sensorData = {"temp":"--","humidity":"--"};
    
    function setSensorData(data) {
        $scope.sensorData = data;
        $scope.$apply();
    };
    
    function setProfiles(data) {
        $scope.profiles = data;
    }
    
    WebSocketService.init(setSensorData);
    
    ApiService.initProfiles(setProfiles);
}]);