"use strict";

angular.module('montyIssueTracker.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/homeView.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', ['$scope', function ($scope) {
        $scope.msg = "KOR";
    }]);