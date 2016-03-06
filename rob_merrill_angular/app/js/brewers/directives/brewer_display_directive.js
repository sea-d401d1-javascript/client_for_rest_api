module.exports = function(app) {
  app.directive('brewer', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/brewers/directives/brewer.html',
      scope: {
        studentData: '='
      }
    };
  });
};
