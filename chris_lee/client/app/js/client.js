const angular = require('angular');
require('angular-route');
const CSApp = angular.module('CSApp', ['ngRoute']);
require('./services')(CSApp);
require('./ct')(CSApp);
require('./t')(CSApp);
require('./auth')(CSApp);

CSApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'CTController',
      templateUrl: '/views/teams_view.html'
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
