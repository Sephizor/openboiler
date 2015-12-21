angular.module('openboiler').factory('ApiService', [ '$http', function($http) {
    var service = {};
    
    service.initProfiles = function(callback) {
        $http({
            url: 'http://192.168.1.180:8081/profiles',
            method: 'GET'
        }).then(function(response) {
            callback(response.data);
        }, function(response) {
            console.log('API profiles request failed', response);
        });
    };
    
    service.selectProfile = function(profileName, callback) {
        $http({
            url: 'http://192.168.1.180:8081/activeprofile',
            method: 'POST',
            data: { name: profileName },
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function() {
            if(callback) {
                callback();
            }
        }, function(response) {
            console.log('API select profile request failed', response);
        });
    };
    
    service.addProfile = function(profile, callback) {
        $http({
            url: 'http://192.168.1.180:8081/profile',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: profile
        }).then(function() {
            if(callback) {
                callback();
            }
        }, function(response) {
            console.log('API add profile request failed', response);
        });
    };
    
    service.deleteProfile = function(profileName, callback) {
        $http({
            url: 'http://192.168.1.180:8081/profile',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { name: profileName }
        }).then(function() {
            if(callback) {
                callback();
            }
        }, function(response) {
            console.log('API delete profile request failed', response);
        });
    };

    service.getWeather = function (callback) {
        return $http({
            url: 'http://192.168.1.180:8081/weather',
            method: 'GET',
        }).then(function (data) {
            callback(data);
        }, function (err) {
            console.log('API call for weather failed: ' + err);
        });
    };
    
    return service;
}]);