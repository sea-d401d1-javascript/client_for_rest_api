module.exports = function(app) {
  app.controller('CatsController', ['$scope', '$http', 'catResource', function($scope, $http, Resource) {
    $scope.cats = [];
    $scope.errors = [];
    var catsService = Resource('/cats');

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexOf(err), 1);
    };

    $scope.toggleEdit = function(cat) {
      if (cat.backup) {
        var temp = cat.backup;
        $scope.cats.splice($scope.cats.indexOf(cat), 1, temp);
      } else {
        cat.backup = angular.copy(cat);
        cat.editing = true;
      }
    };

    $scope.getCats = function() {
      catsService.get(function(err, res) {
        if (err) return console.log(err);
        $scope.cats = res;
      });
    };

    $scope.createCat = function(cat) {
      catsService.create(cat, function(err, res) {
        if (err) return console.log(err);
        $scope.cats.push(res);
        $scope.newCat = null;
      });
    };

    $scope.deleteCat = function(cat) {
      if (!cat._id) return setTimeout(function() { $scope.deleteCat(cat); }, 1000);
      catsService.delete(cat, function(err, res) {
        if (err) return console.log(err);
        $scope.cats.splice($scope.cats.indexOf(cat), 1);
      });
    };

    $scope.updateCat = function(cat) {
      catsService.update(cat, function(err, res) {
        cat.editing = false;
        cat.backup = null;
        if (err) return console.log(err);
      });
    };
  }]);
};
