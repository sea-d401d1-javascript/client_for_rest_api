require('../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('donors controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('hogcApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var donorsController = $ControllerConstructor('DonorsController', {$scope});
    expect(typeof donorsController).toBe('object');
    expect(Array.isArray($scope.donors)).toBe(true);
    expect(typeof $scope.getAllDonors).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('DonorsController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request to /api/donors', () => {
      $httpBackend.expectGET('http://localhost:3000/api/donors').respond(200, [{username: 'test username'}]);
      $scope.getAllDonors();
      $httpBackend.flush();
      expect($scope.donors.length).toBe(1);
      expect($scope.donors[0].username).toBe('test username');
    });

    it('should POST/CREATE a new donor', () => {
      $httpBackend.expectPOST('http://localhost:3000/signup', {username: 'the sent username'}).respond(200, {username: 'the response username'});
      $scope.newDonor = {username: 'the new username'};
      $scope.createDonor({username: 'the sent username'});
      $httpBackend.flush();
      expect($scope.donors.length).toBe(1);
      expect($scope.newDonor).toBe(null);
      expect($scope.donors[0].username).toBe('the response username');
    });
  });
});
