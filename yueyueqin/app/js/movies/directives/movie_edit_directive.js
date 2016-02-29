module.exports = function(app) {
  app.directive('movieEdit',function() {
    return{
      restric: 'E',
      transclude: true,
      replace: true,
      templateUrl:'./templates/movies/directives/movie_edit.html',
      scope:{
        movieData:'='
      }
    };
  });
};
