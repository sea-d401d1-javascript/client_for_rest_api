const angular = require('angular');

module.exports = function(politiciansApp) {
  politiciansApp.controller('PoliticiansController', ['$scope', '$http', 'Resource', 'polyStore', function($scope, $http, Resource, polyStore) {

    $scope.demGreeting = 'Hello Democrat Voters';
    $scope.fakeDemPolitician={name: 'a fake dem', cityFrom: 'Seattle', voted4: 'dem'};
    polyStore.set('greeting', 'hello from dem');
    $scope.demPoliticians = [];
    var demService = Resource('/demPoliticians');

    $scope.repGreeting = 'Hello Republican Voters';
    $scope.fakeRepPolitician={name: 'a fake rep', cityFrom: 'Seattle', voted4: 'rep'};
    polyStore.set('greeting', 'hello from rep');
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
      demService.create(demPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.demPoliticians.push(res);
        $scope.demPolitician = null;
      });
    };

    $scope.createRepPolitician = function(repPolitician) {
      repService.create(repPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.repPoliticians.push(res);
        $scope.repPolitician = null;
      });
    };

    $scope.deleteDemPolitician = function(demPolitician) {
      demService.delete(demPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.demPoliticians.splice($scope.demPoliticians.indexOf(demPolitician), 1);
      });
    };

    $scope.deleteRepPolitician = function(repPolitician) {
      repService.delete(repPolitician, function(err, res) {
        if (err) return console.log(err);
        $scope.repPoliticians.splice($scope.repPoliticians.indexOf(repPolitician), 1);
      });
    };

    $scope.updateDemPolitician = function(demPolitician) {
      demService.update(demPolitician, function(err, res) {
        demPolitician.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.updateRepPolitician = function(repPolitician) {
      repService.update(repPolitician, function(err, res) {
        repPolitician.editing = false;
        if (err) return console.log(err);
      });
    };

  }]);
};
