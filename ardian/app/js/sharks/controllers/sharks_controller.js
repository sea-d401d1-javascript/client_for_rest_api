var angular = require('angular');

module.exports = function(sharksApp) {
  // For the Sharks
  sharksApp.controller('SharksController', ['$scope', '$http', 'myResource', function($scope, $http, Resource) {
    $scope.sharks = [];
    var sharksService = Resource('/sharks');

    $scope.toggleEdit = function(shark) {
      if(shark.backup) {
        var temp = shark.backup;
        $scope.sharks.splice($scope.sharks.indexOf(shark), 1, temp);
      } else {
        shark.backup = angular.copy(shark);
        shark.editing = true;
      }
    };

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
        shark.backup = null;
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
};
