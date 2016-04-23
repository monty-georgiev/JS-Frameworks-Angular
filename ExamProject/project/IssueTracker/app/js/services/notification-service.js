'use strict';

angular
    .module('montyIssueTracker.services.notifications', [])
    .factory('notifyService', [notifyService]);

function notifyService() {

    return {
        success: function (msg) {
            noty({
                    text: msg,
                    type: 'success',
                    layout: 'topCenter',
                    timeout: 3000
                }
            );
        },
        error: function (msg) {
            noty({
                    text: msg,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 3000
                }
            );
        },
        info: function (msg) {
            noty({
                    text: msg,
                    type: 'confirm',
                    layout: 'topCenter',
                    timeout: 1500
                }
            );
        }
    }
}

