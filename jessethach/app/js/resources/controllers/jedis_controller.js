var angular = require('angular');

module.exports = function(app){
  app.controller('JedisController', ['$scope', '$http','cfResource', function($scope, $http, Resource) {
    $scope.jedis = [];
    $scope.sithlords = [];
    $scope.errors = [];
    var jediService = Resource('/jedis');
    var sithService = Resource('/sith-lords');

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexOf(err), 1);
    };

    $scope.toggleEditJedi = function(jedi) {
      if(jedi.backup) {
        var temp = angular.copy(jedi.backup);
        $scope.jedis.splice($scope.jedis.indexOf(jedi), 1, temp);
      } else {
        jedi.backup = angular.copy(jedi);
        jedi.editing = true;
      }
    };

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
        jedi.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.toggleEditSith = function(sith) {
      if(sith.backup) {
        var temp = angular.copy(sith.backup);
        $scope.sithlords.splice($scope.sithlords.indexOf(sith), 1, temp);
      } else {
        sith.backup = angular.copy(sith);
        sith.editing = true;
      }
    };

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
        sith.editing = false;
        if (err) return console.log(err);
      });
    };

  }]);
}
