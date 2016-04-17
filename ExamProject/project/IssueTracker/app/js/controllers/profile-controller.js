"use strict";

angular.module('montyIssueTracker.main')
    .controller('ProfileController', [
        '$scope',
        function ($scope) {
            $scope.userName = sessionStorage.getItem('userName');
        }]);
