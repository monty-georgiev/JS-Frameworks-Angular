var studentsApp = angular.module('studentsApp', []);

studentsApp.controller('StudentsController', ['$scope', function ($scope) {
    $scope.students = [
        {
            "name": "Pesho",
            "photo": "http://loremflickr.com/60/60",
            "grade": 5,
            "school": "High School of Mathematics",
            "teacher": "Gichka Pesheva"
        },
        {
            "name": "Gosho",
            "photo": "http://loremflickr.com/60/60",
            "grade": 3,
            "school": "High School of Arts",
            "teacher": "Jichka Gosheva"
        }
    ];

    $scope.greeting = 'Hello World!';
}]);