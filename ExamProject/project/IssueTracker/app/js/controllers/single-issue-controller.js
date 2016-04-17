"use strict";

angular.module('montyIssueTracker.issues')
    .controller('SingleIssueController', ['$scope', '$routeParams', 'issuesService', function ($scope, $routeParams, issuesService) {


        issuesService.getIssueById($routeParams.id)
            .then(function (data) {
                $scope.issue = data;
                if (data.Assignee.Username === sessionStorage.getItem('userName')) {
                    $scope.isAuthor = true;
                }

                console.log(data);
            });

        $scope.editIssue = function (issueModel) {
            console.log(issueModel);
        }
    }]);
