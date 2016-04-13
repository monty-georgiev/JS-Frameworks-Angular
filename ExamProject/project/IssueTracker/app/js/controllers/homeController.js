"use strict";

angular.module('montyIssueTracker.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/homeView.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController', ['$scope', function ($scope) {
        $scope.logged = false;
        $scope.admin = false;


        if (sessionStorage.getItem('userToken')) {
            $scope.logged = true;
        }

        if (sessionStorage.getItem('isAdmin')) {
            $scope.admin = true;
        }

    }]);