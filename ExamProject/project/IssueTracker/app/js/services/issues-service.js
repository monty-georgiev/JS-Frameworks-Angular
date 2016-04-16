"use strict";

angular.module('montyIssueTracker.services.issues', [])
    .factory('issuesService', ['$resource', 'BASE_URL',
        function ($resource, BASE_URL) {

            var getMyIssues = $resource(BASE_URL + '/issues/me?orderBy=Project.Name&desc&IssueKey&pageSize=1000&pageNumber=1',
                null,
                {
                    'getAll': {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
                        }
                    }
                });

            return {
                getMyIssues: function (params, success, error) {
                    return getMyIssues.getAll(params, success, error);
                }

            };
        }]);