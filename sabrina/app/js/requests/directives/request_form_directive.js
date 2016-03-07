module.exports = function(app) {
  app.directive('requestForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/requests/directives/request_form_directive.html',
      scope: {
        buttonText: '@',
        request: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.request = $scope.request || {giftCard: 'Amazon'};
      }
    };
  });
};
