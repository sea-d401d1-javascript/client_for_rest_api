require('../app/js/controller');
var angular = require('angular');
require('angular-mocks');

describe('dogs controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('petsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var dogsController = $ControllerConstructor('DogsController', { $scope });
    expect(typeof dogsController).toBe('object');
    expect(Array.isArray($scope.dogs)).toBe(true);
    expect(typeof $scope.getDogs).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('DogsController', { $scope });
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request to /app/dogs', () => {
      $httpBackend.expectGET('http://localhost:3000/app/dogs').respond(200, [{ name: 'test dog' }]);
      $scope.getDogs();
      $httpBackend.flush();
      expect($scope.dogs.length).toBe(1);
      expect($scope.dogs[0].name).toBe('test dog');
    });

    it('should make a POST request to /app/dogs', () => {
      $httpBackend.expectPOST('http://localhost:3000/app/dogs', { name: 'post dog' }).respond(200, { name: 'response dog' });
      $scope.newDog = { name: 'new dog' };
      $scope.createDog({ name: 'post dog' });
      $httpBackend.flush();
      expect($scope.dogs.length).toBe(1);
      expect($scope.newDog).toBe(null);
      expect($scope.dogs[0].name).toBe('response dog');
    });

    it('should update an existing dog', () => {
      var testDog = { name: 'schrodingers dog', editing: true, _id: 1 };
      $scope.dogs.push(testDog);
      $httpBackend.expectPUT('http://localhost:3000/app/dogs/1', testDog).respond(200);
      $scope.updateDog(testDog);
      $httpBackend.flush();
      expect(testDog.editing).toBe(false);
      expect($scope.dogs[0].editing).toBe(false);
    });

    it('should delete an existing dog', () => {
      var deleteDog = { name: 'deleted dog', color: 'blue', _id: 1 };
      $scope.dogs.push(deleteDog);
      expect($scope.dogs.indexOf(deleteDog)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/app/dogs/1').respond(200);
      $scope.deleteDog(deleteDog);
      $httpBackend.flush();
      expect($scope.dogs.indexOf(deleteDog)).toBe(-1);
    });

  });

});
