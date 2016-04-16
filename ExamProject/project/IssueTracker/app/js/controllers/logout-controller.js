"use strict";

angular.module('montyIssueTracker.main')
    .controller('LogoutController', [
        '$location',
        '$rootScope',
        'identity',
        function ($location, $rootScope, identity) {
            identity.logout()
                .then(function () {
                    $rootScope.$broadcast('logout', true);
                    sessionStorage.clear();
                    $location.path('/');
                })
        }]);
