var app = angular.module('toDo', ['ngRoute']);


app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'views/list.html',
        controller: 'HomeController'
    })
    .when('/addTask', {
        templateUrl: 'views/addtask.html',
        controller: 'ListController'
    })
    .when('/addTask/edit/:id', {
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
    
    toDoService.findById = function(id) {
        for (var t in toDoService.tasks) {
            if (toDoService.tasks[t].id === id) {
                return toDoService.tasks[t];
            };
        };
    };
    
    toDoService.getNewId = function() {
        if (toDoService.newId) {
            toDoService.newId++;
            return toDoService.newId;
        } else {
            var maxId = _.max(toDoService.tasks, function(entry) { return entry.id });
            toDoService.newId = maxId.id + 1;
            return toDoService.newId;
        }
    };
    
    toDoService.save = function(entry) {
        
        var updatedTask = toDoService.findById(entry.id);
        
        if (updatedTask) {
            updatedTask.completed = entry.completed;
            updatedTask.taskName = entry.taskName;
            updatedTask.date = entry.date;
        } else {
            entry.id = toDoService.getNewId();
            toDoService.tasks.push(entry);
        }
    };
    
    return toDoService;
    
});


app.controller('HomeController', ['$scope', 'ToDoService', function($scope, ToDoService){
    $scope.tasks = ToDoService.tasks;
}]);


app.controller('ListController', ['$scope', '$routeParams', '$location', 'ToDoService', function($scope, $routeParams, $location, ToDoService){    
    
    if(!$routeParams.id) {
        $scope.task = {id: 0, completed: false, taskName: '', date: new Date() };
    } else {
        $scope.task = _.clone(ToDoService.findById(parseInt($routeParams.id)));
    }
    
    $scope.save = function() {
        ToDoService.save($scope.task);
        $location.path('/');
    };
    
}]);