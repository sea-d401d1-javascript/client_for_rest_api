module.exports = function(app) {
  app.controller('MoviesController',['$scope', '$http', 'twoResource', 'resourceStore', function($scope, $http, Resource, resourceStore) {
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

};
