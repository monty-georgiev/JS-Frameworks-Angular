'use strict';

angular.module('videoSystem', [
    'ngRoute',
    'videoSystem.home',
    'videoSystem.video'
]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .factory('videoService', function () {
        var mockedVideos = [{
            title: 'Course introduction',
            pictureUrl: 'https://softuni.bg/Content/images/softuni-home-cover-seminars.png',
            length: '3:32',
            category: 'IT',
            subscribers: 3,
            date: new Date(2014, 12, 15),
            haveSubtitles: false,
            comments: [
                {
                    username: 'Pesho Peshev',
                    content: 'Congratulations Nakov',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 3,
                    websiteUrl: 'http://pesho.com/'
                }
            ]
        },
            {
                title: 'Controllers',
                pictureUrl: 'https://softuni.bg/Content/images/softuni-home-cover-seminars.png',
                length: '2:42',
                category: 'IT',
                subscribers: 3,
                date: new Date(2014, 12, 15),
                haveSubtitles: false,
                comments: [
                    {
                        username: 'Pesho Peshev',
                        content: 'Congratulations Nakov',
                        date: new Date(2014, 12, 15, 12, 30, 0),
                        likes: 3,
                        websiteUrl: 'http://pesho.com/'
                    }
                ]
            }

        ];


        function getAllVideos() {
            return mockedVideos;
        }

        function addVideo(video) {
            console.log(video);
        }


        return {
            getVideos: getAllVideos,
            addVideo: addVideo
        }
    });
