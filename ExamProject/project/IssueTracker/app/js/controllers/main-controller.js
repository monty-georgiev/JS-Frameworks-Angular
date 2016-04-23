"use strict";

angular
    .module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', 'identity', MainController])
    .controller('LogoutController', ['$location', 'identity', 'notifyService', LogoutController]);

function MainController($scope, identity) {
    $scope.identity = identity;
}

function LogoutController($location, identity, notifyService) {
    identity.logout()
        .then(function () {
            sessionStorage.clear();
            notifyService.info('Logged Out');
            $location.path('/');
        }, function (err) {
            notifyService.error(err.data.Message);
        })
}

