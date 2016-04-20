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
                    sessionStorage.clear();
                    notifyService.info('Logged Out');
                    $location.path('/');
                }, function (err) {
                    notifyService.error(err.data.Message);
                })
        }]);

