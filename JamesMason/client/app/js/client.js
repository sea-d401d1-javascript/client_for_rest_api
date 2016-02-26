'use strict';
const angular = require('angular');
const forceApp = angular.module('ForceApp', []);
forceApp.controller('ForceController', ['$scope', '$http', function($scope, $http) {
  $scope.lightJedi = [];
  $scope.darkJedi = [];
  $scope.getAllJedi = function() {
    $scope.getAllLightJedi();
    $scope.getAllDarkJedi();
  };
  $scope.getAllLightJedi = function() {
    $http.get('http://localhost:3000/api/light')
      .then((res) => {
        console.log('success!');
        $scope.lightJedi = res.data;
      }, (err) => {
        console.log(err);
      });
  };
  $scope.getAllDarkJedi = function() {
    $http.get('http://localhost:3000/api/dark')
      .then((res) => {
        console.log('success!');
        $scope.darkJedi = res.data;
      }, (err) => {
        console.log(err);
      });
  };
  $scope.createLightJedi = function(newJedi) {
    newJedi.force = 'Light';
    $http.post('http://localhost:3000/api/light', newJedi)
      .then((res) => {
        $scope.lightJedi.push(res.data);
        $scope.newLightJedi = null;
      }, (err) => {
        console.log(err);
      });
  };
  $scope.createDarkJedi = function(newJedi) {
    newJedi.force = 'Dark';
    $http.post('http://localhost:3000/api/dark', newJedi)
      .then((res) => {
        $scope.darkJedi.push(res.data);
        $scope.newDarkJedi = null;
      }, (err) => {
        console.log(err);
      });
  };
  $scope.deleteLightJedi = function(jediToDelete) {
    $http.delete('http://localhost:3000/api/light/' + jediToDelete._id)
      .then(() => {
        $scope.lightJedi = $scope.lightJedi.filter((i) => i !== jediToDelete);
      }, (err) => {
        console.log(err);
      });
  };
  $scope.updateLightJedi = function(jediToUpdate) {
    $http.put('http://localhost:3000/api/light/' + jediToUpdate._id, jediToUpdate)
      .then(() => {
        $scope.lightJedi[$scope.lightJedi.indexOf(jediToUpdate)] = jediToUpdate;
      }, (err) => {
        console.log(err);
      });
  };
  $scope.deleteDarkJedi = function(jediToDelete) {
    $http.delete('http://localhost:3000/api/dark/' + jediToDelete._id)
      .then(() => {
        $scope.darkJedi = $scope.darkJedi.filter((i) => i !== jediToDelete);
      }, (err) => {
        console.log(err);
      });
  };
  $scope.updateDarkJedi = function(jediToUpdate) {
    $http.put('http://localhost:3000/api/dark/' + jediToUpdate._id, jediToUpdate)
      .then(() => {
        $scope.darkJedi[$scope.darkJedi.indexOf(jediToUpdate)] = jediToUpdate;
      }, (err) => {
        console.log(err);
      });
  };
}]);
