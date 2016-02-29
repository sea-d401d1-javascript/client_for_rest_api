const angular = require('angular');
const studentsApp = angular.module('studentsApp', []);

require('./services')(studentsApp);
require('./students')(studentsApp);

studentsApp.controller('StudentsController', ['$scope', '$http', function($scope, $http) {
  $scope._classes = [];

  $scope.getAllClasses = function() {
    $http.get('http://localhost:3000/api/classes')
      .then((res) => {
        console.log('success!');
        $scope._classes = res.data;
    }, (err) => {
        console.log(err);
    });
  };
  
  $scope.create_Class = function(_class) {
    $http.post('http://localhost:3000/api/classes/', _class)
      .then((res) => {
        $scope._classes.push(res.data);
        $scope.new_Class= null;
      }, (err) => {
        console.log(err);
      });
    };

  $scope.delete_Class = function(_class) {
    $http.delete('http://localhost:3000/api/classes/' + _class._id)
      .then((res) => {
        $scope._classes = $scope._classes.filter((i) => i !== _class);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.update_Class = function(_class) {
    $http.put('http://localhost:3000/api/classes/' + _class._id, _class)
      .then((res) => {
        $scope._classes[$scope._classes.indexOf(_class)] = _class;
        _class.editing = false;
      }, (err) => {
        console.log(err);
        _class.editing = false;
      });
  };
}]);

  
