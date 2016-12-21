const angular = require('angular');
require('angular-route')
const activityApp = angular.module('activityApp', ['ngRoute']);

require('./services')(activityApp);

require('./auth')(activityApp);

require('./activity')(activityApp);

activityApp.config(['$routeProvider', function(routes) {
  routes
    .when('/', {
      controller: 'ActivityController',
      templateUrl: '/views/activity_view.html'
    })
    .when('/home', {
      redirectTo: '/'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_or_in_form.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_or_in_form.html'
    })
    .otherwise({
      templateUrl: '/views/404.html'
    });
}]);
