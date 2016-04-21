"use strict";

angular.module('montyIssueTracker.services.identity', [])
    .factory('identity', ['$http', '$q', 'BASE_URL',
        function ($http, $q, BASE_URL) {

            function login(user) {

                var deferred = $q.defer();
                var outputModel = {
                    username: user.username,
                    password: user.password,
                    grant_type: 'password'
                };

                $http({
                    method: 'POST',
                    url: BASE_URL + '/api/Token',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: outputModel
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function register(user) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: BASE_URL + '/api/Account/Register',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: user
                })
                    .then(function () {
                        deferred.resolve(user);
                    }, function (err) {
                        deferred.reject(err.data.ModelState[""][1]);
                    });

                return deferred.promise;
            }

            function logout() {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');
                $http({
                    method: 'POST',
                    url: BASE_URL + '/api/Account/Logout',
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                })
                    .then(function (data) {
                        sessionStorage.clear();
                        deferred.resolve(data);
                    }, function (err) {
                        deferred.reject(err);
                        console.log(err);
                    });

                return deferred.promise;
            }

            function checkAdmin() {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'GET',
                    url: BASE_URL + '/users/me'
                }).then(function (data) {
                    deferred.resolve(data.data);
                    sessionStorage.setItem('isAdmin', true);
                }, function (err) {
                    deferred.reject(err);
                    sessionStorage.setItem('isAdmin', false);
                });

                return deferred.promise;
            }

            function getUsername() {
                return sessionStorage.getItem('userName');
            }

            function getLoggedIn() {
                if (sessionStorage['isLogged'] == 'true') {
                    return true;
                }

                return false;
            }

            function getAdmin() {
                if (sessionStorage['isAdmin'] == 'true') {
                    return true;
                }

                return false;
            }

            function getAllUsernames() {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'GET',
                    url: BASE_URL + '/users'
                }).then(function (data) {
                    deferred.resolve(data.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }


            return {
                login: login,
                register: register,
                logout: logout,
                checkAdmin: checkAdmin,
                getLoggedIn: getLoggedIn,
                getAdmin: getAdmin,
                getUsername: getUsername,
                getAllUsernames: getAllUsernames
            }
        }]);