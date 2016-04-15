"use strict";

angular.module('montyIssueTracker.issues', [])
    .controller('IssuesController', ['$scope', '$routeParams', 'issuesService', function ($scope, $routeParams, issuesService) {
        $scope.msg = 'Issues';
        console.log($routeParams.id);


        issuesService.getProjects(null,
            function success(data) {
                $scope.issue = data;
                console.log(data);
            }, function error(err) {
                console.log(err);
            });
    }]);