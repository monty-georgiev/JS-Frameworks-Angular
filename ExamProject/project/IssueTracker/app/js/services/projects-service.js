"use strict";

angular.module('montyIssueTracker.services.projects', [])
    .factory('projectsService', ['$resource', 'BASE_URL',
        function ($resource, BASE_URL) {

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

            return {
                getProjects: function (params, success, error) {
                    return projectsResource.getAll(params, success, error);
                }
            };
        }]);