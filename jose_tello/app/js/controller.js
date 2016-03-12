const angular = require('angular');
require('angular-route');
const petsApp = angular.module('petsApp', ['ngRoute']);
require('./services')(petsApp);
require('./cats')(petsApp);
require('./dogs')(petsApp);
require('./auth')(petsApp);

petsApp.config(['$routeProvider', function(routes) {
  routes
    .when('/cats', {
      controller: 'CatsController',
      templateUrl: '/views/cats_view.html'
    })
    .when('/dogs', {
      controller: 'DogsController',
      templateUrl: '/views/dogs_view.html'
    })
    .when('/', {
      redirectTo: '/cats'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in.html'
    })
    .otherwise({
      templateUrl: '/views/404.html'
    });
}]);
