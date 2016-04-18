'use strict';

app.controller('AppController', ['$scope', 'authService', 'notifyService', function ($scope, authService, notifyService) {
    $scope.authService = authService;


    $scope.logout = function () {
        authService.logout();
        notifyService.showInfo('Log out successfull!');

    };
}]);