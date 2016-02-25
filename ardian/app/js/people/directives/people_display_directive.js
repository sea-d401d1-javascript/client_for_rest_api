module.exports = function(app) {
  app.directive('people', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/people/directives/people_display.html',
      scope: {
        peopleData: '='
      }
    };
  });
};
