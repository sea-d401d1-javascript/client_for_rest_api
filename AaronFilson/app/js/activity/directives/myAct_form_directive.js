module.exports = function(app) {
  app.directive('activityForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/activity/directives/myAct_form_directive.html',
      scope: {
        buttonText: '@',
        newAct: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.myAct = $scope.myAct || {shoes: 'running'};
      }
    };
  });
};
