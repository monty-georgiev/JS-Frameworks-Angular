'use strict';

app.controller('AppController', ['$scope', 'authService', function ($scope, authService) {
    $scope.authService = authService;
}]);