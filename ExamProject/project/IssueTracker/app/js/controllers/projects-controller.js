"use strict";

angular.module('montyIssueTracker.projects', [])
    .controller('ProjectsController', ['$scope', 'projectsService', 'identity', function ($scope, projectsService, identity) {

        $scope.identity = identity;
        var projects = [];
        var loggedUsername = sessionStorage.getItem('userName');


        projectsService.getProjects(null,
            function success(data) {
                angular.forEach(data.Projects, function (value) {
                    if (value.Lead.Username === loggedUsername) {
                        projects.push(value);
                    }
                });
                $scope.projects = projects;
            }, function error(err) {
                console.log(err);
            });
    }])
    .controller('SingleProjectController', [
        '$scope',
        '$routeParams',
        '$location',
        'identity',
        'projectsService',
        'issuesService',
        function ($scope, $routeParams, $location, identity, projectsService, issuesService) {


            projectsService.getProjectById($routeParams.id)
                .then(function (data) {

                    var currentUser = identity.getUsername();

                    //if user not the author, redirect to home
                    if (currentUser == data.Lead.Username) {
                        $scope.isAuthor = true;
                    } else {
                        $location.path('/');
                    }

                    var priorities = data.Priorities;
                    var prioritiesArray = [];

                    angular.forEach(priorities, function (priority) {
                        prioritiesArray.push(priority.Name);
                    });

                    data.PrioritiesAsString = prioritiesArray.join(', ');

                    $scope.project = data;
                    issuesService.getIssuesByProjectId($routeParams.id)
                        .then(function (data) {
                            $scope.projectIssues = data;
                        });
                });
        }])
    .controller('AddProjectController', ['$scope', function ($scope) {

    }])
    .controller('AllProjectController', ['$scope', 'projectsService', function ($scope, projectsService) {


        projectsService.getProjects(null,
            function success(data) {
                $scope.projects = data.Projects;
            }, function error(err) {
                console.log(err);
            });
    }]);
