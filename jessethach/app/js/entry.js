const angular = require('angular');
const jedisApp = angular.module('jedisApp', []);
require('./services/resource_service')(jedisApp);

jedisApp.controller('JedisController', ['$scope', '$http','cfResource', function($scope, $http, Resource) {
  $scope.greeting = 'hello world';
  $scope.jedis = [];
  var jediService = Resource('/jedis');

  $scope.getAllJedi = function() {
    jediService.getAll(function(err, res) {
      if (err) return console.log(err);
      $scope.jedis = res;
    });
  };

  $scope.createJedi = function(jedi) {
    jediService.create(jedi, function(err, res) {
      if (err) return console.log(err);
      $scope.jedis.push(res);
      $scope.newJedi = null;
    });
  };

  $scope.deleteJedi = function(jedi) {
    jediService.delete(jedi, function(err, res) {
      if (err) return console.log(err);
      $scope.jedis = $scope.jedis.filter((i) => i !== jedi);
    });
  };

  $scope.updateJedi = function(jedi) {
    jediService.update(jedi, function(err, res) {
      jedi.editting = false;
      if (err) return console.log(err);
    });
  };
}]);

jedisApp.controller('SithlordsController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
  $scope.greeting = 'hello world';
  $scope.sithlords = [];
  var sithService = Resource('/sith-lords');

  $scope.getAllSith = function() {
    sithService.getAll(function(err, res) {
      if (err) return console.log(err);
      $scope.sithlords = res;
    });
  };

  $scope.createSith = function(sith) {
    sithService.create(sith, function(err, res) {
      if (err) return console.log(err);
      $scope.sithlords.push(res);
      $scope.newSith = null;
    });
  };

  $scope.deleteSith = function(sith) {
    sithService.delete(sith, function(err, res) {
      if (err) return console.log(err);
      $scope.sithlords = $scope.sithlords.filter((i) => i !== sith);
    });
  };

  $scope.updateSith = function(sith) {
    sithService.update(sith, function(err, res) {
      sith.editting = false;
      if (err) return console.log(err);
    });
  };

}]);
