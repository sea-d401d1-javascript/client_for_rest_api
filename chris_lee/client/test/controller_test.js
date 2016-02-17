var angular = require('angular');

require('angular-mocks');
require('../app/js/client');

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
    describe('REST requests that require existing CTs', () => {
      beforeEach(() => {
        $scope.createCT({name: 'existing CT', _id: '123'});
      });
      // afterEach(() => {
      //   $httpBackend.verifyNoOutstandingExpectation();
      //   $httpBackend.verifyNoOutstandingRequest();
      // });
      it('should make a PUT request to /api/ct/:id', () => {
        $httpBackend.expectPUT('http://localhost:3000/api/ct/123', {name: 'updated CT'}).respond(200, {name: 'response CT'});
        $scope.updateCT({name: 'updated CT'});
        $httpBackend.flush();
      });
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
  })
});
