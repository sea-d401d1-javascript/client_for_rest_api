const angular = require('angular');
const politiciansApp = angular.module('politiciansApp', []);
require('./services/resource_service')(politiciansApp);

politiciansApp.controller('PoliticiansController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
  $scope.demGreeting = 'Hello Democrat Voters';
  $scope.demPoliticians = [];
  var demService = Resource('/demPoliticians');

  $scope.repGreeting = 'Hello Republican Voters';
  $scope.repPoliticians = [];
  var repService = Resource('/repPoliticians');

  $scope.getDem = function() {
    demService.getDem(function(err, res) {
      if (err) return console.log(err);
      $scope.demPoliticians = res;
    });
  };

  $scope.getRep = function() {
    repService.getRep(function(err, res) {
      if (err) return console.log(err);
      $scope.repPoliticians = res;
    });
  };

  $scope.createDemPolitician = function(demPolitician) {
    demService.create(demPolitician, function(err, res) {
      if (err) return console.log(err);
      $scope.demPoliticians.push(res);
      $scope.demPolitician = null;
    });
  };

  $scope.createRepPolitician = function(repPolitician) {
    repService.create(repPolitician, function(err, res) {
      if (err) return console.log(err);
      $scope.repPoliticians.push(res);
      $scope.repPolitician = null;
    });
  };

  $scope.deleteDemPolitician = function(demPolitician) {
    demService.delete(demPolitician, function(err, res) {
      if (err) return console.log(err);
      $scope.demPoliticians.splice($scope.demPoliticians.indexOf(demPolitician), 1);
    });
  };

  $scope.deleteRepPolitician = function(repPolitician) {
    repService.delete(repPolitician, function(err, res) {
      if (err) return console.log(err);
      $scope.repPoliticians.splice($scope.repPoliticians.indexOf(repPolitician), 1);
    });
  };

  $scope.updateDemPolitician = function(demPolitician) {
    demService.update(demPolitician, function(err, res) {
      demPolitician.editing = false;
      if (err) return console.log(err);
    });
  };

  $scope.updateRepPolitician = function(repPolitician) {
    repService.update(repPolitician, function(err, res) {
      repPolitician.editing = false;
      if (err) return console.log(err);
    });
  };

}]);
