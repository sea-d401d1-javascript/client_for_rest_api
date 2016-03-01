module.exports = function(app) {
  app.directive('beer', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/beer.html',
      scope: {
        beerData: '='
      }
    };
  });
};
