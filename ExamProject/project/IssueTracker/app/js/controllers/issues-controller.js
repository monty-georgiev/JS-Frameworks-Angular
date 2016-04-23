"use strict";

angular
    .module('montyIssueTracker.issues', [])
    .controller('IssuesController', ['$scope', 'issuesService', 'notifyService', IssueController])
    .controller('SingleIssueController', ['$scope', '$routeParams', '$location', 'issuesService', 'projectsService', 'notifyService', 'identity', SingleIssueController])
    .controller('AddIssueController', ['$scope', '$routeParams', '$location', 'projectsService', 'issuesService', 'notifyService', 'identity', AddIssueController]);


function IssueController($scope, issuesService, notifyService) {
    issuesService.getMyIssues(null,
        function (data) {
            $scope.issues = data.Issues;
        },
        function (err) {
            notifyService.error(err.data.Message);
        });
}

function SingleIssueController($scope, $routeParams, $location, issuesService, projectsService, notifyService, identity) {
    issuesService.getIssueById($routeParams.id)
        .then(function (data) {
            $scope.issue = data;

            projectsService.getProjectById(data.Project.Id)
                .then(function (response) {
                    $scope.canAddComments = identity.getUsername() == response.Lead.Username;
                });
            $scope.issue.DueDate = new Date(data.DueDate);
            var labelsArray = [];

            angular.forEach(data.Labels, function (label) {
                labelsArray.push(label.Name);
            });
            $scope.issue.LabelsAsString = labelsArray.join(', ');

            if (data.Author.Username === identity.getUsername()) {
                $scope.isAuthor = true;
            }

            if (data.Assignee.Username === identity.getUsername()) {
                $scope.isAssignee = true;

                //hide menu if status is closed and no other options;
                if (data.Status.Name == 'Closed') {
                    $scope.isAssignee = false;
                }
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

    $scope.changeStatus = function () {
        var status = document.getElementById('issueStatus').value;

        issuesService.changeIssueStatus($routeParams.id, status)
            .then(function () {
                $location.path('/issues/' + $routeParams.id);
                notifyService.success('Status changed!');
            }, function (err) {
                notifyService.error(err);
            });
    };

    $scope.addCommentToIssue = function (comment) {
        issuesService.addCommentToIssue($routeParams.id, comment)
            .then(function () {
                notifyService.success("Comment added. Please reload cause i cant figure out how to display the comment below!");
                $location.path('/issues/' + $routeParams.id);
            }, function (err) {
                notifyService.error(err);
            })
    };

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
                notifyService.error(err);
            })
    }
}

function AddIssueController($scope, $routeParams, $location, projectsService, issuesService, notifyService, identity) {
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
            .then(function () {
                notifyService.success('Issue created');
                $location.path('/project/' + $routeParams.id)
            }, function (err) {
                notifyService.error(err);
            });
    }
}
