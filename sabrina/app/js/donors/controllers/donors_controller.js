var angular = require('angular');

module.exports = function(app) {
  app.controller('DonorsController', ['$scope', '$http', 'cfResource', 'cfStore', function($scope, $http, Resource, cfStore) {
    $scope.donors = [];
    var donorService = Resource('/donors');

    $scope.getAllDonors = function() {
      donorService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.donors = res;
      });
    };

    $scope.createDonor = (donor) => {
      $http.post('http://localhost:3000/signup', donor)
        .then((res) => {
          console.log('success creating donor!');
          $scope.donors.push(res.data);
          $scope.newDonor = null;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.updateDonor = function(donor) {
      donorService.update(donor, function(err, res) {
        $scope.donors[$scope.donors.indexOf(donor)] = donor;
        donor.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.deleteDonor = function(donor) {
      if (!donor._id) return setTimeout(function() {$scope.deleteDonor(donor);}, 1000);
      donorService.delete(donor, function(err, res) {
        if (err) return console.log(err);
        $scope.donors = $scope.donors.filter((i) => i._id !== donor._id);
      });
    };
  }]);
};
