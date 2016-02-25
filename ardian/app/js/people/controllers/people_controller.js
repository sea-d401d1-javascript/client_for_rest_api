var angular = require('angular');

module.exports = function(peopleApp) {
  // For the People
  peopleApp.controller('PeoplesController', ['$scope', '$http', 'myResource', function($scope, $http, Resource) {
    $scope.peoples = [];
    var peopleService = Resource('/people');

    $scope.toggleEdit = function(people) {
      if(people.backup) {
        var temp = people.backup;
        $scope.peoples.splice($scope.peoples.indexOf(people), 1, temp);
      } else {
        people.backup = angular.copy(people);
        people.editing = true;
      }
    };

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
        people.backup = null;
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
}
