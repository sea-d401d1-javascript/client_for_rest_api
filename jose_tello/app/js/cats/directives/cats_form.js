module.exports = function(app) {
  app.directive('catForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/cats/cats_form.html',
      scope: {
        buttonText: '@',
        cat: '=',
        save: '&'
      }
    };
  });
};
