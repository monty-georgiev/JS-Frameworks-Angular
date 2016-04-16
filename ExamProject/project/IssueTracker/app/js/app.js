'use strict';

// Declare app level module which depends on views, and components
angular.module('montyIssueTracker', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'montyIssueTracker.main',
    'montyIssueTracker.projects',
    'montyIssueTracker.issues',
    'montyIssueTracker.user',
    'montyIssueTracker.services.identity',
    'montyIssueTracker.services.projects',
    'montyIssueTracker.services.issues',
    'montyIssueTracker.directives',
    'montyIssueTracker.filters'
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
            .when('/projects/:id', {
                controller: 'SingleProjectController',
                templateUrl: 'app/views/singleProjectView.html'
            })
            .when('/issues/:id', {
                controller: 'IssuesController',
                templateUrl: 'app/views/issueView.html'
            })
            .otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net');

