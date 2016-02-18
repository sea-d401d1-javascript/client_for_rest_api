const angular = require('angular');
const jedisApp = angular.module('jedisApp', []);
require('./services/resource_service')(jedisApp);

jedisApp.controller('JedisController', ['$scope', '$http','Resource', ($scope, $http, Resource) => {
  $scope.greeting = 'hello world';
  $scope.jedis = [];
  var jediService = Resource('/jedis');

  $scope.getAllJedi = () => {
    jediService.getAll((err, res) => {
      if (err) return console.log(err);
      $scope.jedis = res;
    });
  };

  $scope.createJedi = (jedi) => {
    jediService.create(jedi, (err, res) => {
      if (err) return console.log(err);
      $scope.jedis.push(res);
      $scope.newJedi = null;
    });
  };

  $scope.deleteJedi = (jedi) => {
    jediService.delete(jedi, (err, res) => {
      if (err) return console.log(err);
      $scope.jedis = $scope.jedis.filter((i) => i !== jedi);
    });
  };

  $scope.updateJedi = (jedi) => {
    jediService.update(jedi, (err, res) => {
      jedi.editing = false;
      if (err) return console.log(err);
    });
  };
}]);

jedisApp.controller('SithlordsController', ['$scope', '$http', ($scope, $http) => {
  $scope.greeting = 'hello world';
  $scope.sithlords = [];

  $scope.getAllSith = () => {
    sithService.getAll((err, res) => {
      if (err) return console.log(err);
      $scope.sithlords = res;
    });
  };

  $scope.createSith = (sith) => {
    sithService.create(sith, (err, res) => {
      if (err) return console.log(err);
      $scope.sithlords.push(res);
      $scope.newSith = null;
    });
  };

  $scope.deleteSith = (sith) => {
    sithService.delete(sith, (err, res) => {
      if (err) return console.log(err);
      $scope.sithlords = $scope.sithlords.filter((i) => i !== sith);
    });
  };

  $scope.updateSith = (sith) => {
    sithService.update(sith, (err, res) => {
      sith.editing = false;
      if (err) return console.log(err);
    });
  };

}]);
