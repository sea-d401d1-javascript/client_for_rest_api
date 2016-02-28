module.exports = function(app) {
  app.directive('sithForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/sithlords/directives/sith_form_directive.html',
      scope: {
        buttonText: '@',
        sith: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.sith = $scope.sith || {lightSaberColor: 'Blue', status: 'Unknown'};
      }
    };
  });
};
