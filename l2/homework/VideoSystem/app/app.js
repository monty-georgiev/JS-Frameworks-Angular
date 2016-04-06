'use strict';

angular.module('videoSystem', [
    'ngRoute',
    'videoSystem.home',
    'videoSystem.video'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}])
    .filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };
    })
    .factory('videoService', function () {
        var mockedVideos = [{
            title: 'Course introduction',
            pictureUrl: 'https://softuni.bg/Content/images/softuni-home-cover-seminars.png',
            length: '3:32',
            category: 'IT',
            subscribers: 3,
            date: new Date(2014, 10, 15),
            haveSubtitles: true,
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
                date: new Date(2014, 12, 18),
                haveSubtitles: false,
                comments: [
                    {
                        username: 'Gosho Geshev',
                        content: 'Congratulations Nakov',
                        date: new Date(2014, 12, 15, 12, 30, 0),
                        likes: 3,
                        websiteUrl: 'http://gosho.com/'
                    }
                ]
            },
            {
                title: 'Funny',
                pictureUrl: 'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
                length: '1:30',
                category: 'Fun',
                subscribers: 3,
                date: new Date(2014, 12, 15),
                haveSubtitles: true,
                comments: []
            }

        ];

        function getAllVideos() {
            return mockedVideos;
        }

        function addVideo(video) {
            mockedVideos.push(video);
            //console.log(video);
        }
        
        return {
            getVideos: getAllVideos,
            addVideo: addVideo
        }
    });
