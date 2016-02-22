angular.module('openboiler').factory('ApiService', [ '$http', function($http) {
    var service = {};

    var baseUrl = 'http://192.168.1.5:8081';
    
    service.initProfiles = function(callback) {
        $http({
            url: baseUrl + '/profiles',
            method: 'GET'
        }).then(function(response) {
            callback(response.data);
        }, function(response) {
            console.log('API profiles request failed', response);
        });
    };

    service.getActiveProfile = function (callback) {
        return $http({
            url: baseUrl + '/activeprofile',
            method: 'GET',
        }).then(function (data) {
            callback(data);
        }, function (err) {
            console.log('API call for active profile failed: ' + err);
        });
    };
    
    service.selectProfile = function(profileName, callback) {
        $http({
            url: baseUrl + '/activeprofile',
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
            url: baseUrl + '/profile',
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
            url: baseUrl + '/profile',
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
            url: baseUrl + '/weather',
            method: 'GET',
        }).then(function (data) {
            callback(data);
        }, function (err) {
            console.log('API call for weather failed: ' + err);
        });
    };

    service.overrideTemperature = function (temp, time) {
        $http({
            url: baseUrl + '/temperature',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { temperature: temp, time: time }
        });
    };
    
    return service;
}]);