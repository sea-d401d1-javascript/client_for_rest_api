module.exports = function(app) {
  app.directive('myAct', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/activity/directives/act.html',
      scope: {
        actData: '='
      }
    };
  });
};
