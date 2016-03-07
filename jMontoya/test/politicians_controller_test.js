require('../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('politicians controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('politiciansApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var politiciansController = $ControllerConstructor('PoliticiansController', {$scope});
    expect(typeof politiciansController).toBe('object');
    expect(Array.isArray($scope.demPoliticians)).toBe(true);
    expect(typeof $scope.getDem).toBe('function');
  });

  it('should be able to make a controller', () => {
    var politiciansController = $ControllerConstructor('PoliticiansController', {$scope});
    expect(typeof politiciansController).toBe('object');
    expect(Array.isArray($scope.repPoliticians)).toBe(true);
    expect(typeof $scope.getRep).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('PoliticiansController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request to api/demPoliticians', () => {
      $httpBackend.expectGET('http://localhost:5000/api/demPoliticians').respond(200, [{name: 'test politician'}]);
      $scope.getDem();
      $httpBackend.flush();
      expect($scope.demPoliticians.length).toBe(1);
      expect($scope.demPoliticians[0].name).toBe('test politician');
    });

    it('should make a GET request to api/repPoliticians', () => {
      $httpBackend.expectGET('http://localhost:5000/api/repPoliticians').respond(200, [{name: 'test politician'}]);
      $scope.getRep();
      $httpBackend.flush();
      expect($scope.repPoliticians.length).toBe(1);
      expect($scope.repPoliticians[0].name).toBe('test politician');
    });

    it('should create a new dem politician', () => {
      $httpBackend.expectPOST('http://localhost:5000/api/demPoliticians', {name: 'the sent politician'}).respond(200, {name: 'the response politician'});
      $scope.demPolitician = {name: 'the new politician'};
      $scope.createDemPolitician({name: 'the sent politician'});
      $httpBackend.flush();
      expect($scope.demPoliticians.length).toBe(1);
      expect($scope.demPolitician).toBe(null);
      expect($scope.demPoliticians[0].name).toBe('the response politician');
    });

    it('should create a new rep politician', () => {
      $httpBackend.expectPOST('http://localhost:5000/api/repPoliticians', {name: 'the sent politician'}).respond(200, {name: 'the response politician'});
      $scope.repPolitician = {name: 'the new politician'};
      $scope.createRepPolitician({name: 'the sent politician'});
      $httpBackend.flush();
      expect($scope.repPoliticians.length).toBe(1);
      expect($scope.repPolitician).toBe(null);
      expect($scope.repPoliticians[0].name).toBe('the response politician');
    });

    it('should update a dem politician', () => {
      var testPolitician = {name: 'inside scope', editing: true, _id: 5};
      $scope.demPoliticians.push(testPolitician);
      $httpBackend.expectPUT('http://localhost:5000/api/demPoliticians/5', testPolitician).respond(200);
      $scope.updateDemPolitician(testPolitician);
      $httpBackend.flush();
      expect(testPolitician.editing).toBe(false);
      expect($scope.demPoliticians[0].editing).toBe(false);
    });

    it('should update a rep politician', () => {
      var testPolitician = {name: 'inside scope', editing: true, _id: 5};
      $scope.repPoliticians.push(testPolitician);
      $httpBackend.expectPUT('http://localhost:5000/api/repPoliticians/5', testPolitician).respond(200);
      $scope.updateRepPolitician(testPolitician);
      $httpBackend.flush();
      expect(testPolitician.editing).toBe(false);
      expect($scope.repPoliticians[0].editing).toBe(false);
    });

    it('should delete a dem politician', () => {
      var testPolitician = {name: 'condemned politician', _id: 1};
      $scope.demPoliticians.push(testPolitician);
      expect($scope.demPoliticians.indexOf(testPolitician)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:5000/api/demPoliticians/1').respond(200);
      $scope.deleteDemPolitician(testPolitician);
      $httpBackend.flush();
      expect($scope.demPoliticians.indexOf(testPolitician)).toBe(-1);
    });

    it('should delete a rep politician', () => {
      var testPolitician = {name: 'condemned politician', _id: 1};
      $scope.repPoliticians.push(testPolitician);
      expect($scope.repPoliticians.indexOf(testPolitician)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:5000/api/repPoliticians/1').respond(200);
      $scope.deleteRepPolitician(testPolitician);
      $httpBackend.flush();
      expect($scope.repPoliticians.indexOf(testPolitician)).toBe(-1);
    });

  });
});
