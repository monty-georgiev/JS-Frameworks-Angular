'use strict';

angular.module('montyIssueTracker.services.notifications', [])
    .factory('notifyService',
        [function () {
            function successNotification(msg) {
                noty({
                        text: msg,
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    }
                );
            }

            function errorNotification(msg) {
                noty({
                        text: msg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 3000
                    }
                );
            }


            return {
                success: successNotification,
                error: errorNotification
            }
        }]);
