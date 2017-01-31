var angular = require('angular');

module.exports = function(app) {
  app.controller('RequestsController', ['$scope', '$http', 'cfResource', 'cfStore', function($scope, $http, Resource, cfStore) {
    $scope.requests = [];
    $scope.errors = [];
    var requestService = Resource('/requests');

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexOf(err), 1);
    };

    $scope.toggleEdit = function(request) {
      if (request.backup) {
        var temp = request.backup;
        $scope.requests.splice($scope.requests.indexOf(request), 1, temp);
      } else {
        request.backup = angular.copy(request);
        request.editing = true;
      }
    };

    $scope.getAllRequests = function() {
      requestService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.requests = res;
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

    $scope.createRequest = function(request) {
      $scope.requests.push(request);
      requestService.create(request, function(err, res) {
        if (err) {
          $scope.requests.splice($scope.requests.indexOf(request), 1);
          $scope.errors.push('Could not save request for ' + request.firstName + ' ' + request.lastName);
          return console.log(err);
        }
        $scope.requests.splice($scope.requests.indexOf(request), 1, res);
        $scope.newRequest = null;
      });
    };

    $scope.updateRequest = function(request) {
      requestService.update(request, function(err, res) {
        request.editing = false;
        request.backup = null;
        if (err) {
          $scope.errors.push('Could not update request for ' + request.firstName + ' ' + request.lastName);
          return console.log(err);
        }
      });
    };

    $scope.claimRequest = (req, id) => {
      $http.put('http://localhost:3000/api/requests/' + req._id + '/' + id)
        .then((res) => {
          console.log('success claiming request!');
          req.editing = false;
        }, (err) => {
          $scope.errors.push('Could not claim request for ' + request.firstName + ' ' + request.lastName);
          console.log(err);
          req.editing = false;
        });
    };

    $scope.deleteRequest = function(request) {
      if (!request._id) return setTimeout(function() {$scope.deleteRequest(request);}, 1000);
      requestService.delete(request, function(err, res) {
        if (err) {
          $scope.errors.push('Could not delete request for ' + request.firstName + ' ' + request.lastName);
          return console.log(err);
        }
        $scope.requests.splice($scope.requests.indexOf(request), 1);
      });
    };
  }]);
};
