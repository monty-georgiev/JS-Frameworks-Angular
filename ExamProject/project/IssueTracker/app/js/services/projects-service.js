"use strict";

angular
    .module('montyIssueTracker.services.projects', [])
    .factory('projectsService', ['$resource', '$q', '$http', 'identity', 'BASE_URL', projectsService]);

function projectsService($resource, $q, $http, identity, BASE_URL) {
    var projectsResource = $resource(BASE_URL + '/projects?pageSize=100&pageNumber=1&filter=',
        null,
        {
            'getAll': {
                method: 'GET',
                headers: identity.getHeaders()
            }
        }
    );

    return {
        getProjects: function (params, success, error) {
            return projectsResource.getAll(params, success, error);
        },
        getProjectById: function (id) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: BASE_URL + '/projects/' + id,
                headers: identity.getHeaders()
            }).then(function (data) {
                deferred.resolve(data.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },
        updateProjectById: function (id, data) {
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: BASE_URL + '/projects/' + id,
                data: data,
                headers: identity.getHeaders()
            }).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },
        addProject: function (project) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: BASE_URL + '/projects/',
                data: project,
                headers: identity.getHeaders()
            }).then(function (data) {
                deferred.resolve(data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };
}
