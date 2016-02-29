module.exports = function(app) {
  app.directive('ct', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/ct/directives/ct.html',
      scope: {
        ctData: '='
      }
    };
  });
};
