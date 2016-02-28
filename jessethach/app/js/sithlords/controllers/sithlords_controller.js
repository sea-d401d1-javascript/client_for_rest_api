module.exports = function(app){
  app.controller('SithlordsController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
    $scope.greeting = 'hello world';
    $scope.sithlords = [];
    var sithService = Resource('/sith-lords');

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
