"use strict";

angular.module('montyIssueTracker.services.projects', [])
    .factory('projectsService', ['$resource', '$q', '$http', 'BASE_URL',
        function ($resource, $q, $http, BASE_URL) {

            var projectsResource = $resource(BASE_URL + '/projects',
                null,
                {
                    'getAll': {
                        method: 'GET',
                        isArray: true,
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

            return {
                getProjects: function (params, success, error) {
                    return projectsResource.getAll(params, success, error);
                },
                getProjectById: function (id) {
                    return getProjectById(id);
                }
            };
        }]);