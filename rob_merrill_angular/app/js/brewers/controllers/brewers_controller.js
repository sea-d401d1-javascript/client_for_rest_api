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
        var temp = angular.compy(brewer.backup);
        $scope.brewers.splice($scope.brewers.indexOf(brewer), 1, temp);
      } else {
        brewer.backup = angular.copy(brewer);
        brewer.editing = true;
      }
    };

    $scope.getAllBrewer = function() {
      brewerService.getAll(function(err, res) {
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

    $scope.createBrewer = function(brewer) {
      brewerService.create(brewer, function(err, res) {
        if (err) return console.log(err);
        $scope.brewers.push(res);
        $scope.newBrewer = null;
      });
    };

    // $scope.postBrewer = function(brewer) {
    //   brewerService.create(brewer, function(err, res) {
    //     if (err) return console.log(err);
    //     $scope.brewers.push(res);
    //     $scope.newBrewers = null;
    //   });
    // };

    $scope.deleteBrewer = function(brewer) {
      brewerService.delete(brewer, function(err, res) {
        if (err) return console.log(err);
        $scope.brewers = $scope.brewers.filter((i) => i !== brewer);
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
