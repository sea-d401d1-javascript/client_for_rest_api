module.exports = function(app) {
  app.directive('movieForm', function() {
    return{
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/movies/directives/movie_form.html',
      scope: {
        buttonText: '@',
        save: '&',
        movie: '='
      },
      controller: function($scope){
        $scope.movie = $scope.movie || {name: 'test', type:'test', actors: 'test', publish:'test'};
      }
    };
  });
};
