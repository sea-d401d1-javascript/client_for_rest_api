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
    var activityController = $ControllerConstructor('ActivityController', {$scope});
    expect(typeof activityController).toBe('object');
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

    it('should handle an error on a get request to /api/activity', () => {
      $httpBackend.expectGET('http://localhost:3050/api/activity').respond(400, [{name: 'test activity'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.activity.length).toBe(0);

    });

    it('should make a update request to /api/activity', () => {
      var original = {_id: 70000, editing: true};
      var update = {name: 'fun', _id: 70000, editing: true};

      $scope.activity.push(original);
      $httpBackend.expectPUT('http://localhost:3050/api/activity/' + update._id, update).respond(200);
      $scope.updateActivity(update);
      $httpBackend.flush();
      expect($scope.activity.length).toBe(1);
    });

    it('should tear up an activity', () => {
      var testAct = {name: 'fun', _id: 70000, editing: true};
      $scope.activity[0] = testAct;
      $httpBackend.expectDELETE('http://localhost:3050/api/activity/70000').respond(200);
      $scope.deleteActivity(testAct);
      $httpBackend.flush();
      expect($scope.activity.length).toBe(0);

    });

  });
});
