angular.module('openboiler').factory('ApiService', [ '$http', function($http) {
    var service = {};
    
    service.initProfiles = function(callback) {
        $http({
            url: 'http://192.168.1.180:8081/profiles',
            method: 'GET',
            headers: {
                'Content-Type': undefined
            },
            data: {

            }
        }).then(function(response) {
            callback(response.data);
        }, function(response) {
            console.log('API profiles request failed', response);
        });
    };
    
    return service;
}]);