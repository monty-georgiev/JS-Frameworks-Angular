'use strict';

app.controller('RegisterController', [
    '$scope',
    '$location',
    'authService',
    'townsService',
    'notifyService',
    function ($scope, $location, authService, townsService, notifyService) {


        $scope.userData = {townId: null};
        $scope.towns = townsService.getTowns();

        $scope.register = function (userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo('Logged in successfully!');
                    $location.path('#/login');
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }]);