'use strict';

app.controller('HomeController', [
    '$scope',
    '$rootScope',
    'adsService',
    'authService',
    'notifyService',
    'pageSize',
    function ($scope, $rootScope, adsService, authService, notifyService, pageSize) {
        $rootScope.pageTitle = "Home";
        $rootScope.showRightSidebar = true;

        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };

        $scope.reloadAds = function() {
            adsService.getAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Cannot load ads", err);
                }
            );
        };

        $scope.reloadAds();
    }]);