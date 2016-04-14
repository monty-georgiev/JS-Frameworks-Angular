"use strict";

angular.module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        if ($rootScope.logged) {
            $scope.logged = true;
        }
    }])
    .controller('LogoutController', [
        '$scope',
        '$location',
        'identity',
        function ($scope, $location, identity) {
            identity.logout()
                .then(function () {
                    $location.path('/')
                })
        }]);
