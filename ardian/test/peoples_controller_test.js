var angular = require('angular');

//Testing the PeoplesController
describe('People controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('myApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a people controller', () => {
    var peoplesController = $ControllerConstructor('PeoplesController', {$scope});
    expect(typeof peoplesController).toBe('object');
    expect(Array.isArray($scope.peoples)).toBe(true);
    expect(typeof $scope.getAllPeople).toBe('function');
  });

  describe('REST request', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('PeoplesController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/people', () => {
      $httpBackend.expectGET('http://localhost:3000/api/people').respond(200, [{name: 'test person'}]);
      $scope.getAllPeople();
      $httpBackend.flush();
      expect($scope.peoples.length).toBe(1);
      expect($scope.peoples[0].name).toBe('test person');
    });

    it('should create a new person', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/people', {name: 'the sent person'}).respond(200, {name: 'the response person'});
      $scope.newPeople = {name: 'the new person'};
      $scope.createPeople({name: 'the sent person'});
      $httpBackend.flush();
      expect($scope.peoples.length).toBe(1);
      expect($scope.newPeople).toBe(null);
      expect($scope.peoples[0].name).toBe('the response person');
    });

    it('should update a person', () => {
      var testPerson = {name: 'inside scope', editing: true, _id: 5};
      $scope.peoples.push(testPerson);
      $httpBackend.expectPUT('http://localhost:3000/api/people/5', testPerson).respond(200);
      $scope.updatePeople(testPerson);
      $httpBackend.flush();
      expect(testPerson.editing).toBe(false);
      expect($scope.peoples[0].editing).toBe(false);
    });

    it('should delete a person', () => {
      var testPerson = {name: 'delete person', _id: 1};
      $scope.peoples.push(testPerson);
      expect($scope.peoples.indexOf(testPerson)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/people/1').respond(200);
      $scope.deletePeople(testPerson);
      $httpBackend.flush();
      expect($scope.peoples.indexOf(testPerson)).toBe(-1);
    });
  });
});// end of testing PeoplesController
