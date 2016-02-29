module.exports = function(app) {
  app.controller('DogsController', ['$scope', '$http', 'dogResource', function($scope, $http, Resource) {
    $scope.dogs = [];
    var dogsService = Resource('/dogs');

    $scope.toggleEdit = function(dog) {
      if (dog.backup) {
        var temp = dog.backup;
        $scope.dogs.splice($scope.dogs.indexOf(dog), 1, temp);
      } else {
        dog.backup = angular.copy(dog);
        dog.editing = true;
      }
    };

    $scope.getDogs = function() {
      dogsService.get(function(err, res) {
        if (err) return console.log(err);
        $scope.dogs = res;
      });
    };

    $scope.createDog = function(dog) {
      dogsService.create(dog, function(err, res) {
        if (err) return console.log(err);
        $scope.dogs.push(res);
        $scope.newDog = null;
      });
    };

    $scope.deleteDog = function(dog) {
      if (!dog._id) return setTimeout(function() { $scope.deleteDog(dog); }, 1000);
      dogsService.delete(dog, function(err, res) {
        if (err) return console.log(err);
        $scope.dogs.splice($scope.dogs.indexOf(dog), 1);
      });
    };

    $scope.updateDog = function(dog) {
      dogsService.update(dog, function(err, res) {
        dog.editing = false;
        dog.backup = null;
        if (err) return console.log(err);
      });
    };
  }]);
};
