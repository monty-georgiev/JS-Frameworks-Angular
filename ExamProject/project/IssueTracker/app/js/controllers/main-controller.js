"use strict";

angular.module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', '$location', function ($scope, $location) {

        var isLogged = Boolean(sessionStorage.getItem('isLogged'));
        var isAdmin = Boolean(sessionStorage.getItem('isAdmin'));

        $scope.isLogged = isLogged;
        $scope.isAdmin = isAdmin;

        $scope.$on('logout', function () {
            $scope.isLogged = false;
            $scope.isAdmin = false;
        })

    }])
    .controller('LogoutController', [
        '$scope',
        '$location',
        '$rootScope',
        'identity',
        function ($scope, $location, $rootScope, identity) {
            identity.logout()
                .then(function () {
                    $rootScope.$broadcast('logout', true);
                    $location.path('/');
                })
        }]);
