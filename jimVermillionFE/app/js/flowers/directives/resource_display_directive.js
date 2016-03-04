module.exports = function(app) {
  app.directive('resource', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/resource_display.html',
      scope: {
        attrName: '@',
        attr: '=',
        resourceData: '=',
        resource: '@',
      }
    };
  });
};
