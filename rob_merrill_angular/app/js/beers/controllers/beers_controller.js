var angular = require('angular');

module.exports = exports = function(app) {
  app.controller('BeersController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    $scope.beers = [];
    // $scope.brewers = [];
    var beerService = Resource('/beers');
    // var brewerService = Resource('/brewers');

    // $scope.beerGreeting = 'hello world';
    // $scope.fakeBeer={name: 'a fake beer', style: 'stout'};
    // store.set('greeting', 'hello world');
    // $scope.beers = [];
    // var beerService = Resource('/beers');

    // $scope.brewerGreeting = 'hello world';
    // $scope.fakeBrewer={name: 'a fake brewer', age: 34};
    // store.set('greeting', 'hello world');
    // $scope.brewers = [];
    // var brewerService = Resource('/brewers');

    // function handleError(err) {
    //   return console.log(err);
    // };

    $scope.toggleEdit = function(beer) {
      if (beer.backup) {
        var temp = beer.backup;
        $scope.beers.splice($scope.beers.indexOf(beer), 1, temp);
      } else {
        beer.backup = angular.copy(beer);
        beer.editing = true;
      }
    };

    $scope.getAllBeers = function() {
      beerService.getAll((err, res) => {
        if (err) return console.log(err);
        $scope.beers = res;
      });
    };

    // $scope.getBrewers = function() {
    //   brewerService.get((err, res) => {
    //     if (err) handleError(err);
    //     $scope.brewers = res;
    //   });
    // };

    // $scope.getAll = function () {
    //   $scope.getBeers();
    //   $scope.getBrewers();
    // };

    $scope.postBeer = function(beer) {
      beerService.create(beer, function(err, res) {
        if (err) return console.log(err);
        $scope.beers.push(res);
        $scope.newBeer = null;
      });
    };

    // $scope.postBrewer = function(brewer) {
    //   brewerService.create(brewer, function(err, res) {
    //     if (err) return console.log(err);
    //     $scope.brewers.push(res);
    //     $scope.newBrewers = null;
    //   });
    // };

    $scope.deleteBeer = function(beer) {
      beerService.delete(beer, function(err, res) {
        if (err) return console.log(err);
        $scope.beers.splice($scope.beers.indexOf(beer), 1);
      });
    };

    //   $scope.deleteBrewer = function(brewer) {
    //   brewerService.delete(brewer, function(err, res) {
    //     if (err) return console.log(err);
    //     $scope.brewers.splice($scope.brewers.indexOf(brewer), 1);
    //   });
    // };

    $scope.updateBeer = function(beer) {
      beerService.update(beer, function(err, res) {
        beer.editing = false;
        beer.backup = null;
        if (err) return console.log(err);
      });
    };

    // $scope.updateBrewer = function(brewer) {
    //   brewerService.update(brewer, function(err, res) {
    //     brewer.editing = false;
    //     brewer.backup = null;
    //     if (err) return console.log(err);
    //   });
    // };
  }]);
};
