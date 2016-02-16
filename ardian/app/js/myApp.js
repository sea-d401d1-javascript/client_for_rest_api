const angular = require('angular');

const myApp = angular.module('sharksApp', []);

myApp.controller('sharksController', ['$scope', '$http', ($scope, $http) => {
  $scope.sharks = [];

  $http.get('http://localhost:3000/api/sharks')
    .then((res) => {
      console.log('success!');
      $scope.sharks = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createShark = function(shark) {
    $http.post('http://localhost:3000/api/sharks', shark)
      .then((res) => {
        $scope.sharks.push(res.data);
        $scope.newShark = null;
      }, (err) => {
        console.log(err);
      })
  }

  $scope.updateShark = function(shark) {
    $http.put('http://localhost:3000/api/sharks/' + shark._id, shark)
      .then((res) => {
        $scope.sharks[$scope.sharks.indexOf(shark)] = shark;
        shark.editting = false;
      }, (err) => {
        console.log(err);
        shark.editting = false;
      })
  }

  $scope.deleteShark = function(shark) {
    $http.delete('http://localhost:3000/api/sharks/' + shark._id)
      .then((res) => {
        $scope.sharks = $scope.sharks.filter((i) => i !== shark);
      }, (err) => {
        console.log(err)
      })
  }
}]);

myApp.controller('peoplesController', ['$scope', '$http', ($scope, $http) => {
  $scope.peoples = [];

  $http.get('http://localhost:3000/api/people')
    .then((res) => {
      console.log('success!');
      $scope.peoples = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createPeople = function(people) {
    $http.post('http://localhost:3000/api/people', people)
      .then((res) => {
        $scope.peoples.push(res.data);
        $scope.newPeople = null;
      }, (err) => {
        console.log(err);
      })
  }

  $scope.updatePeople = function(people) {
    $http.put('http://localhost:3000/api/people/' + people._id, people)
      .then((res) => {
        $scope.peoples[$scope.peoples.indexOf(people)] = people;
        people.editting = false;
      }, (err) => {
        console.log(err);
        people.editting = false;
      })
  }

  $scope.deletePeople = function(people) {
    $http.delete('http://localhost:3000/api/people/' + people._id)
      .then((res) => {
        $scope.peoples = $scope.peoples.filter((i) => i !== people);
      }, (err) => {
        console.log(err)
      })
  }
}]);
