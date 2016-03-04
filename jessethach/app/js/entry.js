const angular = require('angular');
require('angular-route');
const jedisApp = angular.module('jedisApp', ['ngRoute']);

require('./services')(jedisApp);

require('./jedis')(jedisApp);
// require('./sithlords')(jedisApp);
// require('./auth')(jedisApp);

jedisApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'JedisController',
      templateUrl: '/views/jedis_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    // .when('/signup', {
    //   controller: 'SignupController',
    //   templateUrl: '/views/sign_up_in_view.html'
    // })
    // .when('/signin', {
    //   controller: 'SigninController',
    //   templateUrl: '/views/sign_up_in_view.html'
    // })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
