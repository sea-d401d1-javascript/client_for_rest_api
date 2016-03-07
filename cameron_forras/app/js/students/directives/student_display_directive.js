module.exports = function(app) {
  app.directive('student', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/students/directives/student.html',
      scope: {
        studentData: '='
      }
    };
  });
};
