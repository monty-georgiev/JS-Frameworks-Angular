"use strict";

angular
    .module('montyIssueTracker.projects', [])
    .controller('ProjectsController', ['$scope', 'projectsService', 'identity', 'notifyService', ProjectsController])
    .controller('SingleProjectController', ['$scope', '$routeParams', 'identity', 'projectsService', 'issuesService', SingleProjectController])
    .controller('EditProjectController', ['$scope', '$routeParams', '$location', 'identity', 'notifyService', 'projectsService', EditProjectController])
    .controller('AddProjectController', ['$scope', '$routeParams', '$location', 'notifyService', 'identity', 'projectsService', AddProjectController])
    .controller('AllProjectController', ['$scope', 'projectsService', 'notifyService', AllProjectController]);


function AllProjectController($scope, projectsService, notifyService) {
    projectsService.getProjects(null,
        function success(data) {
            $scope.projects = data.Projects;
        }, function error(err) {
            notifyService.error(err);
        });
}

function ProjectsController($scope, projectsService, identity, notifyService) {
    $scope.identity = identity;
    var projects = [];
    var loggedUsername = sessionStorage.getItem('userName');


    projectsService.getProjects(null,
        function success(data) {
            angular.forEach(data.Projects, function (value) {
                if (value.Lead.Username === loggedUsername) {
                    projects.push(value);
                }
            });
            $scope.projects = projects;
        }, function error(err) {
            notifyService.error(err);
        });
}

function SingleProjectController($scope, $routeParams, identity, projectsService, issuesService) {

    projectsService.getProjectById($routeParams.id)
        .then(function (data) {

            var currentUser = identity.getUsername();

            if (currentUser === data.Lead.Username) {
                $scope.isAuthor = true;
            }

            var priorities = data.Priorities;
            var prioritiesArray = [];

            angular.forEach(priorities, function (priority) {
                prioritiesArray.push(priority.Name);
            });

            data.PrioritiesAsString = prioritiesArray.join(', ');
            $scope.project = data;

            issuesService.getIssuesByProjectId($routeParams.id)
                .then(function (data) {
                    $scope.projectIssues = data;
                });
        });
}

function EditProjectController($scope, $routeParams, $location, identity, notifyService, projectsService) {
    projectsService.getProjectById($routeParams.id)
        .then(function (data) {

            var currentUser = identity.getUsername();
            $scope.currentUser = currentUser;

            identity.getAllUsernames()
                .then(function (response) {
                    $scope.users = response;
                });

            if (currentUser == data.Lead.Username) {
                $scope.isAuthor = true;
            } else {
                $location.path('/')
            }

            var priorities = data.Priorities;
            var labels = data.Labels;
            var prioritiesArray = [];
            var labelsArray = [];

            angular.forEach(priorities, function (priority) {
                prioritiesArray.push(priority.Name);
            });

            angular.forEach(labels, function (label) {
                labelsArray.push(label.Name);
            });

            data.PrioritiesAsString = prioritiesArray.join(', ');
            data.LabelsAsString = labelsArray.join(', ');
            $scope.project = data;
        });

    $scope.saveEditProject = function () {
        var selectedValue = document.getElementById('projectLeader').value;
        var labelsArray = [];
        var prioritiesArray = [];

        $scope.project.LabelsAsString.split(',').forEach(function (label) {
            if (label.trim()) {
                labelsArray.push({Name: label.trim()});
            }
        });

        $scope.project.PrioritiesAsString.split(',').forEach(function (priority) {
            if (priority.trim()) {
                prioritiesArray.push({Name: priority.trim()});
            }
        });

        var outputModel = {
            Name: $scope.project.Name,
            Description: $scope.project.Description,
            Labels: labelsArray,
            Priorities: prioritiesArray,
            LeadId: selectedValue
        };

        projectsService.updateProjectById($routeParams.id, outputModel)
            .then(function () {
                notifyService.success('Updated project!');
                $location.path('/projects/' + $routeParams.id)
            }, function (err) {
                notifyService.error(err);
            });
    };
}

function AddProjectController($scope, $routeParams, $location, notifyService, identity, projectsService) {

    identity.getAllUsernames()
        .then(function (response) {
            $scope.users = response;
        });

    $scope.addProject = function (project) {
        var selectedValue = document.getElementById('projectLeader').value;

        var labelsArray = [];
        var prioritiesArray = [];

        project.LabelsAsString.split(',').forEach(function (label) {
            if (label.trim()) {
                labelsArray.push({Name: label.trim()});
            }
        });

        project.PrioritiesAsString.split(',').forEach(function (priority) {
            if (priority.trim()) {
                prioritiesArray.push({Name: priority.trim()});
            }
        });

        var outputModel = {
            Name: project.Name,
            Description: project.Description,
            Labels: labelsArray,
            ProjectKey: project.ProjectKey,
            Priorities: prioritiesArray,
            LeadId: selectedValue
        };

        projectsService.addProject(outputModel)
            .then(function () {
                notifyService.success('Project created!');
                $location.path('/')
            }, function (err) {
                notifyService.error(err);
            });
    };

    $scope.saveEditProject = function () {
        var selectedValue = document.getElementById('projectLeader').value;

        var outputModel = {
            Name: $scope.project.Name,
            Description: $scope.project.Description,
            Labels: labelsArray,
            Priorities: prioritiesArray,
            LeadId: selectedValue
        };

        projectsService.updateProjectById($routeParams.id, outputModel)
            .then(function () {
                $location.path('/projects/' + $routeParams.id);
                notifyService.success('Project added');
            });
    };
}
