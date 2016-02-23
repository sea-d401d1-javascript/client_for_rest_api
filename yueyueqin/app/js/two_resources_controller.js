const angular = require('angular');
const twoResourcesApp = angular.module('twoResourcesApp', []);
require('./services/resources_service')(twoResourcesApp);
require('./services/resource_store')(twoResourcesApp);

twoResourcesApp.controller('MoviesController',['$scope', '$http', 'twoResource', 'resourceStore', function($scope, $http, Resource, resourceStore) {
  $scope.movies = [];

  var movieService = Resource('/movies');

$scope.getAllMovies = function() {
  movieService.getAll(function(err, res){
    if(err) return console.log(err);
    $scope.movies = res;
  });
};


$scope.createMovie = function(movie) {
  movieService.create(movie,function(err, res) {
    if(err) return console.log(err);
    $scope.movies.push(res);
    $scope.newMovie = null;
  });
};


  $scope.updateMovie = function(movie) {
    movieService.update(movie, function(err,res) {
      if(err) return console.log(err);
      $scope.movies = $scope.movies.map(function(item) {
        if(item._id === movie._id){
          item = movie;
          return item;
        }
        return item;
      });
      movie.editing = false;
    });
  };

  $scope.deleteMovie = function(movie) {
    movieService.delete(movie,function(err, res) {
      if(err) return console.log(err);

      $scope.movies = $scope.movies.filter((item) => {return item._id !== movie._id;});

    });
  };

}]);

twoResourcesApp.controller('ActorsController', ['$scope', '$http', 'twoResource', function($scope, $http, Resource) {
  $scope.actors = [];
  var actorResource = Resource('/actors');

  $scope.getAllActors = function() {
    actorResource.getAll(function(err,res){
      if(err) return console.log(err);
      $scope.actors = res;
    });
  };


  $scope.createActor = function(actor) {
    actorResource.create(actor,function(err,res) {
      if(err) return console.log(err);
      $scope.actors.push(res);
      $scope.newActor = null;
    });
  };


  $scope.updateActor = function(actor) {
    actorResource.update(actor,function(err,res) {
      if(err) return console.log(err);
      $scope.actors = $scope.actors.map(function(item) {
        if(item._id === actor._id){
          item = actor;
          return item;
        }
        return item;
      });
      actor.editing = false;
    });
  };

  $scope.deleteActor =  function(actor) {
    actorResource.delete(actor,function(err,data) {
      if(err) return console.log(err);
      $scope.actors = $scope.actors.filter((item) => item._id !== actor._id);
    });
  };

}]);
