'use strict';

// Declare app level module which depends on views, and components
angular.module('montyIssueTracker', [
        'ngRoute',
        'ngAnimate',
        'montyIssueTracker.home',
        'montyIssueTracker.user',
        'montyIssueTracker.userService.identity'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api');

