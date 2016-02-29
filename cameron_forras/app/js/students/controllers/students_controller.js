const angular = require('angular');

module.exports = function(app) {
  app.controller('StudentsController', ['$scope', '$http', 'cfResource', 'cfStore', function($scope, $http, Resource, cfStore) {
    $scope.greeting = 'Howdy pardner';
    cfStore.set('greeting', 'Howdy pardner');
    $scope.students = [];
    var studentService = Resource('/students');

    $scope.toggleEdit = function(student) {
      if (student.backup) {
        var temp = angular.copy(student.backup);
        $scope.students.splice($scope.students.indexOf(student), 1, temp);
      } else {
        student.backup = angular.copy(student);
        student.editing = true;
      }
    };

    $scope.getAllStudents = function() {
      studentService.getAllStudents(function(err, res) {
        if (err) return console.log(err);
        $scope.students = res;
      });
    };

    $scope.createStudent = function(student) {
      studentService.create(student, function(err, res) {
        if (err) return console.log(err);
        $scope.students.push(res);
        $scope.newStudent = null;
      });
    };

    $scope.deleteStudent = function(student) {
      studentService.delete(student, function(err, res) {
        if (err) return console.log(err);
        $scope.students.splice($scope.students.indexOf(student), 1);
      });
    };

    $scope.updateStudent = function(student) {
      studentService.update(student, function(err, res) {
        student.editing = false;
        student.backup = null;
        if (err) return console.log(err);
      });
    };
}]);
};
  
