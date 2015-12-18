angular.module('openboiler').controller('ProfilesController', ['$scope', function ($scope) {
    
    $scope.deleteProfile = function(profile) {
        $scope.$parent.profiles = $scope.$parent.profiles.filter(function(d) {
            return d !== profile;
        });
    };
    $scope.editProfile = function(profile) {
        $scope.profile = profile;
        $scope.day = profile.days[0];
    }
    $scope.makeActive = function(toActivate) {
        if(toActivate) {
            $scope.profile = toActivate;
        }
        $scope.$parent.activeProfile = $scope.profile;
        $scope.$parent.changeView('');
    }
    $scope.getBarStyle = function(temp) {
        var minHeight = 3;
        var maxHeight = 60;
        var minTemp = 10;
        var maxTemp = 32;
        var height = (temp - minTemp) * (maxHeight - minHeight) / (maxTemp - minTemp) + minHeight;
        height += 'vh';
        return {
            'height': height
        };
    }
    
    $scope.addProfile = function() {
        var newProfile = {
            name: $scope.newName,
            days: [
                {
                    name: 'Monday',
                    times: [
                        { hour:0, temperature:20 },
                        { hour:1, temperature:20 },
                        { hour:2, temperature:20 },
                        { hour:3, temperature:20 },
                        { hour:4, temperature:20 },
                        { hour:5, temperature:20 },
                        { hour:6, temperature:20 },
                        { hour:7, temperature:20 },
                        { hour:8, temperature:20 },
                        { hour:9, temperature:20 },
                        { hour:10, temperature:20 },
                        { hour:11, temperature:20 },
                        { hour:12, temperature:20 },
                        { hour:13, temperature:20 },
                        { hour:14, temperature:20 },
                        { hour:15, temperature:20 },
                        { hour:16, temperature:20 },
                        { hour:17, temperature:20 },
                        { hour:18, temperature:20 },
                        { hour:19, temperature:20 },
                        { hour:20, temperature:20 },
                        { hour:21, temperature:20 },
                        { hour:22, temperature:20 },
                        { hour:23, temperature:20 }
                    ]
                },
                {
                    name: 'Tuesday',
                    times: [
                        { hour:0, temperature:20 },
                        { hour:1, temperature:20 },
                        { hour:2, temperature:20 },
                        { hour:3, temperature:20 },
                        { hour:4, temperature:20 },
                        { hour:5, temperature:20 },
                        { hour:6, temperature:20 },
                        { hour:7, temperature:20 },
                        { hour:8, temperature:20 },
                        { hour:9, temperature:20 },
                        { hour:10, temperature:20 },
                        { hour:11, temperature:20 },
                        { hour:12, temperature:20 },
                        { hour:13, temperature:20 },
                        { hour:14, temperature:20 },
                        { hour:15, temperature:20 },
                        { hour:16, temperature:20 },
                        { hour:17, temperature:20 },
                        { hour:18, temperature:20 },
                        { hour:19, temperature:20 },
                        { hour:20, temperature:20 },
                        { hour:21, temperature:20 },
                        { hour:22, temperature:20 },
                        { hour:23, temperature:20 }
                    ]
                },
                {
                    name: 'Wednesday',
                    times: [
                        { hour:0, temperature:20 },
                        { hour:1, temperature:20 },
                        { hour:2, temperature:20 },
                        { hour:3, temperature:20 },
                        { hour:4, temperature:20 },
                        { hour:5, temperature:20 },
                        { hour:6, temperature:20 },
                        { hour:7, temperature:20 },
                        { hour:8, temperature:20 },
                        { hour:9, temperature:20 },
                        { hour:10, temperature:20 },
                        { hour:11, temperature:20 },
                        { hour:12, temperature:20 },
                        { hour:13, temperature:20 },
                        { hour:14, temperature:20 },
                        { hour:15, temperature:20 },
                        { hour:16, temperature:20 },
                        { hour:17, temperature:20 },
                        { hour:18, temperature:20 },
                        { hour:19, temperature:20 },
                        { hour:20, temperature:20 },
                        { hour:21, temperature:20 },
                        { hour:22, temperature:20 },
                        { hour:23, temperature:20 }
                    ]
                },
                {
                    name: 'Thursday',
                    times: [
                        { hour:0, temperature:20 },
                        { hour:1, temperature:20 },
                        { hour:2, temperature:20 },
                        { hour:3, temperature:20 },
                        { hour:4, temperature:20 },
                        { hour:5, temperature:20 },
                        { hour:6, temperature:20 },
                        { hour:7, temperature:20 },
                        { hour:8, temperature:20 },
                        { hour:9, temperature:20 },
                        { hour:10, temperature:20 },
                        { hour:11, temperature:20 },
                        { hour:12, temperature:20 },
                        { hour:13, temperature:20 },
                        { hour:14, temperature:20 },
                        { hour:15, temperature:20 },
                        { hour:16, temperature:20 },
                        { hour:17, temperature:20 },
                        { hour:18, temperature:20 },
                        { hour:19, temperature:20 },
                        { hour:20, temperature:20 },
                        { hour:21, temperature:20 },
                        { hour:22, temperature:20 },
                        { hour:23, temperature:20 }
                    ]
                },
                {
                    name: 'Friday',
                    times: [
                        { hour:0, temperature:20 },
                        { hour:1, temperature:20 },
                        { hour:2, temperature:20 },
                        { hour:3, temperature:20 },
                        { hour:4, temperature:20 },
                        { hour:5, temperature:20 },
                        { hour:6, temperature:20 },
                        { hour:7, temperature:20 },
                        { hour:8, temperature:20 },
                        { hour:9, temperature:20 },
                        { hour:10, temperature:20 },
                        { hour:11, temperature:20 },
                        { hour:12, temperature:20 },
                        { hour:13, temperature:20 },
                        { hour:14, temperature:20 },
                        { hour:15, temperature:20 },
                        { hour:16, temperature:20 },
                        { hour:17, temperature:20 },
                        { hour:18, temperature:20 },
                        { hour:19, temperature:20 },
                        { hour:20, temperature:20 },
                        { hour:21, temperature:20 },
                        { hour:22, temperature:20 },
                        { hour:23, temperature:20 }
                    ]
                },
                {
                    name: 'Saturday',
                    times: [
                        { hour:0, temperature:20 },
                        { hour:1, temperature:20 },
                        { hour:2, temperature:20 },
                        { hour:3, temperature:20 },
                        { hour:4, temperature:20 },
                        { hour:5, temperature:20 },
                        { hour:6, temperature:20 },
                        { hour:7, temperature:20 },
                        { hour:8, temperature:20 },
                        { hour:9, temperature:20 },
                        { hour:10, temperature:20 },
                        { hour:11, temperature:20 },
                        { hour:12, temperature:20 },
                        { hour:13, temperature:20 },
                        { hour:14, temperature:20 },
                        { hour:15, temperature:20 },
                        { hour:16, temperature:20 },
                        { hour:17, temperature:20 },
                        { hour:18, temperature:20 },
                        { hour:19, temperature:20 },
                        { hour:20, temperature:20 },
                        { hour:21, temperature:20 },
                        { hour:22, temperature:20 },
                        { hour:23, temperature:20 }
                    ]
                },
                {
                    name: 'Sunday',
                    times: [
                        { hour:0, temperature:20 },
                        { hour:1, temperature:20 },
                        { hour:2, temperature:20 },
                        { hour:3, temperature:20 },
                        { hour:4, temperature:20 },
                        { hour:5, temperature:20 },
                        { hour:6, temperature:20 },
                        { hour:7, temperature:20 },
                        { hour:8, temperature:20 },
                        { hour:9, temperature:20 },
                        { hour:10, temperature:20 },
                        { hour:11, temperature:20 },
                        { hour:12, temperature:20 },
                        { hour:13, temperature:20 },
                        { hour:14, temperature:20 },
                        { hour:15, temperature:20 },
                        { hour:16, temperature:20 },
                        { hour:17, temperature:20 },
                        { hour:18, temperature:20 },
                        { hour:19, temperature:20 },
                        { hour:20, temperature:20 },
                        { hour:21, temperature:20 },
                        { hour:22, temperature:20 },
                        { hour:23, temperature:20 }
                    ]
                }
            ]
        };
        if($scope.newName) {
            $scope.$parent.profiles.push(newProfile);
        }
    };
}]);