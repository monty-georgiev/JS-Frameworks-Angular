"use strict";

angular.module('montyIssueTracker.user', ['montyIssueTracker.userService.identity'])
    .controller('UserController', ['$scope', 'userService', function ($scope, userService) {
        $scope.logged = false;

        $scope.login = function (user) {
            userService.login(JSON.stringify(user));
        };

        $scope.register = function (user) {
            userService.register(JSON.stringify(user));
        };
    }]);