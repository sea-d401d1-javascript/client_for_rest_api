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
    expect(typeof $scope.getAllBrewers).toBe('function');
  });

   it('should be able to make a controller', () => {
    var brewerssController = $ControllerConstructor('BrewersController', {$scope});
    expect(typeof brewersController).toBe('object');
    expect(Array.isArray($scope.brewers)).toBe(true);
    expect(typeof $scope.getAllBrewers).toBe('function');
  });

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

     it('should make a get request to /api/brewers', () => {
      $httpBackend.expectGET('http://localhost:3000/api/brewers').respond(200, [{name: 'test brewer'}]);
      $scope.getAllBrewers();
      $httpBackend.flush();
      expect($scope.brewers.length).toBe(1);
      expect($scope.brewers[0].name).toBe('test brewer');
    });

    // it('should create a new beer', () => {
    //   $httpBackend.expectPost('http:localhost:3000/api/beers', {name: 'the sent beer'}).respond(200, {name: 'the response beer'});
    //   $scope.newBeer = {name: 'the new beer' };
    //   $scope.createBeer({name: 'the sent beer' });
    //   $httpBackend.flush();
    //   expect($scope.beers.length).toBe(1);
    //   expect($scope.newBeer).toBe(null);
    //   expect($scope.beers[0].name).toBe('the response beer');
    // });

    // it('should create a new brewer', () => {
    //   $httpBackend.expectPost('http:localhost:5000/api/brewers', {name: 'the sent brewer'}).respond(200, {name: 'the response brewer'});
    //   $scope.newBeer = {name: 'the new brewer'};
    //   $scope.createBeer({name: 'the sent brewer'});
    //   $httpBackend.flush();
    //   expect($scope.brewers.length).toBe(1);
    //   expect($scope.newBrewer).toBe(null);
    //   expect($scope.brewers[0].name).toBe('the response brewer');
    // });

    it('should update a brewer', () => {
      var brewer = {_id: 1, editing: true};
      $httpBackend.expectPUT('http://localhost:3000/api/brewers' + '/1').respond(200);
      $scope.updateBrewer(brewer);
      $httpBackend.flush();
      expect(brewer.editing).toBe(false);
    });

    // it('should update a beer', () => {
    //   var testBeer = {name: 'inside scope', editing: true, _id: 5};
    //   $scope.beers.push(testBeer);
    //   $httpBackend.expectPUT('http://localhost:5000/api/beers/5', testBeer).respond(200);
    //   $scope.updateBeer(testBeer);
    //   $httpBackend.flush();
    //   expect(testBeer.editing).toBe(false);
    //   expect($scope.beers[0].editing).toBe(false);
    // });
    it('should update a brewer', () => {
          var brewer = {_id: 1, editing: true};
          $httpBackend.expectPUT('http://localhost:3000/api/brewers' + '/1').respond(200);
          $scope.updateBrewer(brewer);
          $httpBackend.flush();
          expect(brewer.editing).toBe(false);
        });

    //   it('should update a brewer', () => {
    //   var testBeer = {name: 'inside scope', editing: true, _id: 5};
    //   $scope.brewers.push(testBeer);
    //   $httpBackend.expectPUT('http://localhost:5000/api/brewers/5', testBeer).respond(200);
    //   $scope.updateBrewer(testBeer);
    //   $httpBackend.flush();
    //   expect(testBeer.editing).toBe(false);
    //   expect($scope.brewers[0].editing).toBe(false);
    // });

    it('should be able to delete a brewer', () => {
      var brewer = {_id: 1, name: 'test brewer'};
      $scope.brewer = [brewer];
      $httpBackend.expectDELETE('http://localhost:3000/api/brewers' + '/1').respond(200);
      $scope.deleteBrewer(brewer);
      $httpBackend.flush();
      expect($scope.brewers.length).toBe(0);
    })  

    // it('should remove a beer', () => {
    //   var testBeer = {name: 'removed beer', _id:1};
    //   $scope.beers.push(testBeer);
    //   expect($scope.beers.indexOf(testBeer)).not.toBe(-1);
    //   $httpBackend.expectDELETE('http://localhost:5000/api/beers/1').respond(200);
    //   $scope.deleteBeer(testBeer);
    //   $httpBackend.flush();
    //   expect($scope.beers.indexOf(testBeer)).toBe(-1);
    // });

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
