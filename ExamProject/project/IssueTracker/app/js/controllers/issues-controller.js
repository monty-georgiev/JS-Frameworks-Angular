"use strict";

angular.module('montyIssueTracker.issues', [])
    .controller('IssuesController', ['$scope', '$routeParams', 'issuesService', function ($scope, $routeParams, issuesService) {


        issuesService.getMyIssues(null,
            function (data) {
                $scope.issues = data.Issues;
            },
            function (err) {
                console.log(err);
            });

    }]);
