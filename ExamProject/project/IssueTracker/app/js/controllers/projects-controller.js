"use strict";

angular.module('montyIssueTracker.projects', [])
    .controller('ProjectsController', ['$scope', 'projectsService', function ($scope, projectsService) {

        projectsService.getProjects(null,
            function success(data) {
                $scope.projects = data;
            }, function error(err) {
                console.log(err);
            });
    }]);
