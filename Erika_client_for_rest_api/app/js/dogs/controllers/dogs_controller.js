'use strict';

var angular = require('angular');

var wapApp = angular.module('wapApp');
require('../../services/resource_service')(wapApp);

wapApp.controller('dogController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
  $scope.dog = [];
  $scope.errors = [];
  var dogService = Resource('/dog');

$scope.dismissError = function(err) {
    $scope.errors.splice($scope.errors.indexOf(err), 1);
};

$scope.alldogs = function() {
  dogService.alldogs(function(err, res) {
      if (err) return console.log(err);
      $scope.dog = res;
    });
  };

  $scope.createDog = function(dog) {
    $scope.dog.push(dog);
    dogService.create(dog, function(err, res) {
      if (err) return console.log(err);
      $scope.dog.splice($scope.dog.indexOf(dog), 1, res);
      $scope.newDog = null;
    });
  };

  $scope.updateDog = function(dog) {
    dogService.update(dog, function(err, res) {
      dog.editing = false;
      if (err) return console.log(err);
    });
  };

  $scope.deleteDog = function(dog) {
      if (!dog._id) return setTimeout(function() {$scope.deleteDog(dog);}, 1000);
      dogService.delete(dog, function(err, res) {
        if (err) return console.log(err);
        $scope.dog.splice($scope.dog.indexOf(dog), 1);
      });
    };
}]);
