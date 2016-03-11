var angular = require('angular');

describe('The enemey controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('friendsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var enemyController = $ControllerConstructor('EnemyController', {$scope});
    expect(typeof enemyController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('EnemyController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/enemies', ($rootScope , $controller) => {
      $httpBackend.expectGET('http://localhost:5000/api/enemies').respond(200, [{name: 'test enemy'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.data.enemies.length).toBe(1);
      expect($scope.data.enemies[0].name).toBe('test enemy');
    });
    //
    // it('should create a new bear', () => {
    //   $httpBackend.expectPOST('http://localhost:5000/api/enemies', {name: 'the sent bear'}).respond(200, {name: 'the response bear'});
    //   $scope.newBear = {name: 'the new bear'};
    //   $scope.createBear({name: 'the sent bear'});
    //   $httpBackend.flush();
    //   expect($scope.bears.length).toBe(1);
    //   expect($scope.newBear).toBe(null);
    //   expect($scope.bears[0].name).toBe('the response bear');
    // });
    //
    // it('should update a bear', () => {
    //   var testBear = {name: 'inside scope', editing: true, _id: 5};
    //   $scope.bears.push(testBear);
    //   $httpBackend.expectPUT('http://localhost:3000/api/bears/5', testBear).respond(200);
    //   $scope.updateBear(testBear);
    //   $httpBackend.flush();
    //   expect(testBear.editing).toBe(false);
    //   expect($scope.bears[0].editing).toBe(false);
    // });
    //
    // it('should murder a bear', () => {
    //   var testBear = {name: 'condemned bear', _id: 1};
    //   $scope.bears.push(testBear);
    //   expect($scope.bears.indexOf(testBear)).not.toBe(-1);
    //   $httpBackend.expectDELETE('http://localhost:3000/api/bears/1').respond(200);
    //   $scope.deleteBear(testBear);
    //   $httpBackend.flush();
    //   expect($scope.bears.indexOf(testBear)).toBe(-1);
    // });
  });
});
