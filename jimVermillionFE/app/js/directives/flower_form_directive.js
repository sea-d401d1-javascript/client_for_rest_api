module.exports = function(app) {
  app.directive('flowerForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/flower_form.html',
      scope: {
        buttonText: '@',
        resource: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.flower = $scope.flower || {name: 'Dandy Lion', difficulty_to_grow: 'easy'};
      }
    };
  });
};
