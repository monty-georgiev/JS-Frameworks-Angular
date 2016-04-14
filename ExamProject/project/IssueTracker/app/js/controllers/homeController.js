"use strict";

angular.module('montyIssueTracker.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/homeView.html',
            controller: 'HomeController'
        });
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'Logout',
            templateUrl: 'app/views/homeView.html'
        });
    }])
    .controller('Logout', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
        userService.logout()
            .then(function () {
                $location.path( "/" );
                window.location.reload();
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