var angular = require('angular');

module.exports = function(app) {
  app.controller('BeersController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    $scope.beers = [];
    var beerService = Resource('/beers');
  

    $scope.toggleEditBeer = function(beer) {
      if (beer.backup) {
        var temp = angular.copy(beer.backup);
        $scope.beers.splice($scope.beers.indexOf(beer), 1, temp);
      } else {
        beer.backup = angular.copy(beer);
        beer.editing = true;
      }
    };

     $scope.getAllBeer = function() {
      beerService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.beers = res;
      });
    };

   

    $scope.createBeer = function(beer) {
      beerService.create(beer, function(err, res) {
        if (err) return console.log(err);
        $scope.beers.push(res);
        $scope.newBeer = null;
      });
    };

  

    $scope.deleteBeer = function(beer) {
      beerService.delete(beer, function(err, res) {
        if (err) return console.log(err);
        $scope.beers = $scope.beers.filter((i) => i !== beer);
      });
    };

    $scope.updateBeer = function(beer) {
      beerService.update(beer, function(err, res) {
        beer.editing = false;
        if (err) return console.log(err);
      });
    };

  }]);
};

