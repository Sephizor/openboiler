angular.module('openboiler').controller('MainController', ['$scope', '$location', 'WebSocketsService', 'ApiService', function ($scope, $location, WebSocketsService, ApiService) {
    
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
    
    WebSocketsService.init(setSensorData);
    
    ApiService.initProfiles(setProfiles);
}]);