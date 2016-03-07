const angular = require('angular');

module.exports = function(app) {
  app.controller('StudentsController', ['$scope', '$http', 'cfResource', 'cfStore', function($scope, $http, Resource, cfStore) {
    $scope.greeting = 'Howdy pardner';
    cfStore.set('greeting', 'Howdy pardner');
    $scope.students = [];
    $scope._classes = [];
    var studentService = Resource('/students');
    var _classService = Resource('/classes');


    $scope.toggleEdit = function(student) {
      if (student.backup) {
        var temp = angular.copy(student.backup);
        $scope.students.splice($scope.students.indexOf(student), 1, temp);
      } else {
        student.backup = angular.copy(student);
        student.editing = true;
      }
    };

    $scope.getStudents = function() {
      studentService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.students = res;
      });
    };

    $scope.getClasses = function() {
      _classService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope._classes = res;
      });
    };

    $scope.getAll = function() {
      $scope.getStudents();
      $scope.getClasses();
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

    $scope.createClass = function(_class) {
      _classService.create(_class, function(err, res) {
        if (err) return console.log(err);
        $scope._classes.push(res);
        $scope.newClass = null;
      });
    };

    $scope.deleteClass = function(_class) {
      _classService.delete(_class, function(err, res) {
        if (err) return console.log(err);
        $scope._classes.splice($scope._classes.indexOf(_class), 1);
      });
    };

    $scope.updateClass = function(_class) {
      _classService.update(_class, function(err, res) {
        _class.editing = false;
        _class.backup = null;
        if (err) return console.log(err);
      });
    };
}]);
};
  
