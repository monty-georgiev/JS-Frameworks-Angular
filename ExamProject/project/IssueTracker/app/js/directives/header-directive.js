angular
    .module('montyIssueTracker.directives',[])
    .directive('mainHeader', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            templateUrl: 'app/js/directives/header-directive.html'
        };
    });