module.exports = function(app) {
  app.directive('sharkForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/sharks/directives/sharks_form.html',
      scope: {
        buttonText: '@',
        shark: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.sharks = $scope.sharks;
      }
    };
  });
};
