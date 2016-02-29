var angular = require('angular');
require('angular-mocks');
require(__dirname + '/../app/js/client');


describe('flower controller', () => {
  var $httpBackend;           // mocks a backend
  var $scope;                 // scope
  var $ControllerConstructor; // no view needed

  beforeEach(angular.mock.module('flower'));

  beforeEach(angular.mock.inject(($rootScope, $controller) => {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();                     //scope gets a bunch of stuff on it during instantiation
  }));

  it('should be able to make a controller', () => {
    var FlowerController = $ControllerConstructor('FlowerController', {$scope});
    expect(typeof FlowerController).toBe('object');
    expect(Array.isArray($scope.flowers)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  // REST requests
  describe('REST requests', () => {
    beforeEach(angular.mock.inject( function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('FlowerController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();  // ensure satisfaction
      $httpBackend.verifyNoOutstandingRequest();      // no extras
    });

    it('should make a GET request to /api/flowers', () => {
      $httpBackend.expectGET('http://localhost:3000/api/flowers').respond(200, [{name: 'test flower'}]);
      $httpBackend.expectGET('http://localhost:3000/api/gardeners').respond(200, [{name: 'null get'}]);
      $httpBackend.expectGET('http://localhost:3000/nonCrud/howManyFlowers').respond(200, 'nonCrud');
      $scope.getAll();
      $httpBackend.flush(); // resolves the promise $http returns, all requests have been made -- resolve them
      //expect($scope.flowers[0].name).toBe('test flower');
      expect($scope.flowers.length).toBe(1);
    });

    it('should make a POST request to /api/flowers', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/flowers', {name: 'the sent flower'}).respond(200, {name: 'the response flower'});
      $httpBackend.expectGET('http://localhost:3000/nonCrud/howManyFlowers').respond(200, [{name: 'test flower'}]); // gotta update
      $scope.newFlower = {name: 'the new flower'};
      $scope.postFlower({name: 'the sent flower'});
      $httpBackend.flush();
      expect($scope.flowers.length).toBe(1);
      expect($scope.newFlower).toBe(null);
      expect($scope.flowers[0].name).toBe('the response flower');
    });
    
    it('should make a PUT request to /api/flowers/:ID', () => {
      var updatedFlower  = {name: 'updated flower' , editing:true, _id: 123456};
      $scope.flowers.push(updatedFlower);
      $httpBackend.expectPUT('http://localhost:3000/api/flowers/' + updatedFlower._id, updatedFlower).respond(200, {msg: 'success'});
      $scope.updateFlower(updatedFlower);
      $httpBackend.flush();
      expect(updatedFlower.editing).toBe(false);
      expect($scope.flowers[0].editing).toBe(false);
    });

    it('should make a DELETE request to /api/flowers/:ID', () => {
      var deadFlower  = {name: 'dead flower', _id: 123456};
      $scope.flowers.push(deadFlower);
      expect($scope.flowers.indexOf(deadFlower)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/flowers/' + deadFlower._id).respond(200, {msg: 'success'} );
      $httpBackend.expectGET('http://localhost:3000/nonCrud/howManyFlowers').respond(200, 'nonCrud'); 
      $scope.deleteFlower(deadFlower);
      $httpBackend.flush();
      expect($scope.flowers.length).toBe(0);
      expect($scope.flowers.indexOf(deadFlower)).toBe(-1);
    });
  });
});
