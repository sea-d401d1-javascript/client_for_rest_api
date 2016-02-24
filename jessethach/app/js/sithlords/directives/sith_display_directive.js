module.exports = function(app) {
  app.directive('sith', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/sithlords/directives/sith.html',
      scope: {
        sithData: '@'
      }
    };
  });
};
