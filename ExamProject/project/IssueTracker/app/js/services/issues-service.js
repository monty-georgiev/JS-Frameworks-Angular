"use strict";

angular.module('montyIssueTracker.services.issues', [])
    .factory('issuesService', ['$resource', 'BASE_URL',
        function ($resource, BASE_URL) {

            var issuesResource = $resource(BASE_URL + '/issues/20',
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

            return {
                getProjects: function (params, success, error) {
                    return issuesResource.getAll(params, success, error);
                }
            };
        }]);