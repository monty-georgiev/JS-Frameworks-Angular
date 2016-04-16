"use strict";

angular.module('montyIssueTracker.projects', [])
    .controller('ProjectsController', ['$scope', 'projectsService', function ($scope, projectsService) {


        var projects = [];
        var loggedUsername = sessionStorage.getItem('userName');


        projectsService.getProjects(null,
            function success(data) {
                //check for project lead
                angular.forEach(data, function (value) {
                    if (value.Lead.Username === loggedUsername) {
                        projects.push(value);
                    }
                });
                $scope.projects = projects;
            }, function error(err) {
                console.log(err);
            });
    }]);
