const angular = require('angular');
require('angular-route');
const twoResourcesApp = angular.module('twoResourcesApp',['ngRoute']);

// require('./services')(twoResourcesApp);

// require('./movies')(twoResourcesApp);
// require('./actors')(twoResourcesApp);
require('./auth')(twoResourcesApp);
require('./tworesources')(twoResourcesApp);

twoResourcesApp.config(['$routeProvider', function(routes) {
  routes
    .when('/entry',{
      templateUrl: '/views/entry.html'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/home', {
      controller: 'TwoResourcesController',
      templateUrl: '/views/home.html'
    });

}]);
