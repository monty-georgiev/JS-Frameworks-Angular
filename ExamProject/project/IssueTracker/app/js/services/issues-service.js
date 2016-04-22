"use strict";

angular.module('montyIssueTracker.services.issues', [])
    .factory('issuesService', ['$resource', '$q', '$http', 'BASE_URL',
        function ($resource, $q, $http, BASE_URL) {

            var getMyIssues = $resource(BASE_URL + '/issues/me?orderBy=DueDate&desc&IssueKey&pageSize=1000&pageNumber=1',
                null,
                {
                    'getAll': {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
                        }
                    }
                });

            function getIssueById(id) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'GET',
                    url: BASE_URL + '/issues/' + id
                }).then(function (data) {
                    deferred.resolve(data.data);
                }, function (err) {
                    deferred.reject(err);
                });


                return deferred.promise;

            }

            function getIssuesByProjectId(id) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'GET',
                    url: BASE_URL + '/projects/' + id + '/issues'
                }).then(function (data) {
                    deferred.resolve(data.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function getIssueComments(id) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'GET',
                    url: BASE_URL + '/issues/' + id + '/comments'
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function postIssue(issue) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'POST',
                    url: BASE_URL + '/issues/',
                    data: issue
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
                }

            };
        }]);