const angular = require('angular');
require('angular-route');
const studentsApp = angular.module('studentsApp', ['ngRoute']);

require('./services')(studentsApp);

require('./students')(studentsApp);
require('./auth')(studentsApp);

studentsApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'StudentsController',
      templateUrl: '/views/students_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html' 
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html' 
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
