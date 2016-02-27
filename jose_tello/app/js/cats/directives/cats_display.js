module.exports = function(app) {
  app.directive('cat', function() {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      templateUrl: '/templates/cats/cats.html',
      scope: {
        catData: '='
      }
    };
  });
};
