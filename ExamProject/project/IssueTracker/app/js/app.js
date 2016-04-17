'use strict';

// Declare app level module which depends on views, and components
angular.module('montyIssueTracker', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'angular-loading-bar',
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
            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'app/views/profileView.html'
            })
            .when('/profile/password', {
                controller: 'ProfileController',
                templateUrl: 'app/views/profileView.html'
            })
            .when('/projects/:id', {
                controller: 'SingleProjectController',
                templateUrl: 'app/views/singleProjectView.html'
            })
            .when('/projects/:id/edit', {
                controller: 'SingleProjectController',
                templateUrl: 'app/views/singleProjectEditView.html'
            })
            .when('/issues/:id', {
                controller: 'SingleIssueController',
                templateUrl: 'app/views/singleIssueView.html'
            })
            .when('/issues/:id/edit', {
                controller: 'SingleIssueController',
                templateUrl: 'app/views/singleIssueEditView.html'
            })
            .otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net');

