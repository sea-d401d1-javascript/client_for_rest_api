var angular = require('angular');

module.exports = function(CSApp) {
  CSApp.controller('CSController', ['$scope', '$http', 'csResource', function($scope, $http, Resource) {
    $scope.cts = [];
    $scope.ts = [];
    $scope.errors = [];
    var ctService = Resource('/ct');
    var tService = Resource('/t');

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexOf(err), 1);
    };

    $scope.toggleCTEdit = function(ct) {
      if(ct.backup) {
        var temp = ct.backup;
        $scope.cts.splice($scope.cts.indexOf(ct), 1, temp);
      } else {
        ct.backup = angular.copy(ct);
        ct.editing = true;
      }
    };

    $scope.getCT = function() {
      ctService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.cts = res;
      })
    };

    $scope.createCT = function(ct) {
      $scope.cts.push(ct);
      ctService.create(ct, function(err, res) {
        if (err) {
          $scope.cts.splice($scope.cts.indexOf(ct), 1);
          $scope.errors.push('Could not save CT with name of ' + ct.name);
          return console.log(err);
        }
        $scope.cts.splice($scope.cts.indexOf(ct), 1, res);
        $scope.newCT = null;
      });
    };

    $scope.updateCT = function(ct) {
      ctService.update(ct, function(err, res) {
        ct.editing = false;
        ct.backup = null;
        if (err) {
          $scope.errors.push('could not update CT ' + ct.name);
          return console.log(err);
        }
      });
    };

    $scope.deleteCT = function(ct) {
      ctService.delete(ct, function(err, res) {
        if (err) {
          $scope.errors.push('could not delete CT ' + ct.name);
          return console.log(err);
        }
        $scope.cts.splice($scope.cts.indexOf(ct), 1);
      });
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
      tService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.ts = res;
      })
    };

    $scope.createT = function(t) {
      $scope.ts.push(t);
      tService.create(t, function(err, res) {
        if (err) {
          $scope.ts.splice($scope.ts.indexOf(t), 1);
          $scope.errors.push('Could not save T with name of ' + t.name);
          return console.log(err);
        }
        $scope.t.splice($scope.t.indexOf(t), 1, res);
        $scope.newT = null;
      });
    };

    $scope.updateT = function(t) {
      tService.update(t, function(err, res) {
        t.editing = false;
        t.backup = null;
        if (err) {
          $scope.errors.push('could not update T: ' + t.name);
          return console.log(err);
        }
      });
    };

    $scope.deleteT = function(t) {
      tService.delete(t, function(err, res) {
        if (err) {
          $scope.errors.push('could not delete T ' + t.name);
          return console.log(err);
        }
        $scope.ts.splice($scope.ts.indexOf(t), 1);
      });
    };
  }]);
}
