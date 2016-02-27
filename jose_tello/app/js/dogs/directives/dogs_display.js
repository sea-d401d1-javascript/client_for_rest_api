module.exports = function(app) {
  app.directive('dog', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: '/templates/dogs/dogs.html',
      scope: {
        dogData: '='
      }
    };
  });
};
