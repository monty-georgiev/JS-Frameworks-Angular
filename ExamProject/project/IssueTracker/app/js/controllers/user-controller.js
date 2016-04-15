"use strict";

angular.module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', '$location', 'identity', function ($scope, $location, identity) {

        var isLogged = Boolean(sessionStorage.getItem('isLogged'));
        var isAdmin = Boolean(sessionStorage.getItem('isAdmin'));

        $scope.isLogged = isLogged;
        $scope.isAdmin = isAdmin;

        $scope.login = function (user) {
            identity.login(user)
                .then(function (data) {
                    sessionStorage.setItem('isLogged', true);
                    sessionStorage.setItem('userToken', data.data.access_token);
                    identity.checkAdmin()
                        .then(function (data) {
                            sessionStorage.setItem('isAdmin', data.isAdmin);
                            window.location.reload();
                        });
                });
        };

        $scope.register = function (user) {
            identity.register(user)
                .then(function (registered) {
                    identity.login(registered);
                });
        };
    }]);