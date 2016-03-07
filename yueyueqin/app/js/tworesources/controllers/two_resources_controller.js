module.exports = function(app) {
  app.controller('TwoResourcesController', ['$scope', '$http', 'twoResource', 'userAuth', function($scope, $http, Resource, userAuth){
    $scope.movies = [];
    $scope.movie = true;
    $scope.actor = true;

    $scope.logOut = function() {
      userAuth.signOut(function() {
        console.log('logout');
      });
    };

    $scope.showMovie = function() {
      $scope.movie = true;
      $scope.actor = false;
    };

    $scope.showActor = function() {
      $scope.movie = false;
      $scope.actor = true;
    };

    var movieService = Resource('/movies');
    $scope.toggleEditMovie = function(movie) {
      if(movie.backup){
        var temp = angular.copy(movie.backup);
        movie.backup = null;
        $scope.movies.splice($scope.movies.indexOf(movie),1,temp);
      }else{
        movie.backup = angular.copy(movie);
        movie.editing = true;
      }
    };

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
        movie.backup = null;
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

    $scope.actors = [];
    var actorResource = Resource('/actors');

    $scope.toggleEditActor = function(actor) {
      if(actor.backup){
        var temp  = angular.copy(actor.backup);
        actor.backup = null;
        $scope.actors.splice($scope.actors.indexOf(actor), 1, temp);
      }else{
        actor.backup = angular.copy(actor);
        actor.editing = true;
      }
    };

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
        actor.backup = null;
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
};
