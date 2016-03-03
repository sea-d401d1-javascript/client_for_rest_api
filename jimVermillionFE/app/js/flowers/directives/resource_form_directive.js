module.exports = function(app) {
  app.directive('resourceForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/resource_form.html',
      scope: {
        buttonText: '@',
        resource: '=',
        save: '&',
        attr: '=',
        attrName: '@'
      },
      controller: function($scope) {
        $scope.flower = $scope.flower || {name: 'Dandy Lion', difficulty_to_grow: 'easy'};
      }
    };
  });
};
