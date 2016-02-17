const angular = require('angular');

const studentsApp = angular.module('studentsApp', []);

studentsApp.controller('studentsController', ['$scope', '$http', ($scope, $http) => {
  $scope.students = [];

  $http.get('http://localhost:3000/api/students')
    .then((res) => {
      console.log('success!');
      $scope.students = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createStudent = function(student) {
    $http.post('http://localhost:3000/api/students/', student)
      .then((res) => {
        $scope.students.push(res.data);
        $scope.newStudent= null;
      }, (err) => {
        console.log(err);
      });
    };

  $scope.deleteStudent = function(student) {
    $http.delete('http://localhost:3000/api/students/' + student._id)
      .then((res) => {
        $scope.students = $scope.students.filter((i) => i !== student);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateStudent = function(student) {
    $http.put('http://localhost:3000/api/students/' + student._id, student)
      .then((res) => {
        $scope.students[$scope.students.indexOf(student)] = student;
        student.editing = false;
      }, (err) => {
        console.log(err);
        student.editing = false;
      });
  };
}]);
