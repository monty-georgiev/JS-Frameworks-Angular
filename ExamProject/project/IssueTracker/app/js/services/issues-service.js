"use strict";

angular.module('montyIssueTracker.services.issues', [])
    .factory('issuesService', ['$resource', '$q', '$http', 'identity', 'BASE_URL',
        function ($resource, $q, $http, identity, BASE_URL) {

            var getMyIssues = $resource(BASE_URL + '/issues/me?orderBy=DueDate&desc&IssueKey&pageSize=1000&pageNumber=1',
                null,
                {
                    'getAll': {
                        method: 'GET',
                        headers: identity.getHeaders()
                    }
                });

            function getIssueById(id) {
                var deferred = $q.defer();


                $http({
                    method: 'GET',
                    url: BASE_URL + '/issues/' + id,
                    headers: identity.getHeaders()
                }).then(function (data) {
                    deferred.resolve(data.data);
                }, function (err) {
                    deferred.reject(err);
                });


                return deferred.promise;

            }

            function getIssuesByProjectId(id) {
                var deferred = $q.defer();


                $http({
                    method: 'GET',
                    url: BASE_URL + '/projects/' + id + '/issues',
                    headers: identity.getHeaders()
                }).then(function (data) {
                    deferred.resolve(data.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function getIssueComments(id) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: BASE_URL + '/issues/' + id + '/comments',
                    headers: identity.getHeaders()
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function postIssue(issue) {
                var deferred = $q.defer();


                $http({
                    method: 'POST',
                    url: BASE_URL + '/issues/',
                    data: issue,
                    headers: identity.getHeaders()
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;

            }

            function editIssue(id, issue) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: BASE_URL + '/issues/' + id,
                    data: issue,
                    headers: identity.getHeaders()
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function changeIssueStatus(id, statusId) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: BASE_URL + '/issues/' + id + '/changestatus?statusid=' + statusId,
                    headers: identity.getHeaders()
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }


            return {
                getMyIssues: function (params, success, error) {
                    return getMyIssues.getAll(params, success, error);
                },
                getIssueById: function (id) {
                    return getIssueById(id);
                },
                getIssuesByProjectId: function (id) {
                    return getIssuesByProjectId(id);
                },
                getIssueComments: function (id) {
                    return getIssueComments(id);
                },
                postIssue: function (issue) {
                    return postIssue(issue);
                },
                editIssue: function (id, issue) {
                    return editIssue(id, issue);
                },
                changeIssueStatus: function (id, statusId) {
                    return changeIssueStatus(id, statusId);
                }

            };
        }]);