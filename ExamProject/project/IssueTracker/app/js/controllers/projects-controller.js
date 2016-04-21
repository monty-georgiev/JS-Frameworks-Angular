"use strict";

angular.module('montyIssueTracker.projects', [])
    .controller('ProjectsController', ['$scope', 'projectsService', 'identity', function ($scope, projectsService, identity) {

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
                console.log(err);
            });
    }])
    .controller('SingleProjectController', [
        '$scope',
        '$routeParams',
        '$location',
        'identity',
        'projectsService',
        'issuesService',
        function ($scope, $routeParams, $location, identity, projectsService, issuesService) {


            projectsService.getProjectById($routeParams.id)
                .then(function (data) {

                    var currentUser = identity.getUsername();

                    if (currentUser == data.Lead.Username) {
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
        }])
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        '$location',
        'identity',
        'projectsService',
        function ($scope, $routeParams, $location, identity, projectsService) {

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
                        $location.path('/projects/' + $routeParams.id)
                    });
            };
        }])
    .controller('AddProjectController', ['$scope', 'identity', function ($scope, identity) {

        identity.getAllUsernames()
            .then(function (response) {
                $scope.users = response;
            });


    }])
    .controller('AllProjectController', ['$scope', 'projectsService', function ($scope, projectsService) {


        projectsService.getProjects(null,
            function success(data) {
                $scope.projects = data.Projects;
            }, function error(err) {
                console.log(err);
            });
    }]);
