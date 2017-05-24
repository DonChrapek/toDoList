var app = angular.module('toDo', ['ngRoute']);


app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'views/list.html',
        controller: 'ListController'
    })
    .when('/addTask', {
        templateUrl: 'views/addtask.html',
        controller: 'ListController'
    })
    .otherwise({
        redirectTo: '/'
    })
})


app.controller('HomeController', ['$scope', function($scope){
    $scope.appTitle = 'To do list';
}]);

app.controller('ListController', ['$scope', '$location', function($scope, $location){
    $scope.tasks = [
        { id: 1, completed: true, taskName: 'Learn AJAX', date: '2017-05-24' },
        { id: 2, completed: true, taskName: 'Learn JSON', date: '2017-05-24' },
        { id: 3, completed: true, taskName: 'Learn RESTful API', date: '2017-05-24' }
    ];
    
}]);