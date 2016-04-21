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
    'montyIssueTracker.services.notifications',
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
                templateUrl: 'app/views/homeView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'app/views/user/profileView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .when('/profile/password', {
                controller: 'ProfileController',
                templateUrl: 'app/views/user/changePasswordView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .when('/projects/', {
                controller: 'AllProjectController',
                templateUrl: 'app/views/projects/allProjectsView.html',
                requireLoggedIn: true,
                requiredAdmin: true
            })
            .when('/projects/add', {
                controller: 'AddProjectController',
                templateUrl: 'app/views/projects/singleProjectEditView.html',
                requireLoggedIn: true,
                requiredAdmin: true
            })
            .when('/projects/:id', {
                controller: 'SingleProjectController',
                templateUrl: 'app/views/projects/singleProjectView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .when('/projects/:id/edit', {
                controller: 'SingleProjectController',
                templateUrl: 'app/views/projects/singleProjectEditView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .when('/issues/add', {
                controller: 'AddIssueController',
                templateUrl: 'app/views/issues/addIssueView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .when('/issues/:id', {
                controller: 'SingleIssueController',
                templateUrl: 'app/views/issues/singleIssueView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .when('/issues/:id/edit', {
                controller: 'SingleIssueController',
                templateUrl: 'app/views/issues/singleIssueEditView.html',
                requireLoggedIn: true,
                requiredAdmin: false
            })
            .otherwise({redirectTo: '/'});
    }])
    .run(function ($rootScope, $location, identity) {
        //restrict routes based on route access
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.requireLoggedIn && !identity.getLoggedIn()) {
                $location.path('/');
            }

            if (next.requiredAdmin && !identity.getAdmin()) {
                $location.path('/');
            }
        });
    }).constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net');


