module.exports = function(app) {
  app.controller('MoviesController',['$scope', '$http', 'twoResource',  function($scope, $http, Resource) {
    $scope.movies = [];

    var movieService = Resource('/movies');

    $scope.toggleEdit = function(movie) {
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

  }]);

};
