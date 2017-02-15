module.exports = function(CSApp) {
  CSApp.controller('CTController', ['$scope', '$http', 'csResource', function($scope, $http, Resource) {
    $scope.cts = [];
    var ctService = Resource('/ct');

    $scope.getCT = function() {
      ctService.get(function(err, res) {
        if (err) return console.log(err);
        $scope.cts = res;
      })
    };

    $scope.createCT = function(ct) {
      ctService.create(ct, function(err, res) {
        if (err) return console.log(err);
        $scope.cts.push(res);
        $scope.newCT = null;
      });
    };

    $scope.updateCT = function(ct) {
      ctService.update(ct, function(err, res) {
        ct.editting = false;
        if (err) return console.log(err);
      });
    };

    $scope.deleteCT = function(ct) {
      ctService.delete(ct, function(err, res) {
        if (err) return console.log(err);
        $scope.cts.splice($scope.cts.indexOf(ct), 1);
      });
    };
  }]);
}
