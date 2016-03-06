var angular = require('angular');

module.exports = exports = function(app) {
  app.controller('BrewersController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    // $scope.beers = [];
    $scope.brewers = [];
    // var beerService = Resource('/beers');
    var brewerService = Resource('/brewers');

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

    $scope.toggleEditBrewer = function(brewer) {
      if (brewer.backup) {
        var temp = beer.backup;
        $scope.brewers.splice($scope.brewers.indexOf(brewer), 1, temp);
      } else {
        brewer.backup = angular.copy(brewer);
        brewer.editing = true;
      }
    };

    $scope.getAllBrewers = function() {
      brewerService.getAll((err, res) => {
        if (err) return console.log(err);
        $scope.brewers = res;
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

    $scope.postBrewer = function(brewer) {
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

    $scope.deleteBeer = function(brewer) {
      brewerService.delete(brewer, function(err, res) {
        if (err) return console.log(err);
        $scope.brewers.splice($scope.brewers.indexOf(brewer), 1);
      });
    };

    //   $scope.deleteBrewer = function(brewer) {
    //   brewerService.delete(brewer, function(err, res) {
    //     if (err) return console.log(err);
    //     $scope.brewers.splice($scope.brewers.indexOf(brewer), 1);
    //   });
    // };

    $scope.updateBrewer = function(brewer) {
      brewerService.update(brewer, function(err, res) {
        brewer.editing = false;
        brewer.backup = null;
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
