'use strict';

angular.module('videoSystem.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/homeView.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController', ['$scope', 'videoService', function HomeController($scope, videoService) {
        $scope.message = "I'm home";

        $scope.videos = videoService.getVideos();
    }]);
