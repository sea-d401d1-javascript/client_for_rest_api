module.exports = function(app) {
  app.directive('dog', function() {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      templateUrl: '/templates/dogs/dogs.html',
      scope: {
        dogData: '='
      }
    };
  });
};
