'use strict';

const angular = require('angular');

const wapApp = angular.module('wapApp', []);
require('./services/resource_service')(wapApp);

wapApp.controller('dogController', ['$scope', function($scope) {
}]);

wapApp.controller('dogController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
  $scope.dog = [];
  var dogService = Resource('/dog');


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

wapApp.controller('humanController', ['$scope', function($scope) {
}]);

wapApp.controller('humanController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
  $scope.human = [];
  var humanService = Resource('/human');


$scope.allhumans = function() {
  humanService.allhumans(function(err, res) {
      if (err) return console.log(err);
      $scope.human = res;
    });
  };

  $scope.createHuman = function(human) {
    $scope.human.push(human);
    HumanService.create(human, function(err, res) {
      if (err) return console.log(err);
      $scope.human.splice($scope.human.indexOf(human), 1, res);
      $scope.newHuman = null;
    });
  };

  $scope.updateHuman = function(human) {
    humanService.update(human, function(err, res) {
      human.editing = false;
      if (err) return console.log(err);
    });
  };

  $scope.deleteHuman = function(human) {
      if (!human._id) return setTimeout(function() {$scope.deleteHuman(human);}, 1000);
      humanService.delete(human, function(err, res) {
        if (err) return console.log(err);
        $scope.human.splice($scope.human.indexOf(human), 1);
      });
    };
}]);
