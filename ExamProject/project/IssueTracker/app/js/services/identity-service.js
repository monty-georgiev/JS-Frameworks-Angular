"use strict";


angular
    .module('montyIssueTracker.services.identity', [])
    .factory('identity', ['$http', '$q', 'BASE_URL', identityFactory]);

function identityFactory($http, $q, BASE_URL) {

    return {
        login: function (user) {

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
        },
        register: function (user) {
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
        },
        logout: function () {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: BASE_URL + '/api/Account/Logout',
                headers: this.getHeaders(),
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
        },
        getHeaders: function () {
            var headers = {};

            if (this.getLoggedIn()) {
                headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('userToken');
            }

            return headers;
        },
        checkAdmin: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + '/users/me',
                headers: this.getHeaders()
            }).then(function (data) {
                deferred.resolve(data.data);
                sessionStorage.setItem('isAdmin', true);
            }, function (err) {
                deferred.reject(err);
                sessionStorage.setItem('isAdmin', false);
            });

            return deferred.promise;
        },
        getAllUsernames: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + '/users',
                headers: this.getHeaders()
            }).then(function (data) {
                deferred.resolve(data.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },
        changePassword: function (passObject) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: BASE_URL + '/api/Account/ChangePassword',
                data: passObject,
                headers: this.getHeaders()

            }).then(function (data) {
                deferred.resolve(data.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },
        getLoggedIn: function () {
            return sessionStorage['isLogged'] == 'true';
        },
        getAdmin: function () {
            return sessionStorage['isAdmin'] == 'true';
        },
        getUsername: function () {
            return sessionStorage.getItem('userName');
        }
    };
}
