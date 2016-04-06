angular.module('videoSystem.video', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add', {
            templateUrl: 'app/video/addVideoView.html',
            controller: 'VideoController'
        });
    }])
    .controller('VideoController', ['$scope', 'videoService', function VideoController($scope, videoService) {
        $scope.title = "Add video";


        $scope.addVideo = function (video) {
            videoService.addVideo(video);
        }
    }]);