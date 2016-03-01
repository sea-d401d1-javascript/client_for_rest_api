module.exports = function(app) {
  app.directive('beerForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/beer_form_directive.html',
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
};

