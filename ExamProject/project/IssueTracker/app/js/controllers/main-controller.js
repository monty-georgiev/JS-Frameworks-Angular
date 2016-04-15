"use strict";

angular.module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', function ($scope) {

        $scope.$on('isAdmin', function (event, data) {
            $scope.isAdmin = data;
        });

        $scope.$on('isLogged', function (event, data) {
            $scope.isLogged = data;

        });


    }])
    .controller('LogoutController', [
        '$scope',
        '$location',
        'identity',
        function ($scope, $location, identity) {
            identity.logout()
                .then(function () {
                    $location.path('/')
                })
        }]);
