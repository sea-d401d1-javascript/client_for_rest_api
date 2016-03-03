module.exports = function(app) {
  app.directive('repform', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/politicians/directives/reppolitician_form_directive.html',
      scope: {
        buttonText: '@',
        reppolitician: '=',
        save: "&"
      },
      controller: function($scope) {
        $scope.repPolitician = $scope.repPolitician || {party: 'Republican'};
      }
    };
  });
  app.directive('demform', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/politicians/directives/dempolitician_form_directive.html',
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
