module.exports = function(app){
  app.controller('SithlordsController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
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
}
