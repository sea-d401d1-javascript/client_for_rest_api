var angular = require('angular');

module.exports = function(app) {
  app.controller('DonorsController', ['$scope', '$http', 'cfResource', 'cfStore', function($scope, $http, Resource, cfStore) {
    $scope.donors = [];
    $scope.errors = [];
    var donorService = Resource('/donors');

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexOf(err), 1);
    };

    $scope.getAllDonors = function() {
      donorService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.donors = res;
      });
    };

    $scope.updateDonor = function(donor) {
      donorService.update(donor, function(err, res) {
        $scope.donors[$scope.donors.indexOf(donor)] = donor;
        donor.editing = false;
        if (err) {
          $scope.errors.push('Could not update donor ' + donor.username);
          return console.log(err);
        }
      });
    };

    $scope.deleteDonor = function(donor) {
      if (!donor._id) return setTimeout(function() {$scope.deleteDonor(donor);}, 1000);
      donorService.delete(donor, function(err, res) {
        if (err) {
          $scope.errors.push('Could not delete donor ' + donor.username);
          return console.log(err);
        }
        $scope.donors = $scope.donors.filter((i) => i._id !== donor._id);
      });
    };
  }]);
};
