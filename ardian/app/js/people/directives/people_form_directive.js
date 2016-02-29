module.exports = function(app) {
  app.directive('peopleForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/people/directives/people_form.html',
      scope: {
        buttonText: '@',
        people: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.people = $scope.people;
      }
    };
  });
};
