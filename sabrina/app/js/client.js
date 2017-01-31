const angular = require('angular');
require('angular-route');
const hogcApp = angular.module('hogcApp', ['ngRoute']);

require('./services')(hogcApp);
require('./requests')(hogcApp);
require('./donors')(hogcApp);
require('./auth')(hogcApp);

hogcApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'RequestsController',
      templateUrl: '/views/requests_view.html'
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
