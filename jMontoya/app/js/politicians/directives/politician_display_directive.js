module.exports = function(app) {
  app.directive('reppolitician', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/templates/politicians/directives/repDirective.html',
      scope: {
        repPoliticianData: '='
      }
    };
  });
  app.directive('dempolitician', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/js/templates/politicians/directives/demDirective.html',
      scope: {
        demPoliticianData: '='
      }
    };
  });
};
