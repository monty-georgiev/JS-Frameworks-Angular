"use strict";

angular.module('montyIssueTracker.userService.identity', [])
    .factory('userService', ['$http', '$q',
        function ($http, $q) {
            function login(user) {
                console.log(user);
            }

            function register(user) {
                console.log(user);
            }

            return {
                login: login,
                register: register
            }
        }]);