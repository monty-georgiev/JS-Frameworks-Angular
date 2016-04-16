"use strict";

angular.module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', '$location', 'identity', function ($scope, $location, identity) {

        var isLogged = sessionStorage.getItem('isLogged');
        var isAdmin = sessionStorage.getItem('isAdmin');

        //TODO: WHY DIS WORKS AND BOOLEAN PARSE NOT???
        if(isAdmin === "false") {
            isAdmin = false;
        }

        $scope.isLogged = isLogged;
        $scope.isAdmin = isAdmin;

        $scope.login = function (user) {
            identity.login(user)
                .then(function (data) {
                    console.log(data);
                    sessionStorage.setItem('isLogged', true);
                    sessionStorage.setItem('userToken', data.data.access_token);
                    sessionStorage.setItem('userName', data.data.userName);
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