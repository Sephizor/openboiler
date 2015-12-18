angular.module('openboiler').controller('ProfilesController', ['$scope', function ($scope) {
    $scope.addProfile = function() {
        var newProfile = {
            name: $scope.newName,
            days: [
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            ]
        };
        if($scope.newName) {
            $scope.$parent.profiles.push(newProfile);
        }
    };
    $scope.deleteProfile = function(profile) {
        $scope.$parent.profiles = $scope.$parent.profiles.filter(function(d) {
            return d !== profile;
        });
    };
    $scope.editProfile = function(profile) {
        $scope.profile = profile;
        $scope.day = 0;
    }
    $scope.getDay = function() {
        switch($scope.day) {
            case 0:
                return 'Monday';
            case 1:
                return 'Tuesday';
            case 2:
                return 'Wednesday';
            case 3:
                return 'Thursday';
            case 4:
                return 'Friday';
            case 5:
                return 'Saturday';
            case 6:
                return 'Sunday';
            default:
                $scope.day = 0;
                return 'Monday';
        }
    }
    $scope.makeActive = function(toActivate) {
        if(toActivate) {
            $scope.profile = toActivate;
        }
        $scope.$parent.activeProfile = $scope.profile;
        $scope.$parent.changeView('');
    }
}]);