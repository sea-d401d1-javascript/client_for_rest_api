const angular = require('angular');

const myApp = angular.module('myApp', []);

require('./services/resource')(myApp);

// For the Sharks
myApp.controller('SharksController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
  $scope.sharks = [];
  var sharksService = Resource('/sharks');

  $scope.getAll = function() {
    sharksService.getAll(function(err, res) {
      if (err) return console.log(err);
      $scope.sharks = res;
    });
  };

  $scope.createShark = function(shark) {
    sharksService.create(shark, function(err, res) {
      if (err) return console.log(err);
      $scope.sharks.push(res);
      $scope.newShark = null;
    });
  };

  $scope.updateShark = function(shark) {
    sharksService.update(shark, function(err, res) {
      shark.editing = false;
      if (err) return console.log(err);
    });
  };

  $scope.deleteShark = function(shark) {
    sharksService.delete(shark, function(err, res) {
      if (err) return console.log(err);
      $scope.sharks.splice($scope.sharks.indexOf(shark), 1);
    });
  };

}]); // end of Sharks


// For the People
myApp.controller('PeoplesController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
  $scope.peoples = [];
  var peopleService = Resource('/people');

  $scope.getAllPeople = function() {
    peopleService.getAllPeople(function(err, res) {
      if (err) return console.log(err);
      $scope.peoples = res;
    });
  };

  $scope.createPeople = function(people) {
    peopleService.create(people, function(err, res) {
      if (err) return console.log(err);
      $scope.peoples.push(res);
      $scope.newPeople = null;
    });
  };

  $scope.updatePeople = function(people) {
    peopleService.update(people, function(err, res) {
      people.editing = false;
      if (err) return console.log(err);
    });
  };

  $scope.deletePeople = function(people) {
    peopleService.delete(people, function(err, res) {
      if (err) return console.log(err);
      $scope.peoples.splice($scope.peoples.indexOf(people), 1);
    });
  };

}]); // end of People
