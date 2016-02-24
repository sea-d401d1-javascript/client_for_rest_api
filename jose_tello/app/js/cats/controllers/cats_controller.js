module.exports = function(app) {
  app.controller('CatsController', ['$scope', '$http', 'catResource', function($scope, $http, Resource) {
    $scope.cats = [];
    var catsService = Resource('/cats');

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
      catsService.delete(cat, function(err, res) {
        if (err) return console.log(err);
        $scope.cats.splice($scope.cats.indexOf(cat), 1);
      });
    };

    $scope.updateCat = function(cat) {
      catsService.update(cat, function(err, res) {
        cat.editing = false;
        if (err) return console.log(err);
      });
    };
  }]);
};
