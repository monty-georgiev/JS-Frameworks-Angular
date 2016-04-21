"use strict";

angular.module('montyIssueTracker.services.projects', [])
    .factory('projectsService', ['$resource', '$q', '$http', 'BASE_URL',
        function ($resource, $q, $http, BASE_URL) {

            var projectsResource = $resource(BASE_URL + '/projects?pageSize=1000&pageNumber=1&filter=',
                null,
                {
                    'getAll': {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
                        }
                    }
                }
            );

            function getProjectById(id) {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'GET',
                    url: BASE_URL + '/projects/' + id
                }).then(function (data) {
                    deferred.resolve(data.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function updateProjectById(id, data) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('userToken');

                $http({
                    method: 'PUT',
                    url: BASE_URL + '/projects/' + id,
                    data: data
                }).then(function (data) {
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            return {
                getProjects: function (params, success, error) {
                    return projectsResource.getAll(params, success, error);
                },
                getProjectById: function (id) {
                    return getProjectById(id);
                },
                updateProjectById: function (id, data) {
                    return updateProjectById(id, data);
                }
            };
        }]);