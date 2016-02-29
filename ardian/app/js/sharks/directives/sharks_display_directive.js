module.exports = function(app) {
  app.directive('shark', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/sharks/directives/sharks_display.html',
      scope: {
        sharkData: '='
      }
    };
  });
};
