var angular = require('angular');

module.exports = function(CSApp) {
  CSApp.controller('TController', ['$scope', '$http', 'csResource', function($scope, $http, Resource) {
    $scope.ts = [];
    $scope.errors = [];
    var tService = Resource('/t');

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexOf(err), 1);
    };

    $scope.toggleTEdit = function(t) {
      if(t.backup) {
        var temp = t.backup;
        $scope.ts.splice($scope.ts.indexOf(t), 1, temp);
      } else {
        t.backup = angular.copy(t);
        t.editing = true;
      }
    };

    $scope.getT = function() {
      tService.get(function(err, res) {
        if (err) return console.log(err);
        $scope.ts = res;
      })
    };

    $scope.createT = function(t) {
      tService.create(t, function(err, res) {
        if (err) return console.log(err);
        $scope.ts.push(res);
        $scope.newT = null;
      });
    };

    $scope.updateT = function(t) {
      tService.update(t, function(err, res) {
        t.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.deleteT = function(t) {
      tService.delete(t, function(err, res) {
        if (err) return console.log(err);
        $scope.ts.splice($scope.ts.indexOf(t), 1);
      });
    };

  }]);
}
