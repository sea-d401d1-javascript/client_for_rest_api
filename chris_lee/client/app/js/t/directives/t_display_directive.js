module.exports = function(app) {
  app.directive('t', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/t/directives/t.html',
      scope: {
        tData: '='
      }
    };
  });
};
