'use strict';

// Declare app level module which depends on views, and components
angular.module('montyIssueTracker', [
        'ngRoute',
        'angular-loading-bar',
        'ngAnimate',
        'montyIssueTracker.home',
        'montyIssueTracker.user'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
