"use strict";

angular.module('montyIssueTracker.issues', [])
    .controller('IssuesController', ['$scope', '$routeParams', 'issuesService', 'notifyService', function ($scope, $routeParams, issuesService, notifyService) {


        issuesService.getMyIssues(null,
            function (data) {
                $scope.issues = data.Issues;
            },
            function (err) {
                notifyService.error(err.data.Message);
            });

    }])
    .controller('SingleIssueController', ['$scope', '$routeParams', 'issuesService', function ($scope, $routeParams, issuesService) {


        issuesService.getIssueById($routeParams.id)
            .then(function (data) {
                $scope.issue = data;
                if (data.Assignee.Username === sessionStorage.getItem('userName')) {
                    $scope.isAuthor = true;
                }
            });

        $scope.editIssue = function (issueModel) {
            console.log(issueModel);
        }
    }]);
