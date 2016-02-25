module.exports = function(app) {
  app.directive('dogForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/dogs/directives/dog_form_directive.html',
      scope: {
        buttonText: '@',
        dog: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.dog = $scope.dog || {kibblePreference: 'fish', favoriteToy: 'ball'};
      }
    };
  });
};
