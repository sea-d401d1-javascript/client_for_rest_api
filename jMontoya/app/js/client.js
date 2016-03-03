const angular = require('angular');
require('angular-route');
const politiciansApp = angular.module('politiciansApp', ['ngRoute']);

require('./services/index')(politiciansApp);
require('./politicians/index')(politiciansApp);
require('./auth/index')(politiciansApp);

politiciansApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'PoliticiansController',
      templateUrl: '/views/politicians_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: 'views/sign_up_in_view.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: 'views/sign_up_in_view.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });  
}]);
