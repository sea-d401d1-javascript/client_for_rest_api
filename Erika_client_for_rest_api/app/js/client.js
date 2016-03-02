const angular = require('angular');
require('angular-route');
const wapApp = angular.module('wapApp', ['ngRoute']);

require('./services')(wapApp);

require('./dogs')(wapApp);
require('./humans')(wapApp);
require('./auth')(wapApp);

wapApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'dogController',
      templateUrl: '/views/dogs_view.html'
    })
    // .when('/home', {
    //   controller:'HumansController',
    //   templateURL: '/views/humans_view.html'
    // })
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
