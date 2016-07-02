module.exports = function(app) {
  app.directive('dogForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/dogs/dogs_form.html',
      scope: {
        buttonText: '@',
        dog: '=',
        save: '&'
      }
    };
  });
};
