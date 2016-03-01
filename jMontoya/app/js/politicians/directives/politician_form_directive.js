module.exports = function(app) {
  app.directive('repform', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: 'templates/politicians/directives/repPolitician_form_directive.html',
      scope: {
        buttonText: '@',
        repPolitician: '=',
        save: "&"
      },
      controller: function($scope) {
        $scope.repPolitician = $scope.repPolitician || {party: 'Rebublican'};
      }
    };
  });
  app.directive('demform', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: 'templates/politicians/directives/demPolitician_form_directive.html',
      scope: {
        buttonText: '@',
        demPolitician: '=',
        save: "&"
      },
      controller: function($scope) {
        $scope.demPolitician = $scope.demPolitician || {party: 'Democrat'};
      }
    };
  });
};
