module.exports = function(app) {
  app.directive('movieEdit',function() {
    return{
      restric: 'E',
      replace: true,
      transclude: true,
      templateUrl:'/templates/movies/directives/movie_edit.html',
      scope:{
        movieData:'='
      }
    };
  });
};
