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


app.service('ToDoService', function() {
    
    var toDoService = {};
    
    toDoService.tasks = [
        { id: 1, completed: true, taskName: 'Learn AJAX', date: '2017-05-24' },
        { id: 2, completed: true, taskName: 'Learn JSON', date: '2017-05-24' },
        { id: 3, completed: true, taskName: 'Learn RESTful API', date: '2017-05-24' }
    ];
    
    toDoService.save = function(entry) {
        toDoService.tasks.push(entry);
    };
    
    return toDoService;
    
});


app.controller('HomeController', ['$scope', function($scope){
    $scope.appTitle = 'To do list';
}]);

app.controller('ListController', ['$scope', '$location', 'ToDoService', function($scope, $location, ToDoService ){
    $scope.tasks = ToDoService.tasks;
    
    $scope.task = {};
    
    $scope.save = function() {
        ToDoService.save($scope.task);
        $location.path('/');
    };
    
}]);