require('../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('requests controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('hogcApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var requestsController = $ControllerConstructor('RequestsController', {$scope});
    expect(typeof requestsController).toBe('object');
    expect(Array.isArray($scope.requests)).toBe(true);
    expect(typeof $scope.getAllRequests).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('RequestsController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request to /api/requestsAll', () => {
      $httpBackend.expectGET('http://localhost:3000/api/requestsAll').respond(200, [{firstName: 'test request'}]);
      $scope.getAllRequests();
      $httpBackend.flush();
      expect($scope.requests.length).toBe(1);
      expect($scope.requests[0].firstName).toBe('test request');
    });

    it('should make a GET request to /api/requestsUnclaimed', () => {
      $httpBackend.expectGET('http://localhost:3000/api/requestsUnclaimed').respond(200, [{firstName: 'test request unclaimed'}]);
      $scope.getUnclaimed();
      $httpBackend.flush();
      expect($scope.requestsUnclaimed.length).toBe(1);
      expect($scope.requestsUnclaimed[0].firstName).toBe('test request unclaimed');
    });

    it('should POST/CREATE a new request at /api/requests', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/requests', {firstName: 'the sent request'}).respond(200, {firstName: 'the response request'});
      $scope.newRequest = {firstName: 'the new request'};
      $scope.createRequest({firstName: 'the sent request'});
      $httpBackend.flush();
      expect($scope.requests.length).toBe(1);
      expect($scope.newRequest).toBe(null);
      expect($scope.requests[0].firstName).toBe('the response request');
    });

    it('should PUT/UPDATE a request at /api/requests/[req._id]', () => {
      var updatedRequest = {_id: '1', editing: true};
      $httpBackend.expectPUT('http://localhost:3000/api/requests/1', updatedRequest).respond(200);
      $scope.updateRequest(updatedRequest);
      $httpBackend.flush();
      expect(updatedRequest.editing).toBe(false);
    });

    it('should CLAIM/PUT a request at /api/requests/[req._id]/[donor._id]', () => {
      var claimedRequest = {_id: 'req1', editing: true};
      var donorID = 'donor1';
      $httpBackend.expectPUT('http://localhost:3000/api/requests/req1/donor1').respond(200);
      $scope.claimRequest(claimedRequest, donorID);
      $httpBackend.flush();
      expect(claimedRequest.editing).toBe(false);
    });

    it('should DELETE a request at /api/requests/[req._id]', () => {
      $scope.requests = [{_id: 1}];
      $httpBackend.expectDELETE('http://localhost:3000/api/requests/1').respond(200);
      $scope.deleteRequest({_id: 1});
      $httpBackend.flush();
      expect($scope.requests.length).toBe(0);
    });
  });
});
