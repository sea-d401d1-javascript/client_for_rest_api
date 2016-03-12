module.exports = function(app) {
  app.directive('ctDisplay', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/ct/directives/ct_display_directive.html',
      scope: {
        ctData: '='
      }
    };
  });
};
