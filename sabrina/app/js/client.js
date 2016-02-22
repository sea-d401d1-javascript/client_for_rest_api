const angular = require('angular');

const hogcApp = angular.module('hogcApp', []);

hogcApp.controller('RequestsController', ['$scope', '$http', function($scope, $http) {
  $scope.requests = [];

  $scope.getAllRequests = function() {
    $http.get('http://localhost:3000/api/requestsAll')
      .then((res) => {
        console.log('success getting all requests!');
        $scope.requests = res.data;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.getUnclaimed = function() {
    $http.get('http://localhost:3000/api/requestsUnclaimed')
      .then((res) => {
        console.log('success getting unclaimed requests!');
        $scope.requestsUnclaimed = res.data;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.createRequest = (request) => {
    $http.post('http://localhost:3000/api/requests', request)
      .then((res) => {
        console.log('success posting request!');
        $scope.requests.push(res.data);
        $scope.newRequest = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateRequest = (request) => {
    $http.put('http://localhost:3000/api/requests/' + request._id, request)
      .then((res) => {
        console.log('success updating request!');
        $scope.requests[$scope.requests.indexOf(request)] = request;
        request.editing = false;
      }, (err) => {
        console.log(err);
        request.editing = false;
      });
  };

  $scope.claimRequest = (req, id) => {
    $http.put('http://localhost:3000/api/requests/' + req._id + '/' + id)
      .then((res) => {
        console.log('success claiming request!');
        req.editing = false;
      }, (err) => {
        console.log(err);
        req.editing = false;
      });
  };

  $scope.deleteRequest = (request) => {
    $http.delete('http://localhost:3000/api/requests/' + request._id)
      .then((res) => {
        console.log('success deleting request!');
        $scope.requests = $scope.requests.filter((i) => i._id !== request._id);
      }, (err) => {
        console.log(err);
      });
  };
}]);

hogcApp.controller('DonorsController', ['$scope', '$http', function($scope, $http) {
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
