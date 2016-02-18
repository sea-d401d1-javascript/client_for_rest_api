const angular = require('angular');
const studentsApp = angular.module('studentsApp', []);

studentsApp.controller('StudentsController', ['$scope', '$http', function($scope, $http) {
  $scope.students = [];
  $scope._classes = [];

$scope.getAll = function() {
  $http.get('http://localhost:3000/api/students')
    .then((res) => {
      console.log('success!');
      $scope.students = res.data;
    }, (err) => {
      console.log(err);
    });
};

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

  //   $http.get('http://localhost:3000/api/classes')
  //     .then((res) => {
  //       console.log('success!');
  //       $scope._classes = res.data;
  //     }, (err) => {
  //       console.log(err);
  //     });

  // $scope.create_Class = function(_class) {
  //   $http.post('http://localhost:3000/api/classes/', _class)
  //     .then((res) => {
  //       $scope._classes.push(res.data);
  //       $scope.new_Class= null;
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   };

  // $scope.delete_Class = function(_class) {
  //   $http.delete('http://localhost:3000/api/classes/' + _class._id)
  //     .then((res) => {
  //       $scope._classes = $scope._classes.filter((i) => i !== _class);
  //     }, (err) => {
  //       console.log(err);
  //     });
  // };

  // $scope.update_Class = function(_class) {
  //   $http.put('http://localhost:3000/api/classes/' + _class._id, _class)
  //     .then((res) => {
  //       $scope._classes[$scope._classes.indexOf(_class)] = _class;
  //       _class.editing = false;
  //     }, (err) => {
  //       console.log(err);
  //       _class.editing = false;
  //     });
  // };
}]);

  
