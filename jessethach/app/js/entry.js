const angular = require('angular');
require('angular-route');
const jedisApp = angular.module('jedisApp', ['ngRoute']);

require('./services')(jedisApp);

require('./resources')(jedisApp);
require('./auth')(jedisApp);

jedisApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'JedisController',
      templateUrl: '/views/jedis_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .when('/sith', {
      controller: 'JedisController',
      templateUrl: '/views/sith_view.html'
    })
    .when('/jedi', {
      controller: 'JedisController',
      templateUrl: '/views/jedi_view.html'
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
