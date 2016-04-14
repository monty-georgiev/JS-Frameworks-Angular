"use strict";

angular.module('montyIssueTracker.user', [])
    .controller('UserController', ['$scope', 'identity', '$rootScope', function ($scope, identity, $rootScope) {
        if ($rootScope.logged) {
            $scope.logged = true;
        }


        $scope.login = function (user) {
            identity.login(user)
                .then(function () {
                    identity.checkAdmin().then(function (data) {
                        if (data.isAdmin) {
                            $rootScope.$broadcast('isAdmin', true);
                        } else {
                            $rootScope.$broadcast('isAdmin', false);
                        }
                    });
                });
        };

        $scope.register = function (user) {
            identity.register(user)
                .then(function (registered) {
                    identity.login(registered);
                });
        };
    }]);