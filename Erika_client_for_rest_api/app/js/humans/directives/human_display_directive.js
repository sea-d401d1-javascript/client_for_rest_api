module.exports = function(app) {
  app.directive('human', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/humans/directives/human.html',
      scope: {
        humanData: '='
      }
    };
  });
};
