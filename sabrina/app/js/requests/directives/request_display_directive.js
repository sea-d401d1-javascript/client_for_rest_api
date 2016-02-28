module.exports = function(app) {
  app.directive('request', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/requests/directives/request.html',
      scope: {
        requestData: '='
      }
    };
  });
};
