module.exports = function(app) {
  app.directive('tForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/ct/directives/t_form_directive.html',
      scope: {
        buttonText: '@',
        t: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.t = $scope.t || {rifle: 'AK47', pistol: 'Glock', grenade: 'HE', organization: 'Phoenix Organization'};
      }
    };
  });
};
