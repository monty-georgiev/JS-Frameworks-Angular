"use strict";

angular.module('montyIssueTracker.main', [])
    .controller('MainController', ['$scope', function ($scope) {

        $scope.$on('isAdmin', function (event, data) {
            if(data){
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }
        });


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
