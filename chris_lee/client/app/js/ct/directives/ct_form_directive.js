module.exports = function(app) {
  app.directive('ctForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/ct/directives/ct_form_directive.html',
      scope: {
        buttonText: '@',
        ct: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.ct = $scope.ct || {rifle: 'M4A1', pistol: 'USP', grenade: 'Flashbang', organization: 'SEAL Team 6'};
      }
    };
  });
};
