'use strict';

// Declare app level module which depends on views, and components
angular.module('montyIssueTracker', [
        'ngRoute',
        'ngAnimate',
        'montyIssueTracker.main',
        'montyIssueTracker.user',
        'montyIssueTracker.identity',
        'montyIssueTracker.directives'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'MainController',
                templateUrl: 'app/views/homeView.html'
            })
            .when('/logout', {
                controller: 'LogoutController',
                templateUrl: 'app/views/homeView.html'
            })
            .otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api');

