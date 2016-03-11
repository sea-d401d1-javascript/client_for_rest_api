var angular = require('angular');

describe('The enemy controller', () => {
  var $httpBackend;
  var $rootScope;
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
    beforeEach(angular.mock.inject(function( _$httpBackend_ , _$rootScope_ , _$controller_) {
      $rootScope = _$rootScope_;
      $rootScope.data = {enemies: []};
      $scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('EnemyController', {$scope});

    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/enemies', () => {
      $httpBackend.expectGET('http://localhost:5000/api/enemies').respond(200, [{name: 'test enemy'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.data.enemies.length).toBe(1);
      expect($scope.data.enemies[0].name).toBe('test enemy');
    });

    it('should create a new enemy', () => {

      var testPerson = {name: 'test enemy'}
      $rootScope.data.newPerson = 1;

      $httpBackend.expectPOST('http://localhost:5000/api/enemies', testPerson).respond(200, {name: 'the response enemy'});
      $rootScope.data.newPerson = 1;
      $scope.post(testPerson, 0);
      $httpBackend.flush();
      expect($scope.data.enemies[0].name).toBe('the response enemy');
      expect($scope.message).toBe('New Enemy Added :O ');
    });

    it('should update an enemy', () => {
      var testEnemy = {name: 'inside put', _id: 5};

      $httpBackend.expectPUT('http://localhost:5000/api/enemies/5', testEnemy).respond(200);
      $scope.put(testEnemy);
      $httpBackend.flush();
      expect($scope.message).toBe('Enemy Edited');
    });
    //
    it('should murder an enemy', () => {
      var exEnemy = {name: 'condemned enemy', _id: 1};
      $scope.data.enemies.push(exEnemy);
      expect($scope.data.enemies.indexOf(exEnemy)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:5000/api/enemies/1').respond(200);
      $scope.delete(exEnemy , 0);
      $httpBackend.flush();
      expect($scope.data.enemies.indexOf(exEnemy)).toBe(-1);
    });
  });
});
