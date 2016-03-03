const angular = require('angular');

module.exports = function(politiciansApp) {
  politiciansApp.controller('PoliticiansController', ['$scope', '$http', 'Resource', 'polyStore', function($scope, $http, Resource, polyStore) {

    $scope.demGreeting = 'Hello Democrat Voters';
    $scope.fakeDemPolitician={name: 'a fake dem', voted4: 'Washington'};
    polyStore.set('demGreeting', 'hello from dem');
    $scope.demPoliticians = [];
    var demService = Resource('/demPoliticians');

    $scope.repGreeting = 'Hello Republican Voters';
    $scope.fakeRepPolitician={name: 'a fake rep', voted4: 'Lincoln'};
    polyStore.set('repGreeting', 'hello from rep');
    $scope.repPoliticians = [];
    var repService = Resource('/repPoliticians');

    $scope.toggleEdit = function(repPolitician) {
      if (repPolitician.backup) {
        var temp = repPolitician.backup;
        $scope.repPoliticians.splice($scope.repPoliticians.indexOf(repPolitician), 1, temp);
      } else {
        repPolitician.backup = angular.copy(repPolitician);
        repPolitician.editing = true;
      }
    };

    $scope.toggleEdit = function(demPolitician) {
      if (demPolitician.backup) {
        var temp = demPolitician.backup;
        $scope.demPoliticians.splice($scope.demPoliticians.indexOf(demPolitician), 1, temp);
      } else {
        demPolitician.backup = angular.copy(demPolitician);
        demPolitician.editing = true;
      }
    };

    $scope.getDem = function() {
      demService.getDem(function(err, res) {
        if (err) return console.log(err);
        $scope.demPoliticians = res;
      });
    };

    $scope.getRep = function() {
      repService.getRep(function(err, res) {
        if (err) return console.log(err);
        $scope.repPoliticians = res;
      });
    };

    $scope.createDemPolitician = function(demPolitician) {
      $scope.demPoliticians.push(demPolitician);
      demService.create(demPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.demPoliticians.splice($scope.demPoliticians.indexOf(demPolitician), 1, res);
        $scope.demPolitician = null;
      });
    };

    $scope.createRepPolitician = function(repPolitician) {
      $scope.repPoliticians.push(repPolitician);
      repService.create(repPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.repPoliticians.splice($scope.repPoliticians.indexOf(repPolitician), 1, res);
        $scope.repPolitician = null;
      });
    };

    $scope.deleteDemPolitician = function(demPolitician) {
      if (!demPolitician._id) return setTimeout(function() {$scope.deleteDemPolitician(demPolitician);}, 1000);
      demService.delete(demPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.demPoliticians.splice($scope.demPoliticians.indexOf(demPolitician), 1);
      });
    };

    $scope.deleteRepPolitician = function(repPolitician) {
      if (!repPolitician._id) return setTimeout(function() {$scope.deleteRepPolitician(repPolitician);}, 1000);
      repService.delete(repPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.repPoliticians.splice($scope.repPoliticians.indexOf(repPolitician), 1);
      });
    };

    $scope.updateDemPolitician = function(demPolitician) {
      demService.update(demPolitician, function(err, res) {
        demPolitician.editing = false;
        demPolitician.backup = null;
        if (err) return console.log(err);
      });
    };

    $scope.updateRepPolitician = function(repPolitician) {
      repService.update(repPolitician, function(err, res) {
        repPolitician.editing = false;
        repPolitician.backup = null;
        if (err) return console.log(err);
      });
    };
  }]);
};
