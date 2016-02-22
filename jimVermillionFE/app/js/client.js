'use strict';

require('!style!css!../css/style.css');
const angular = require('angular');
var flowerApp = angular.module('flower', []);
require('./services/resource_services')(flowerApp);

flowerApp.controller('FlowerController',
  ['$scope', '$http', 'Resource', ($scope, $http, Resource) => {
    $scope.flowers = [];
    $scope.gardeners = [];
    var flowerService = Resource('api/flowers');          // eslint-disable-line
    var gardenerService = Resource('api/gardeners');      // eslint-disable-line
    var nCService = Resource('nonCrud/howManyFlowers');   // eslint-disable-line

    function handleError(err) {
        return console.log(err);
    }

    $scope.getFlowers = function() {
      flowerService.get((err, res) => {
        handleError(err);
        $scope.flowers = res;
      });
    };

    $scope.getGaredeners = function() {
      gardenerService.get((err, res) => {
        handleError(err);
        $scope.gardeners = res;
      });
    };

    $scope.nC = function() {
      nCService.get((err, res) => {
        handleError(err);
        $scope.nonCrud = res;
      });
    };

    $scope.getAll = function() {
      $scope.getFlowers();
      $scope.getGaredeners();
      $scope.nC();
    };

    $scope.postFlower = function(flower) {
      flowerService.create(flower, (err, res) => {
        handleError(err);
        $scope.flowers.push(res);
        $scope.newFlower = null;
        $scope.nC();
      });
    };

    $scope.updateFlower = function(flower) {
      flowerService.update(flower, (err, res) => {  // eslint-disable-line
        flower.editting = false;
        handleError(err);
      });
    };

    $scope.deleteFlower = function(flower, index) {
      flowerService.delete(flower, (err, res) => { // eslint-disable-line
        handleError(err);
        $scope.flowers.splice(index, 1);
        $scope.nC();
      });
    };

    $scope.postGardener = function(gardener) {
      gardenerService.create(gardener, (err, res) => {
        handleError(err);
        $scope.gardeners.push(res);
        $scope.newGardener = null;
        $scope.nC();
      });
    };

    $scope.deleteGardener = function(gardener, index) {
      gardenerService.delete(gardener, (err, res) => { // eslint-disable-line
        handleError(err);
        $scope.gardeners.splice(index, 1);
        $scope.nC();
      });
    };

    $scope.updateGardener = function(gardener) {
      gardenerService.update(gardener, (err, res) => { // eslint-disable-line
        gardener.editting = false;
        handleError(err);
      });
    };
}]);
