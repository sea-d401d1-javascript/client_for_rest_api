var angular = require('angular');

module.exports = function(app) {
  app.controller('RequestsController', ['$scope', '$http', 'cfResource', 'cfStore', function($scope, $http, Resource, cfStore) {
    $scope.requests = [];
    var requestService = Resource('/requests');

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

    $scope.createRequest = function(request) {
      $scope.requests.push(request);
      requestService.create(request, function(err, res) {
        if (err) return console.log(err);
        $scope.requests.splice($scope.requests.indexOf(request), 1, res);
        $scope.newRequest = null;
      });
    };

    $scope.updateRequest = function(request) {
      requestService.update(request, function(err, res) {
        request.editing = false;
        request.backup = null;
        if (err) return console.log(err);
      });
    };

    $scope.deleteRequest = function(request) {
      if (!request._id) return setTimeout(function() {$scope.deleteRequest(request);}, 1000);
      requestService.delete(request, function(err, res) {
        if (err) return console.log(err);
        $scope.requests.splice($scope.requests.indexOf(request), 1);
      });
    };
  }]);
};
