angular.module('openboiler').factory('ApiService', [ '$http', 'WebApiUrl', function($http, WebApiUrl) {
    var service = {};
    
    service.initProfiles = function(callback) {
        $http({
            url: WebApiUrl + '/profiles',
            method: 'GET'
        }).then(function(response) {
            callback(response.data);
        }, function(response) {
            console.log('API profiles request failed', response);
        });
    };

    service.getActiveProfile = function (callback) {
        return $http({
            url: WebApiUrl + '/activeprofile',
            method: 'GET',
        }).then(function (data) {
            callback(data);
        }, function (err) {
            console.log('API call for active profile failed: ' + err);
        });
    };
    
    service.selectProfile = function(profileName, callback) {
        $http({
            url: WebApiUrl + '/activeprofile',
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
            url: WebApiUrl + '/profile',
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
            url: WebApiUrl + '/profile',
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
            url: WebApiUrl + '/weather',
            method: 'GET',
        }).then(function (data) {
            callback(data);
        }, function (err) {
            console.log('API call for weather failed: ' + err);
        });
    };

    service.overrideTemperature = function (temp, time) {
        $http({
            url: WebApiUrl + '/temperature',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { temperature: temp, time: time }
        });
    };

    service.cancelOverride = function () {
        $http({
            url: WebApiUrl + '/temperature',
            method: 'DELETE'
        }).then(function () {}, function (err) {
            console.log('API call for cancelOverride failed: ' + err);
        });
    };
    
    return service;
}]);