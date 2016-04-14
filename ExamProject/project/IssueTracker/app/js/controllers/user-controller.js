"use strict";

angular.module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', 'identity', '$rootScope', function ($scope, identity, $rootScope) {
        if ($rootScope.logged) {
            $scope.logged = true;
        }


        $scope.login = function (user) {
            identity.login(user);
        };

        $scope.register = function (user) {
            identity.register(user);
        };
    }]);