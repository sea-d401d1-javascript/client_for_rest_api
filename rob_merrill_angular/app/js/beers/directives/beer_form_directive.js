module.exports = function(app) {
  app.directive('beerForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/beers/directives/beer_form_directive.html',
      scope: {
        buttonText: '@',
        bear: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.beer = $scope.beer || {style: 'stout', ibu: 24};
      }
    };
  });

  app.directive('brewerForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/brewers/directives/brewer_form_directive.html',
      scope: {
        buttonText: '@',
        bear: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.brewer = $scope.brewer || {name: 'Joe', age: 34};
      }
    };
  });

};
