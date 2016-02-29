module.exports = function(app) {
  app.directive('studentForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/students/directives/student_form_directive.html',
      scope: {
        buttonText: '@',
        student: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.student = $scope.student || {major: 'undecided'};
      }
    };
  });
};
