module.exports = function(app) {
  app.directive('repform', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/politicians/directives/rep_politician_form_directive.html',
      scope: {
        buttonText: '@',
        reppolitician: '=',
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
      templateUrl: '/templates/politicians/directives/dem_politician_form_directive.html',
      scope: {
        buttonText: '@',
        dempolitician: '=',
        save: "&"
      },
      controller: function($scope) {
        $scope.demPolitician = $scope.demPolitician || {party: 'Democrat'};
      }
    };
  });
};
