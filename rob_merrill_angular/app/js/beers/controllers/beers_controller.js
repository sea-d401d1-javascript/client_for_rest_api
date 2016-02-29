var angular = require('angular');

module.exports = function(app) {
  app.controller('BeersController', ['$scope', '$http', 'Resource', 'store', function($scope, $http, Resource, store) {
    
    $scope.beerGreeting = 'hello world';
    $scope.fakeBeer={name: 'a fake beer', style: 'stout'};
    store.set('greeting', 'hello world');
    $scope.beers = [];
    var beerService = Resource('/beers');

    $scope.brewerGreeting = 'hello world';
    $scope.fakeBrewer={name: 'a fake brewer', age: 34};
    store.set('greeting', 'hello world');
    $scope.brewers = [];
    var brewerService = Resource('/brewers');


    $scope.toggleEdit = function(beer) {
      if (beer.backup) {
        var temp = beer.backup;
        $scope.beers.splice($scope.beers.indexOf(beer), 1, temp);
      } else {
        beer.backup = angular.copy(beer);
        beer.editing = true;
      }
    };

    $scope.getAll = function () {
      beerService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.beers = res;
      });
    };

    $scope.createBeer = function(beer) {
      $scope.beers.push(beer);
      beerService.create(beer, function(err, res) {
        if (err) return console.log(err);
        $scope.beers.splice($scope.beers.indexOf(beer), 1, res);
        $scope.newBeer = null;
      });
    };

    $scope.createBrewer = function(brewer) {
      $scope.brewers.push(brewer);
      brewerService.create(brewer, function(err, res) {
        if (err) return console.log(err);
        $scope.brewers.splice($scope.brewers.indexOf(brewer), 1, res);
        $scope.newBrewer = null;
      });
    };

    $scope.deleteBeer = function(beer) {
      if (!beer._id) return setTimeout(function() {$scope.deleteBeer(beer);}, 1000);
      beerService.delete(beer, function(err, res) {
        if (err) return console.log(err);
        $scope.beers.splice($scope.beers.indexOf(beer), 1);
      });
    };

      $scope.deleteBrewer = function(brewer) {
      if (!brewer._id) return setTimeout(function() {$scope.deleteBrewer(brewer);}, 1000);
      brewerService.delete(brewer, function(err, res) {
        if (err) return console.log(err);
        $scope.brewers.splice($scope.brewers.indexOf(brewer), 1);
      });
    };

    $scope.updateBeer = function(beer) {
      beerService.update(beer, function(err, res) {
        beer.editing = false;
        beer.backup = null;
        if (err) return console.log(err);
      });
    };

    $scope.updateBrewer = function(brewer) {
      brewerService.update(brewer, function(err, res) {
        brewer.editing = false;
        brewer.backup = null;
        if (err) return console.log(err);
      });
    };
  }]);
};
