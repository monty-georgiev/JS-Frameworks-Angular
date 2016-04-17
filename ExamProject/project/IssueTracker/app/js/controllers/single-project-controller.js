"use strict";

angular.module('montyIssueTracker.projects')
    .controller('SingleProjectController', [
        '$scope',
        '$routeParams',
        'projectsService',
        'issuesService',
        function ($scope, $routeParams, projectsService, issuesService) {


            projectsService.getProjectById($routeParams.id)
                .then(function (data) {
                    console.log(data);
                    $scope.project = data;
                    issuesService.getIssuesByProjectId($routeParams.id)
                        .then(function (data) {
                            $scope.projectIssues = data;
                        });

                });
        }]);
