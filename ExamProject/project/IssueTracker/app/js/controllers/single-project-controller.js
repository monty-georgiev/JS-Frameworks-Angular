"use strict";

angular.module('montyIssueTracker.projects')
    .controller('SingleProjectController', ['$scope', '$routeParams', 'projectsService', function ($scope, $routeParams, projectsService) {


        projectsService.getProjectById($routeParams.id)
            .then(function (data) {
                console.log(data);
                $scope.project = data;
            });
    }]);
