module.exports = function(app) {
  app.directive('cat', function() {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      templateUrl: '/templates/cats/cats.html',
      scope: {
        catData: '='
      }
    };
  });
};
