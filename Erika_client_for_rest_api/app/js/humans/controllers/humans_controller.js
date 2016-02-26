'use strict';

var angular = require('angular');

var wapApp = angular.module('wapApp');
require('../../services/resource_service')(wapApp);

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
    humanService.create(human, function(err, res) {
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
