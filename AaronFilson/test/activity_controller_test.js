require('../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('activity controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('activityApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var ActivityController = $ControllerConstructor('ActivityController', {$scope});
    expect(typeof ActivityController).toBe('object');
    expect(Array.isArray($scope.activity)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('ActivityController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/activity', () => {
      $httpBackend.expectGET('http://localhost:3050/api/activity').respond(200, [{name: 'test activity'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.activity.length).toBe(1);
      expect($scope.activity[0].name).toBe('test activity');
    });

    it('should create a new activity', () => {
      $httpBackend.expectPOST('http://localhost:3050/api/activity', {name: 'walking out'}).respond(200, {name: 'walking in'});
      $scope.newAct = {name: 'dancing'};
      $scope.createActivity({name: 'walking out'});
      $httpBackend.flush();
      expect($scope.activity.length).toBe(1);
      expect($scope.newAct).toBe(null);
      expect($scope.activity[0].name).toBe('walking in');
    });
  });
});
