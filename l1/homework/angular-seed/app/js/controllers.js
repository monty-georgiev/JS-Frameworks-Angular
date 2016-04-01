'use strict';


var studentsApp = angular.module('studentsApp', []);

studentsApp.controller('StudentsController', function ($scope) {
    $scope.students = [
        {
            "name": "Pesho",
            "photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
            "grade": 5,
            "school": "High School of Mathematics",
            "teacher": "Gichka Pesheva"
        },
        {
            "name": "Gosho",
            "photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
            "grade": 4,
            "school": "High School of Arts",
            "teacher": "Michka Goshova"
        }
    ];

    $scope.message = "Hello world!";
});
