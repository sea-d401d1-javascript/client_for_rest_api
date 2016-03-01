module.exports = function(app) {
  app.directive('flower', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/flower_app_resource.html',
      scope: {
        flowerData: '='
      }
    };
  });
};
