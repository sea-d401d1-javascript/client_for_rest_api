module.exports = function(app) {
  app.directive('humanForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/humans/directives/human_form_directive.html',
      scope: {
        buttonText: '@',
        human: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.human = $scope.human || {dogPreference: 'Akita', fitnessLevel: '3'};
      }
    };
  });
};
