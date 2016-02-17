'use strict';

require('!style!css!../css/style.css');
const angular = require('angular');

var flowerApp = angular.module('flower', []);

flowerApp.controller('FlowerController',
  ['$scope', '$http', ($scope, $http) => {
  $scope.flowers = [];
  $scope.getAll = function() {
    $http.get('http://localhost:3000/api/flowers')
      .then((res) => {
        console.log('flower success!');
        $scope.flowers = res.data;
      }, (err) => {
        console.log(err);
      });

    $http.get('http://localhost:3000/api/gardeners')
      .then((res) => {
        console.log('gardener success!');
        $scope.gardeners = res.data;
      }, (err) => {
        console.log(err);
      });

    $scope.nC();
  };

  $scope.nC = function() {
    $http.get('http://localhost:3000/nonCrud/howManyFlowers')
      .then((res) => {
        console.log('gardener success!');
        $scope.nonCrud = res.data;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.postFlower = function(flower) {
    $http.post('http://localhost:3000/api/flowers', flower)
      .then((res) => {
        $scope.flowers.push(res.data);
        $scope.newFlower = null;
        $scope.nC();
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateFlower = function(flower) {
    $http.put('http://localhost:3000/api/flowers/' + flower._id, flower)
      .then((res) => {
        console.log(res.data);
        flower.editting = false;
      }, (err) => {
        console.log(err);
        flower.edditing = false;
      });
  };

  $scope.deleteFlower = function(flower) {
    $http.delete('http://localhost:3000/api/flowers/' + flower._id)
      .then((res) => {
        console.log(res.message);
        $scope.flowers = $scope.flowers.filter((i) => i !== flower);
        $scope.nC();
      }, (err) => {
        console.log(err);
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
        console.log(res.message);
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
