'use strict';

require('!style!css!../css/style.css');
const angular = require('angular');
var flowerApp = angular.module('flower', []);
require('./services/resource_services')(flowerApp);

flowerApp.controller('FlowerController',
  ['$scope', '$http', 'Resource', ($scope, $http, Resource) => {
    $scope.flowers = [];
    $scope.gardeners = [];
    var flowerService = Resource('api/flowers');       // eslint-disable-line
    var gardenerService = Resource('api/gardeners');   // eslint-disable-line
    var nCService = Resource('nonCrud/howManyFlowers');   // eslint-disable-line

    $scope.getFlowers = function() {
      flowerService.get((err, res) => {
        if (err) return console.log(err);
        $scope.flowers = res;
      });
    };

    $scope.getGaredeners = function() {
      gardenerService.get((err, res) => {
        if (err) return console.log(err);
        $scope.gardeners = res;
      });
    };

    $scope.getAll = function() {
      $scope.getFlowers();
      $scope.getGaredeners();
      $scope.nC();
    };

    $scope.nC = function() {
      nCService.get((err, res) => {
        if (err) return console.log(err);
        $scope.nonCrud = res;
      });
    };

    $scope.postFlower = function(flower) {
      flowerService.create(flower, (err, res) => {
        if (err) return console.log(err);
        $scope.flowers.push(res);
        $scope.newFlower = null;
        $scope.nC();
      });
    };

    $scope.updateFlower = function(flower) {
      flowerService.update(flower, (err, res) => {
        console.log(res);
        flower.editting = false;
        if (err) return console.log(err);
      });
    };

    $scope.deleteFlower = function(flower) {
      flowerService.delete(flower, (err, res) => {
        if (err) return console.log(err);
        console.log(res);
        $scope.flowers.splice($scope.flowers.indexOf(flower), 1);
        $scope.nC();
      });
    };

    $scope.postGardener = function(gardener) {
      $http.post('http://localhost:3000/api/gardeners', gardener)
        .then((res) => {
          $scope.gardeners.push(res.data);
          $scope.newGardener = null;
          $scope.nC();
        }, (err) => {
          console.log(err);
        });
    };

    $scope.deleteGardener = function(gardener) {
      $http.delete('http://localhost:3000/api/gardeners/' + gardener._id)
        .then((res) => {
          console.log(res.msg);
          $scope.gardeners = $scope.gardeners.filter((i) => i !== gardener);
          $scope.nC();
        }, (err) => {
          console.log(err);
        });
    };

    $scope.updateGardener = function(gardener) {
      $http.put('http://localhost:3000/api/gardeners/' + gardener._id, gardener)
        .then((res) => {
          console.log(res.data);
          gardener.editting = false;
        }, (err) => {
          console.log(err);
          gardener.edditing = false;
        });
    };

}]);
