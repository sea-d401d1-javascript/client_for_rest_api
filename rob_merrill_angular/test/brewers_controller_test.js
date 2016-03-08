// const beersApp = angular.module('beersApp', []);
require('../app/js/client');
var angular = require('angular');
require('angular-mocks');


describe('brewers controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('beersApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var brewersController = $ControllerConstructor('BrewersController', {$scope});
    expect(typeof brewersController).toBe('object');
    expect(Array.isArray($scope.brewers)).toBe(true);
    expect(typeof $scope.getAllBrewer).toBe('function');
  });

  //  it('should be able to make a controller', () => {
  //   var brewerssController = $ControllerConstructor('BrewersController', {$scope});
  //   expect(typeof brewersController).toBe('object');
  //   expect(Array.isArray($scope.brewers)).toBe(true);
  //   expect(typeof $scope.getAllBrewer).toBe('function');
  // });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('BrewersController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation(); 
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/brewers', () => {
      $httpBackend.expectGET('http://localhost:3000/api/brewers').respond(200, [{name: 'test brewer'}]);
      $scope.getAllBrewer();
      $httpBackend.flush();
      expect($scope.brewers.length).toBe(1);
      expect($scope.brewers[0].name).toBe('test brewer');
    });

    //  it('should make a get request to /api/brewers', () => {
    //   $httpBackend.expectGET('http://localhost:3000/api/brewers').respond(200, [{name: 'test brewer'}]);
    //   $scope.getAllBrewer();
    //   $httpBackend.flush();
    //   expect($scope.brewers.length).toBe(1);
    //   expect($scope.brewers[0].name).toBe('test brewer');
    // });

    it('should update a brewer', () => {
      var brewer = {_id: 1, editing: true};
      $httpBackend.expectPUT('http://localhost:3000/api/brewers' + '/1').respond(200);
      $scope.updateBrewer(brewer);
      $httpBackend.flush();
      expect(brewer.editing).toBe(false);
    });

    // it('should update a brewer', () => {
    //       var brewer = {_id: 1, editing: true};
    //       $httpBackend.expectPUT('http://localhost:3000/api/brewers' + '/1').respond(200);
    //       $scope.updateBrewer(brewer);
    //       $httpBackend.flush();
    //       expect(brewer.editing).toBe(false);
    //     });

    it('should be able to delete a brewer', () => {
      var brewer = {_id: 1, name: 'test brewer'};
      $scope.brewer = [brewer];
      $httpBackend.expectDELETE('http://localhost:3000/api/brewers' + '/1').respond(200);
      $scope.deleteBrewer(brewer);
      $httpBackend.flush();
      expect($scope.brewers.length).toBe(0);
    })  

    it('should remove a brewer', () => {
      var testBrewer = {name: 'removed brewer', _id:1};
      $scope.brewers.push(testBrewer);
      expect($scope.brewers.indexOf(testBrewer)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/brewers/1').respond(200);
      $scope.deleteBrewer(testBrewer);
      $httpBackend.flush();
      expect($scope.brewers.indexOf(testBrewer)).toBe(-1);
    });
  });
});
