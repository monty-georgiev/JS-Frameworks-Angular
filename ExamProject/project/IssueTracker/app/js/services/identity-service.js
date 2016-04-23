"use strict";


angular
    .module('montyIssueTracker.services.identity', [])
    .factory('identity', ['$http', '$q', 'BASE_URL', identityFactory]);

function identityFactory($http, $q, BASE_URL) {

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

        $http({
            method: 'POST',
            url: BASE_URL + '/api/Account/Logout',
            headers: getHeaders(),
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

        $http({
            method: 'GET',
            url: BASE_URL + '/users/me',
            headers: getHeaders()
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
        return sessionStorage['isLogged'] == 'true';
    }

    function getAdmin() {
        return sessionStorage['isAdmin'] == 'true';
    }

    function getAllUsernames() {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: BASE_URL + '/users',
            headers: getHeaders()
        }).then(function (data) {
            deferred.resolve(data.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function changePassword(passObject) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: BASE_URL + '/api/Account/ChangePassword',
            data: JSON.stringify(passObject),
            headers: getHeaders()

        }).then(function (data) {
            deferred.resolve(data.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function getHeaders() {
        var headers = {};

        if (getLoggedIn()) {
            headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('userToken');
        }

        return headers;
    }

    return {
        login: function (user) {
            return login(user);
        },
        register: function (user) {
            return register(user);
        },
        logout: function () {
            return logout();
        },
        checkAdmin: function () {
            return checkAdmin();
        },
        getLoggedIn: function () {
            return getLoggedIn();
        },
        getAdmin: function () {
            return getAdmin();
        },
        getUsername: function () {
            return getUsername();
        },
        getAllUsernames: function () {
            return getAllUsernames()
        },
        changePassword: function (passObject) {
            return changePassword(passObject);
        },
        getHeaders: function () {
            return getHeaders();
        }
    };
}
