const angular = require('angular');

const app = angular.module('app', []);
const ctBaseUri = 'http://localhost:3000/api/ct';
const tBaseUri = 'http://localhost:3000/api/t';

app.controller('ctController', ['$scope', '$http', ($scope, $http) => {
  $scope.cts = [];

  $scope.getCT = function() {
    $http.get(ctBaseUri)
      .then((res) => {
        console.log('success!');
        $scope.cts = res.data;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.createCT = function(ct) {
    $http.post(ctBaseUri, ct)
      .then((res) => {
        $scope.cts.push(res.data);
        $scope.newCT = null;  // clears form field
      }, (err) => {
        console.log(err);
      })
  }

  $scope.deleteCT = function(ct) {
    $http.delete(ctBaseUri + '/' + ct._id)
      .then((res) => {
        $scope.cts = $scope.cts.filter((i) => i !== ct);
      }, (err) => {
        console.log(err);
      })
  }

  $scope.updateCT = function(ct) {
    $http.put(ctBaseUri + '/' + ct._id, ct)
      .then((res) => {
        $scope.cts[$scope.cts.indexOf(ct)] = ct;
        ct.editting = false;
      }, (err) => {
        console.log(err);
        ct.editting = false;
      })
  }

}])

.controller('tController', ['$scope', '$http', ($scope, $http) => {
  $scope.ts = [];

  $scope.getT = function() {
    $http.get(tBaseUri)
      .then((res) => {
        console.log('success!');
        $scope.ts = res.data;
      }, (err) => {
        console.log(err);
      });
  };
  $scope.createT = function(t) {
    $http.post(tBaseUri, t)
      .then((res) => {
        $scope.ts.push(res.data);
        $scope.newT = null;  // clears form field
      }, (err) => {
        console.log(err);
      })
  }

  $scope.deleteT = function(t) {
    $http.delete(tBaseUri + '/' + t._id)
      .then((res) => {
        $scope.ts = $scope.ts.filter((i) => i !== t);
      }, (err) => {
        console.log(err);
      })
  }

  $scope.updateT = function(t) {
    $http.put(tBaseUri + '/' + t._id, t)
      .then((res) => {
        $scope.ts[$scope.ts.indexOf(t)] = t;
        t.editting = false;
      }, (err) => {
        console.log(err);
        t.editting = false;
      })
  }

}]);
