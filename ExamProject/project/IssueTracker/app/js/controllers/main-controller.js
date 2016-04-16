"use strict";

angular.module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', function ($scope) {

        var isLogged = sessionStorage.getItem('isLogged');
        var isAdmin = sessionStorage.getItem('isAdmin');

        //TODO: WHY DIS WORKS AND BOOLEAN PARSE NOT???
        if(isAdmin === "false") {
            isAdmin = false;
        }

        $scope.isLogged = isLogged;
        $scope.isAdmin = isAdmin;

        $scope.$on('logout', function () {
            $scope.isLogged = false;
            $scope.isAdmin = false;
        })

    }]);
