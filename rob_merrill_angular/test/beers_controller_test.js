// const beersApp = angular.module('beersApp', []);
require('../app/js/client');
var angular = require('angular');
require('angular-mocks');


describe('beers controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('beersApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var beersController = $ControllerConstructor('BeersController', {$scope});
    expect(typeof beersController).toBe('object');
    expect(Array.isArray($scope.beers)).toBe(true);
    expect(typeof $scope.getAllBeer).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('BeersController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation(); 
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/beers', () => {
      $httpBackend.expectGET('http://localhost:3000/api/beers').respond(200, [{name: 'test beer'}]);
      $scope.getAllBeer();
      $httpBackend.flush();
      expect($scope.beers.length).toBe(1);
      expect($scope.beers[0].name).toBe('test beer');
    });



    it('should update a beer', () => {
      var beer = {_id: 1, editing: true};
      $httpBackend.expectPUT('http://localhost:3000/api/beers' + '/1').respond(200);
      $scope.updateBeer(beer);
      $httpBackend.flush();
      expect(beer.editing).toBe(false);
    });

    it('should be able to delete a beer', () => {
      var beer = {_id: 1, name: 'test beer'};
      $scope.beer = [beer];
      $httpBackend.expectDELETE('http://localhost:3000/api/beers' + '/1').respond(200);
      $scope.deleteBeer(beer);
      $httpBackend.flush();
      expect($scope.beers.length).toBe(0);
    })  
  });
});






