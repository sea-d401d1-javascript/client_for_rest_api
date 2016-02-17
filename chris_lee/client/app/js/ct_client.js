const angular = require('angular');

const bearsApp = angular.module('bearsApp', []);
const baseUri = 'http://localhost:3000/api/ct'

bearsApp.controller('ctController', ['$scope', '$http', ($scope, $http) => {
  $scope.greeting = 'hello world';
  $scope.bears = [];
  // bear.editting = false;

  $http.get(baseUri)
    .then((res) => {
      console.log('success!');
      $scope.bears = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createCT = function(bear) {
    $http.post(baseUri, bear)
      .then((res) => {
        $scope.bears.push(res.data);
        $scope.newBear = null;  // clears form field
      }, (err) => {
        console.log(err);
      })
  }

  $scope.deleteCT = function(bear) {
    $http.delete(baseUri + '/' + bear._id)
      .then((res) => {
        $scope.bears = $scope.bears.filter((i) => i !== bear);
      }, (err) => {
        console.log(err);
      })
  }

  $scope.updateCT = function(bear) {
    $http.put(baseUri + '/' + bear._id, bear)
      .then((res) => {
        $scope.bears[$scope.bears.indexOf(bear)] = bear;
        bear.editting = false;
      }, (err) => {
        console.log(err);
        bear.editting = false;
      })
  }

}]);
