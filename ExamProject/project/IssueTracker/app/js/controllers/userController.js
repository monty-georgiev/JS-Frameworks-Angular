"use strict";

angular.module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', function ($scope) {
        $scope.logged = false;

        $scope.login = function (user) {
            console.log("Login " + JSON.stringify(user));
        };

        $scope.register = function (user) {
            console.log("Register " + JSON.stringify(user));
        };
    }]);