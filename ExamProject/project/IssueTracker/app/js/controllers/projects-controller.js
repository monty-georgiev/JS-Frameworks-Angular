"use strict";

angular.module('montyIssueTracker.projects', [])
    .controller('ProjectsController', ['$scope', 'projectsService', function ($scope, projectsService) {


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
        'projectsService',
        'issuesService',
        function ($scope, $routeParams, projectsService, issuesService) {


            projectsService.getProjectById($routeParams.id)
                .then(function (data) {

                    var priorities = data.Priorities;
                    var prioritiesArray = [];

                    angular.forEach(priorities, function (priority) {
                        prioritiesArray.push(priority.Name);
                    });
                    data.PrioritiesAsString = prioritiesArray.join(', ');

                    console.log(data);

                    $scope.project = data;
                    issuesService.getIssuesByProjectId($routeParams.id)
                        .then(function (data) {
                            $scope.projectIssues = data;
                        });

                });
        }]);
