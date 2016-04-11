"use strict";

angular.module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', function ($scope) {
        $scope.logged = false;
    }]);