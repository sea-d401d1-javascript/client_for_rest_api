module.exports = function(app) {
  app.directive('dog', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/dogs/directives/dog.html',
      scope: {
        dogData: '='
      }
    };
  });
};
