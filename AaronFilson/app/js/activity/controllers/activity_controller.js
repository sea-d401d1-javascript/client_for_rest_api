var angular = require('angular');

module.exports = function(app){
  app.controller('ActivityController', ['$scope', '$http', 'cfResource', function($scope, $http, cfResource)]){
    $scope.activity = [];

    var activityService = Resource('/activity');

    $scope.toggleEdit = function (myAct){
      if(myAct.backup){
        var temp = myAct.backup;
        $scope.activity.splice($scope.activity.indexOf(myAct), 1, temp);
      } else {
        myAct.backup = angular.copy(myAct);
        myAct.editing = true;
      }
    };

    $scope.getAll = function() {
      activityService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.activity = res;
      });
    };

    $scope.createActivity = function(act) {
      $scope.activity.push(act);
      activityService.create(act, function(err, res) {
        if (err) return console.log(err);
        $scope.activity.splice($scope.activity.indexOf(act), 1, res);
        $scope.newAct = null;
      });
    };

    $scope.deleteActivity = function(act) {
      activityService.delete(act, function(err, res) {
        if (err) return console.log(err);
        $scope.activity.splice($scope.activity.indexOf(act), 1);
      });
    };

    $scope.updateActivity = function(act) {
      activityService.update(act, function(err, res) {
        act.editing = false;
        if (err) return console.log(err);
      });
    };

  }
};
