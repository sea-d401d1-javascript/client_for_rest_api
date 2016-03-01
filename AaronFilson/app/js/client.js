const angular = require('angular');
const activityApp = angular.module('activityApp', []);

console.log(' in the client js file');
require('./services')(activityApp);

require('./activity')(activityApp);

// const angular = require('angular');
// //now for great fun!
// const activityApp = angular.module('activityApp', []);
// require('./services/resource_service')(activityApp);
//
//
// activityApp.controller('ActivityController', ['$scope', '$http', 'cfResource',
//  function($scope, $http, Resource) {
//   $scope.activity = [];
//
//   var activityService = Resource('/activity');
//
//
//
//   $scope.getAll = function() {
//     activityService.getAll(function(err, res) {
//       if (err) return console.log(err);
//       $scope.activity = res;
//     });
//   };
//
//   $scope.createActivity = function(act) {
//     $scope.activity.push(act);
//     activityService.create(act, function(err, res) {
//       if (err) return console.log(err);
//       $scope.activity.splice($scope.activity.indexOf(act), 1, res);
//       $scope.newAct = null;
//     });
//   };
//
//   $scope.deleteActivity = function(act) {
//     activityService.delete(act, function(err, res) {
//       if (err) return console.log(err);
//       $scope.activity.splice($scope.activity.indexOf(act), 1);
//     });
//   };
//
//   $scope.updateActivity = function(act) {
//     activityService.update(act, function(err, res) {
//       act.editing = false;
//       if (err) return console.log(err);
//     });
//   };
// }]);
