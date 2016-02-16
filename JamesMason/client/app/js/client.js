const angular = require('angular');
const forceApp = angular.module('forceApp', []);
forceApp.controller('forceController', ['$scope', '$http', ($scope, $http) => {
  $scope.greeting = 'hello world';
  $scope.jedi = [];
  $http.get('http://localhost:3000/api/light')
    .then((res) => {
      console.log('success!');
      $scope.bears = res.data;
    }, (err) => {
      console.log(err);
    });
  $scope.createJedi = function(newJedi) {
    $http.post('http://localhost:3000/api/light', newJedi)
      .then((res) => {
        $scope.jedi.push(res.data);
        $scope.newJedi = null;
      }, (err) => {
        console.log(err);
      })
  }
  $scope.deleteJedi = function(jediToDelete) {
    $http.delete('http://localhost:3000/api/light/' + jediToDelete._id)
      .then((res) => {
        $scope.bears = $scope.jedi.filter((i) => i !== jediToDelete);
      }, (err) => {
        console.log(err)
      })
  }
  $scope.updateJedi = function(jediToUpdate) {
    $http.put('http://localhost:3000/api/light/' + jediToUpdate._id, jediToUpdate)
      .then((res) => {
        $scope.jedi[$scope.jedi.indexOf(jediToUpdate)] = jediToUpdate;
        jediToUpdate.editting = false;
      }, (err) => {
        console.log(err);
        jediToUpdate.editting = false;
      })
  }
}]);
