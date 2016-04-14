"use strict";

angular.module('montyIssueTracker.identity', [])
    .factory('identity', ['$http', '$q', 'BASE_URL', '$rootScope',
        function ($http, $q, BASE_URL, $rootScope) {
            function login(user) {

                var deferred = $q.defer();
                var outputModel = {
                    username: user.username,
                    password: user.password,
                    grant_type: 'password'
                };

                $http({
                    method: 'POST',
                    url: BASE_URL + '/Token',
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
                    sessionStorage.setItem('userToken', data.data.access_token);
                    $rootScope.logged = true;
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function register(user) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: BASE_URL + '/Account/Register',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: user
                })
                    .then(function (data) {
                        deferred.resolve(data);
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
                    url: BASE_URL + '/Account/Logout',
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                })
                    .then(function (data) {
                        sessionStorage.clear();
                        $rootScope.logged = false;
                        deferred.resolve(data);
                    }, function (err) {
                        deferred.reject(err);
                        console.log(err);
                    });

                return deferred.promise;
            }

            return {
                login: login,
                register: register,
                logout: logout
            }
        }]);