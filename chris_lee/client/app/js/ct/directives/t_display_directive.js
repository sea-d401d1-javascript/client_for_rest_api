module.exports = function(app) {
  app.directive('tDisplay', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/ct/directives/t_display_directive.html',
      scope: {
        tData: '='
      }
    };
  });
};
