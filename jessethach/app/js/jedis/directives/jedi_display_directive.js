module.exports = function(app) {
  app.directive('jedi', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/jedis/directives/jedi.html',
      scope: {
        jediData: '@'
      }
    };
  });
};
