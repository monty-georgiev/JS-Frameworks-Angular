'use strict';

app.controller('HomeController', [
    '$scope',
    '$rootScope',
    'adsService',
    'authService',
    'notifyService',
    'pageSize',
    function ($scope, $rootScope, adsService, authService, notifyService, pageSize) {
        adsService.getAdds(null,
            function success(data) {
                $scope.ads = data;
                console.log(data.ads);
            },
            function error(err) {
                notifyService.showError("Cannot load ads", err);
            })
    }]);