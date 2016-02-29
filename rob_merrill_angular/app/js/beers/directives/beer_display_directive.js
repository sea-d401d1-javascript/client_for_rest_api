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
  

  app.directive('brewer', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/brewers/directives/brewer.html',
      scope: {
        brewerData: '='
      }
    };
  });

};
