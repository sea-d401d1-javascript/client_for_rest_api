module.exports = function(app) {
  app.directive('brewerForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/brewers/directives/brewer_form_directive.html',
      scope: {
        buttonText: '@',
        student: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.brewer = $scope.brewer || {name: 'Spiderman', age: 24};
      }
    };
  });
};
