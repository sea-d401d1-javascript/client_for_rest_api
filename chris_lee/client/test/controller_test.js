var angular = require('angular');

describe('counter-terrorist controller', () => {

  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('CSApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to create a CT controller', () => {
    var ctController = $ControllerConstructor('CTController', {$scope});
    expect(typeof ctController).toBe('object');
    expect(Array.isArray($scope.cts)).toBe(true);
    expect(typeof $scope.getCT).toBe('function');
  });

  it('should be able to create a T controller', () => {
    var tController = $ControllerConstructor('TController', {$scope: $scope});
    expect(typeof tController).toBe('object');
    expect(Array.isArray($scope.ts)).toBe(true);
    expect(typeof $scope.getT).toBe('function');
  });

  describe('REST requests using CT Controller', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('CTController', {$scope});
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should make a GET request to /api/ct', () => {
      $httpBackend.expectGET('http://localhost:3000/api/ct').respond(200, [{name: 'test CT'}]);
      $scope.getCT();
      $httpBackend.flush();
      expect($scope.cts.length).toBe(1);
      expect($scope.cts[0].name).toBe('test CT');
    });
    it('should make a POST request to /api/ct', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/ct', {name: 'sent CT'}).respond(200, {name: 'response CT'});
      $scope.newCT = {name: 'new CT'};
      $scope.createCT({name: 'sent CT'});
      $httpBackend.flush();
      expect($scope.cts.length).toBe(1);
      expect($scope.newCT).toBe(null);
      expect($scope.cts[0].name).toBe('response CT');
    });
    it('should make a PUT request to /api/ct/:id', () => {
      var testCT = {name: 'inside scope', editting: true, _id: 5};
      $scope.cts.push(testCT);
      $httpBackend.expectPUT('http://localhost:3000/api/ct/5', testCT).respond(200);
      $scope.updateCT(testCT);
      $httpBackend.flush();
      expect(testCT.editing).toBe(false);
      expect($scope.cts[0].editing).toBe(false);
    });
    it('should make a DELETE request to /api/ct/:id', () => {
      var testCT = {name: 'condemned ct', _id: 1};
      $scope.cts.push(testCT);
      expect($scope.cts.indexOf(testCT)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/ct/1').respond(200);
      $scope.deleteCT(testCT);
      $httpBackend.flush();
      expect($scope.cts.indexOf(testCT)).toBe(-1);
    });
  });
  describe('REST requests using T Controller', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('TController', {$scope});
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should make a GET request to /api/t', () => {
      $httpBackend.expectGET('http://localhost:3000/api/t').respond(200, [{name: 'test T'}]);
      $scope.getT();
      $httpBackend.flush();
      expect($scope.ts.length).toBe(1);
      expect($scope.ts[0].name).toBe('test T');
    });
    it('should make a POST request to /api/t', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/t', {name: 'sent T'}).respond(200, {name: 'response T'});
      $scope.newT = {name: 'new T'};
      $scope.createT({name: 'sent T'});
      $httpBackend.flush();
      expect($scope.ts.length).toBe(1);
      expect($scope.newT).toBe(null);
      expect($scope.ts[0].name).toBe('response T');
    });
    it('should make a PUT request to /api/t/:id', () => {
      var testT = {name: 'inside scope', editting: true, _id: 5};
      $scope.ts.push(testT);
      $httpBackend.expectPUT('http://localhost:3000/api/t/5', testT).respond(200);
      $scope.updateT(testT);
      $httpBackend.flush();
      expect(testT.editing).toBe(false);
      expect($scope.ts[0].editing).toBe(false);
    });
    it('should make a DELETE request to /api/t/:id', () => {
      var testT = {name: 'condemned T', _id: 1};
      $scope.ts.push(testT);
      expect($scope.ts.indexOf(testT)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/t/1').respond(200);
      $scope.deleteT(testT);
      $httpBackend.flush();
      expect($scope.ts.indexOf(testT)).toBe(-1);
    });
  })
});
