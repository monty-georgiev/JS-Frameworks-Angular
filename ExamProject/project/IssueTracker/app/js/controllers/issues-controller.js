"use strict";

angular.module('montyIssueTracker.issues', [])
    .controller('IssuesController', [
        '$scope',
        '$routeParams',
        'issuesService',
        'notifyService',
        function ($scope, $routeParams, issuesService, notifyService) {
            issuesService.getMyIssues(null,
                function (data) {
                    $scope.issues = data.Issues;
                },
                function (err) {
                    notifyService.error(err.data.Message);
                });

        }])
    .controller('SingleIssueController', [
        '$scope',
        '$routeParams',
        'issuesService',
        function ($scope, $routeParams, issuesService) {

            issuesService.getIssueById($routeParams.id)
                .then(function (data) {
                    $scope.issue = data;
                    if (data.Assignee.Username === sessionStorage.getItem('userName')) {
                        $scope.isAuthor = true;
                    }
                });

            issuesService.getIssueComments($routeParams.id)
                .then(function (response) {
                    $scope.Comments = response.data;
                });

        }])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        'projectsService',
        'identity',
        function ($scope, $routeParams, projectsService, identity) {

            projectsService.getProjectById($routeParams.id)
                .then(function (response) {
                    $scope.project = response;
                    console.log(response);
                });

            identity.getAllUsernames()
                .then(function (response) {
                    $scope.users = response;
                });

            $scope.addIssue = function (model) {
                var selectedPriority = document.getElementById('issuePriorities').value;
                var assigneeId = document.getElementById('issueAssignee').value;


                var outputModel = {
                    Title: model.Title,
                    Description: model.Description,
                    DueDate: model.DueDate,
                    ProjectId: $scope.project.Id,
                    AssigneeId: assigneeId,
                    PriorityId: selectedPriority
                };


                console.log(outputModel);
            }


        }]);
