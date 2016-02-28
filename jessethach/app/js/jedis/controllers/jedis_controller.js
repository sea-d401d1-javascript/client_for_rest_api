var angular = require('angular');

module.exports = function(app){
  app.controller('JedisController', ['$scope', '$http','cfResource', function($scope, $http, Resource) {
    $scope.greeting = 'hello world';
    $scope.jedis = [];
    var jediService = Resource('/jedis');

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
  }]);
}
