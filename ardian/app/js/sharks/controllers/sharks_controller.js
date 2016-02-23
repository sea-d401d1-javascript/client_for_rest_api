module.exports = function(sharksApp) {
  // For the Sharks
  sharksApp.controller('SharksController', ['$scope', '$http', 'myResource', function($scope, $http, Resource) {
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
};
