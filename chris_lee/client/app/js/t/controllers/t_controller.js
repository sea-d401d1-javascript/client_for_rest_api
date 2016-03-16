module.exports = function(CSApp) {
  CSApp.controller('TController', ['$scope', '$http', 'csResource', function($scope, $http, Resource) {
    $scope.ts = [];
    var tService = Resource('/t');

    $scope.getT = function() {
      tService.get(function(err, res) {
        if (err) return console.log(err);
        $scope.ts = res;
      })
    };

    $scope.createT = function(t) {
      tService.create(t, function(err, res) {
        if (err) return console.log(err);
        $scope.ts.push(res);
        $scope.newT = null;
      });
    };

    $scope.updateT = function(t) {
      tService.update(t, function(err, res) {
        t.editting = false;
        if (err) return console.log(err);
      });
    };

    $scope.deleteT = function(t) {
      tService.delete(t, function(err, res) {
        if (err) return console.log(err);
        $scope.ts.splice($scope.ts.indexOf(t), 1);
      });
    };

  }]);
}
