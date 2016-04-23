"use strict";


angular
    .module('montyIssueTracker.services.issues', [])
    .factory('issuesService', ['$resource', '$q', '$http', 'identity', 'BASE_URL', issuesService]);

function issuesService($resource, $q, $http, identity, BASE_URL) {
    var getMyIssues = $resource(BASE_URL + '/issues/me?orderBy=DueDate&desc&IssueKey&pageSize=20&pageNumber=1',
        null,
        {
            'getAll': {
                method: 'GET',
                headers: identity.getHeaders()
            }
        });

    return {
        getMyIssues: function (params, success, error) {
            return getMyIssues.getAll(params, success, error);
        },
        getIssueById: function (id) {
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
        },
        getIssuesByProjectId: function (id) {
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
        },
        getIssueComments: function (id) {
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
        },
        postIssue: function (issue) {
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
        },
        editIssue: function (id, issue) {
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
        },
        changeIssueStatus: function (id, statusId) {
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
        },
        addCommentToIssue: function (id, comment) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: BASE_URL + '/issues/' + id + '/comments',
                headers: identity.getHeaders(),
                data: comment
            }).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

    };
}
