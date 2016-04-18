'use strict';

app.controller('AppController', ['$scope', 'authService', 'notifyService', function ($scope, authService, notifyService) {
    $scope.authService = authService;


    $scope.logout = function () {
        authService.logout().then(function () {
            notifyService.info('Log out successfull!');
        })

    };
}]);