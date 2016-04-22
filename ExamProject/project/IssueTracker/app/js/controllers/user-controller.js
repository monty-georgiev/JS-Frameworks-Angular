"use strict";

angular.module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', '$location', 'identity', 'notifyService', function ($scope, $location, identity, notifyService) {

        $scope.login = function (user) {
            identity.login(user)
                .then(function (data) {
                    sessionStorage.setItem('isLogged', true);
                    sessionStorage.setItem('userToken', data.data.access_token);
                    sessionStorage.setItem('userName', data.data.userName);
                    identity.checkAdmin()
                        .then(function (data) {
                            sessionStorage.setItem('isAdmin', data.isAdmin);
                            notifyService.success('Logged in successfully!');
                            $location.path('/');
                        });
                });
        };


        $scope.register = function (user) {
            identity.register(user)
                .then(function (registered) {
                    notifyService.success('Registered successfully!');
                    identity.login(registered);
                }, function (err) {
                    notifyService.error(err);
                });
        };
    }])
    .controller('ProfileController', [
        '$scope',
        'identity',
        'notifyService',
        function ($scope, identity, notifyService) {
            $scope.userName = sessionStorage.getItem('userName');

            $scope.changePassword = function (data) {

                identity.changePassword(data)
                    .then(function () {
                        notifyService.success('Password changed!');
                    }, function (err) {
                        notifyService.error(err);
                    })
            }
        }]);