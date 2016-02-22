const angular = require('angular');
//now for great fun!
const activityApp = angular.module('activityApp', []);

activityApp.controller('ActivityController', ['$scope', '$http', function($scope, $http) {
  $scope.activity = [];

  $scope.getAll = function() {
    $http.get('http://localhost:3050/api/activity')
      .then((res) => {
        console.log('success!');
        $scope.activity = res.data;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.createActivity = function(act) {
    $http.post('http://localhost:3050/api/activity', act)
      .then((res) => {
        $scope.activity.push(res.data);
        $scope.newAct = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteActivity = function(act) {
    $http.delete('http://localhost:3050/api/activity/' + act._id)
      .then(() => {
        $scope.activity = $scope.activity.filter((i) => i !== act);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateActivity = function(act) {
    $http.put('http://localhost:3050/api/activity/' + act._id, act)
      .then((res) => {
        console.log('in updateActivity, the act var is : ' + act.name);
        console.log('the look up on indexOf is : ' + $scope.activity.indexOf(act));
        $scope.activity[$scope.activity.indexOf(act)] = act;
        act.editing = false;
      }, (err) => {
        console.log(err);
        act.editing = false;
      });
  };
}]);
