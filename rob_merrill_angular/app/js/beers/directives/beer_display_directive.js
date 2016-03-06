module.exports = function(app) {
  app.directive('beer', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/beers/directives/beer.html',
      scope: {
        beerData: '='
      }
    };
  });
};
