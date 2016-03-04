'use strict';

const angular = require('angular');
require('angular-route');
var flowerApp = angular.module('flower', ['ngRoute']);

require('./services/resource_services')(flowerApp);
require('./flowers')(flowerApp);
require('./auth')(flowerApp);


flowerApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'FlowerController',
      templateUrl: '/views/flower_gardener_app_view.html'
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
