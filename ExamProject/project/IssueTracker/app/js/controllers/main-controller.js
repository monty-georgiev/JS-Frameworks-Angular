"use strict";

angular.module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', function ($scope) {

        var isLogged = sessionStorage.getItem('isLogged');
        var isAdmin = sessionStorage.getItem('isAdmin');

        //TODO: WHY DIS WORKS AND BOOLEAN PARSE NOT???
        if (isAdmin === "false") {
            isAdmin = false;
        }

        $scope.isLogged = isLogged;
        $scope.isAdmin = isAdmin;

    }])
    .controller('LogoutController', [
        '$location',
        '$rootScope',
        'identity',
        'notifyService',
        function ($location, $rootScope, identity, notifyService) {
            identity.logout()
                .then(function () {
                    $rootScope.$broadcast('logout', true);
                    sessionStorage.clear();
                    notifyService.success('Logged Out');
                    $location.path('/');
                })
        }]);

