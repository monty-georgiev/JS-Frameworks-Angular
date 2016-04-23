"use strict";

angular
    .module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', '$location', 'identity', 'notifyService', UserController])
    .controller('ProfileController', ['$scope', '$location', 'identity', 'notifyService', ProfileController]);

function ProfileController($scope, $location, identity, notifyService) {
    $scope.userName = sessionStorage.getItem('userName');

    $scope.changePassword = function (passObject) {

        identity.changePassword(passObject)
            .then(function () {
                notifyService.success('Password changed!');
                $location.path('/profile');
            }, function (err) {
                //notifyService.error(err.data.Message);
            })
    }
}

function UserController($scope, $location, identity, notifyService) {
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
            }, function (err) {
                notifyService.error(err.data.error_description)
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
}