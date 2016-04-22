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
        '$location',
        'issuesService',
        'notifyService',
        'identity',
        function ($scope, $routeParams, $location, issuesService, notifyService, identity) {

            issuesService.getIssueById($routeParams.id)
                .then(function (data) {
                    $scope.issue = data;
                    $scope.issue.DueDate = new Date(data.DueDate);
                    var labelsArray = [];

                    angular.forEach(data.Labels, function (label) {
                        labelsArray.push(label.Name);
                    });
                    $scope.issue.LabelsAsString = labelsArray.join(', ');


                    console.log(data);
                    if (data.Author.Username === sessionStorage.getItem('userName')) {
                        $scope.isAuthor = true;
                    }

                    if (data.Assignee.Username === sessionStorage.getItem('userName')) {
                        $scope.isAssignee = true;
                    }

                });

            issuesService.getIssueComments($routeParams.id)
                .then(function (response) {
                    $scope.Comments = response.data;
                });

            identity.getAllUsernames()
                .then(function (data) {
                    $scope.users = data;
                });

            $scope.editIssue = function (issue) {


                var selectedPriority = document.getElementById('issuePriorities').value;
                var assigneeId = document.getElementById('issueAssignee').value;
                var labelsArray = [];

                if (issue.LabelsAsString) {
                    issue.LabelsAsString.split(',').forEach(function (label) {
                        if (label.trim()) {
                            labelsArray.push({Name: label.trim()});
                        }
                    });
                }

                var outputModel = {
                    Id: $routeParams.id,
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    AssigneeId: assigneeId,
                    PriorityId: selectedPriority,
                    Labels: labelsArray
                };

                issuesService.editIssue($routeParams.id, outputModel)
                    .then(function () {
                        $location.path('/issues/' + $routeParams.id);
                        notifyService.success('Issue edit successful!')
                    }, function (err) {
                        console.log(err);
                    })
            }

        }])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        'projectsService',
        'issuesService',
        'identity',
        function ($scope, $routeParams, projectsService, issuesService, identity) {

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
                var labelsArray = [];

                if (model.LabelsAsString) {
                    model.LabelsAsString.split(',').forEach(function (label) {
                        if (label.trim()) {
                            labelsArray.push({Name: label.trim()});
                        }
                    });
                }


                var outputModel = {
                    Title: model.Title,
                    Description: model.Description,
                    DueDate: model.DueDate,
                    ProjectId: $scope.project.Id,
                    AssigneeId: assigneeId,
                    PriorityId: selectedPriority,
                    Labels: labelsArray
                };


                issuesService.postIssue(outputModel)
                    .then(function (data) {
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    });
            }
        }]);
