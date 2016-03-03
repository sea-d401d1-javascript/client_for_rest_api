var angular = require('angular');

describe('politicians controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('politiciansApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var politiciansController = $ControllerConstructor('PoliticiansController', {$scope});
    expect(typeof politiciansController).toBe('object');
    expect(Array.isArray($scope.demPoliticians)).toBe(true);
    expect(typeof $scope.getDem).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('PoliticiansController', {$scope});
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/demPoliticians', () => {
       $httpBackend.expectGET('http://localhost:5000/api/demPoliticians').respond(200, [{name: 'Jackie'}]);
       $scope.getDem();
       $httpBackend.flush();
       expect($scope.demPoliticians.length).toBe(1);
       expect($scope.demPoliticians[0].name).toBe('Jackie');
     });

     it('should create a new politician', () => {
       $httpBackend.expectPOST('http://localhost:5000/api/demPoliticians', {name: 'the sent politician'}).respond(200, {name: 'the response politician'});
       $scope.demPolitician = {name: 'the new dem politician'};
       $scope.createDemPolitician({name: 'the sent politician'});
       $httpBackend.flush();
       expect($scope.demPoliticians.length).toBe(1);
       expect($scope.demPolitician).toBe(null);
       expect($scope.demPoliticians[0].name).toBe('the response politician');
     });

     it('should update a politician', () => {
       var testDemPolitician = {name: 'inside scope', editing: true, _id: 5};
       $scope.demPoliticians.push(testDemPolitician);
       $httpBackend.expectPUT('http://localhost:5000/api/demPoliticians/5', testDemPolitician).respond(200);
       $scope.updateDemPolitician(testDemPolitician);
       $httpBackend.flush();
       expect(testDemPolitician.editing).toBe(false);
       expect($scope.demPoliticians[0].editing).toBe(false);
     });

     it('should murder a politician', () => {
       var testDemPolitician = {name: 'condemned politician', _id: 1};
       $scope.demPoliticians.push(testDemPolitician);
       expect($scope.demPoliticians.indexOf(testDemPolitician)).not.toBe(-1);
       $httpBackend.expectDELETE('http://localhost:5000/api/demPoliticians/1').respond(200);
       $scope.deleteDemPolitician(testDemPolitician);
       $httpBackend.flush();
       expect($scope.demPoliticians.indexOf(testDemPolitician)).toBe(-1);
     });
   });
 });
