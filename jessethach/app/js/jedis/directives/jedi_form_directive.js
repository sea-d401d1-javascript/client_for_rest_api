module.exports = function(app) {
  app.directive('jediForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/jedis/directives/jedi_form_directive.html',
      scope: {
        buttonText: '@',
        jedi: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.jedi = $scope.jedi || {lightSaberColor: 'Blue', status: 'Unknown'};
      }
    };
  });
};
