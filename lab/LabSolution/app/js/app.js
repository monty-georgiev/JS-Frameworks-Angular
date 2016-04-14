'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
app.constant('pageSize', 2);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: 'templates/login.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
        })
        .otherwise({
            redirectTo: '/'
        });
});