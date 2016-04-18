"use strict";

angular.module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', 'identity', function ($scope, identity) {

        $scope.identity = identity;


    }])
    .controller('LogoutController', [
        '$location',
        '$rootScope',
        'identity',
        'notifyService',
        function ($location, $rootScope, identity, notifyService) {
            identity.logout()
                .then(function () {
                    $rootScope.$broadcast('logout', true);
                    sessionStorage.clear();
                    notifyService.success('Logged Out');
                    $location.path('/');
                })
        }]);

