var angular = require('angular');

describe('politicians controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerCOnstructor;

  beforeEach(angular.mock.module('politiciansApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var politiciansController = $ControllerConstructor('politiciansController', {$scope});
    expect(typeof politiciansController).toBe('object');
    expect(Array.isArray($scope.politicians)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('politiciansController', {$scope});
    }));
    afterEach(() => {
      $httpBackend.verfiyNoOutstandingExpectation();
      $httpBackend.verfiyNoOutstandingRequests();
    });

    it('should make a get request to /api/demPoliticians', () => {
       $httpBackend.expectGET('http://localhost:5000/api/demPoliticians').respond(200, [{name: 'Jackie'}]);
       $scope.getAll();
       $httpBackend.flush();
       expect($scope.demPoliticians.length).toBe(1);
       expect($scope.demPoliticians[0].name).toBe('Jackie');
     });

     it('should create a new politician', () => {
       $httpBackend.expectPOST('http://localhost:5000/api/demPoliticians', {name: 'the sent politician'}).respond(200, {name: 'the response politician'});
       $scope.newDemPolitician = {name: 'the new dem politician'};
       $scope.createBear({name: 'the sent politician'});
       $httpBackend.flush();
       expect($scope.demPoliticians.length).toBe(1);
       expect($scope.newDemPolitician).toBe(null);
       expect($scope.demPoliticians[0].name).toBe('the response politician');
     });

     it('should update a politician', () => {
       var testPolitician = {name: 'inside scope', editing: true, _id: 5};
       $scope.demPoliticians.push(testPolitician);
       $httpBackend.expectPUT('http://localhost:5000/api/demPoliticians/5', testPolitician).respond(200);
       $scope.updatePolitician(testPolitician);
       $httpBackend.flush();
       expect(testDemPolitician.editing).toBe(false);
       expect($scope.demPoliticians[0].editing).toBe(false);
     });

     it('should murder a politician', () => {
       var testPolitician = {name: 'condemned politician', _id: 1};
       $scope.demPoliticians.push(testPolitician);
       expect($scope.demPoliticians.indexOf(testPolitician)).not.toBe(-1);
       $httpBackend.expectDELETE('http://localhost:3000/api/demPoliticians/1').respond(200);
       $scope.deletePolitcian(testPolitician);
       $httpBackend.flush();
       expect($scope.demPoliticians.indexOf(testPolitician)).toBe(-1);
     });
   });
 });
