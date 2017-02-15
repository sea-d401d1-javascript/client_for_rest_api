const angular = require('angular');
const CSApp = angular.module('CSApp', []);
require('./services/resource_service')(CSApp);

CSApp.controller('CTController', ['$scope', '$http', 'csResource', function($scope, $http, Resource) {
  $scope.cts = [];
  var ctService = Resource('/ct');

  $scope.getCT = function() {
    ctService.get(function(err, res) {
      if (err) return console.log(err);
      $scope.cts = res;
    })
  };

  $scope.createCT = function(ct) {
    ctService.create(ct, function(err, res) {
      if (err) return console.log(err);
      $scope.cts.push(res);
      $scope.newCT = null;
    });
  };

  $scope.updateCT = function(ct) {
    ctService.update(ct, function(err, res) {
      ct.editting = false;
      if (err) return console.log(err);
    });
  };

  $scope.deleteCT = function(ct) {
    ctService.delete(ct, function(err, res) {
      if (err) return console.log(err);
      $scope.cts.splice($scope.cts.indexOf(ct), 1);
    });
  };

}])

.controller('TController', ['$scope', '$http', 'csResource', function($scope, $http, Resource) {
  $scope.ts = [];
  var tService = Resource('/t');

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
      t.editting = false;
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
