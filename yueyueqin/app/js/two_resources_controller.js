const angular = require('angular');
const twoResourcesApp = angular.module('twoResourcesApp', []);

twoResourcesApp.controller('MoviesController',['$scope', '$http', function($scope, $http) {
  $scope.movies = [];

  $scope.getAllMovies = function() {
    $http.get('http://localhost:3000/api/movies')
    .then((res) => {
      $scope.movies = res.data;
    }, (err) => {
      console.log(err);
    });
  };

  $scope.createMovie = function(movie) {
    $http.post('http://localhost:3000/api/movies', movie)
      .then((res) => {
        $scope.movies.push(res.data);
        $scope.newMovie = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateMovie = function (movie){
    $http.put('http://localhost:3000/api/movies/' + movie._id, movie)
      .then((res) => {
        console.log('line30');
        console.log($scope.movies);
        // $scope.movies[$scope.movies.indexOf(movie)] = movie;
        $scope.movies = $scope.movies.map(function(item) {
          if(item._id === movie._id){
            item = movie;
            return item;
          }
          return item;
        });
        console.log('line39');
        console.log($scope.movies);
        movie.editing = false;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteMovie = function (movie) {
    $http.delete('http://localhost:3000/api/movies/' + movie._id)
      .then((res) => {
        console.log('line41');
        console.log($scope.movies);
        $scope.movies = $scope.movies.filter((item) => {return item._id !== movie._id;});
        //$scope.movies.splice($scope.bears.indexOf(bear),1);
        console.log('line 44');
        console.log($scope.movies);
      }, (err) => {
        console.log(err);
      });
  };
}]);

twoResourcesApp.controller('ActorsController', ['$scope', '$http', function($scope, $http) {
  $scope.actors = [];

  $scope.getAllActors = function() {
    $http.get('http://localhost:3000/api/actors')
    .then((res) => {
      $scope.actors = res.data;
    }, (err) => {
      console.log(err);
    });
  };

  $scope.createActor = function(actor) {
    $http.post('http://localhost:3000/api/actors', actor)
      .then((res) => {
        $scope.actors.push(res.data);
        $scope.newActor = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateActor = function (actor){
    $http.put('http://localhost:3000/api/actors/' + actor._id, actor)
      .then((res) => {
        console.log('update');
        $scope.actors = $scope.actors.map(function(item) {
          if(item._id === actor._id){
            item = actor;
            return item;
          }
          return item;
        });
        actor.editing = false;

      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteActor= function (actor) {
    $http.delete('http://localhost:3000/api/actors/' + actor._id)
      .then((res) => {
        $scope.actors = $scope.actors.filter((item) => item._id !== actor._id);
      }, (err) => {
        console.log(err);
      });
  };
}]);
