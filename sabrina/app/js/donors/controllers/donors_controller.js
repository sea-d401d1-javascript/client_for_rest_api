var angular = require('angular');

module.exports = function(app) {
  app.controller('DonorsController', ['$scope', '$http', function($scope, $http) {
    $scope.donors = [];

    $scope.getAllDonors = function() {
      $http.get('http://localhost:3000/api/donors')
        .then((res) => {
          console.log('success getting all donors!');
          $scope.donors = res.data;
        }, (err) => {
          console.log(err);
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

    $scope.updateDonor = (donor) => {
      $http.put('http://localhost:3000/api/donors/' + donor._id, donor)
        .then((res) => {
          console.log('success updating donor!');
          $scope.donors[$scope.donors.indexOf(donor)] = donor;
          donor.editing = false;
        }, (err) => {
          console.log(err);
          donor.editing = false;
        });
    };

    $scope.deleteDonor = (donor) => {
      $http.delete('http://localhost:3000/api/donors/' + donor._id)
        .then((res) => {
          console.log('success deleting donor!');
          $scope.donors = $scope.donors.filter((i) => i._id !== donor._id);
        }, (err) => {
          console.log(err);
        });
    };
  }]);
};
