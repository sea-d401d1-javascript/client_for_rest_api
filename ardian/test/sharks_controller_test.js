require('../app/js/myApp');
var angular = require('angular');
require('angular-mocks');

//Testing the SharksController
describe('sharks controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('myApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a sharks controller', () => {
    var sharksController = $ControllerConstructor('SharksController', {$scope});
    expect(typeof sharksController).toBe('object');
    expect(Array.isArray($scope.sharks)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST request', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('SharksController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/sharks', () => {
      $httpBackend.expectGET('http://localhost:3000/api/sharks').respond(200, [{name: 'test shark'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.sharks.length).toBe(1);
      expect($scope.sharks[0].name).toBe('test shark');
    });

    it('should create a new shark', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/sharks', {name: 'the sent shark'}).respond(200, {name: 'the response shark'});
      $scope.newShark = {name: 'the new shark'};
      $scope.createShark({name: 'the sent shark'});
      $httpBackend.flush();
      expect($scope.sharks.length).toBe(1);
      expect($scope.newShark).toBe(null);
      expect($scope.sharks[0].name).toBe('the response shark');
    });

    it('should update a shark', () => {
      var testShark = {name: 'inside scope', editing: true, _id: 5};
      $scope.sharks.push(testShark);
      $httpBackend.expectPUT('http://localhost:3000/api/sharks/5', testShark).respond(200);
      $scope.updateShark(testShark);
      $httpBackend.flush();
      expect(testShark.editing).toBe(false);
      expect($scope.sharks[0].editing).toBe(false);
    });

    it('should delete a shark', () => {
      var testShark = {name: 'delete shark', _id: 1};
      $scope.sharks.push(testShark);
      expect($scope.sharks.indexOf(testShark)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/sharks/1').respond(200);
      $scope.deleteShark(testShark);
      $httpBackend.flush();
      expect($scope.sharks.indexOf(testShark)).toBe(-1);
    });
  });
});//End of testing SharksController
