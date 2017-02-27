'use strict';
require('../app/js/client');
var angular = require('angular');
require('angular-mocks');
var expect = require('karma').expect;
describe('Force Controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;
  beforeEach(angular.mock.module('ForceApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));
  it('Should be able to make a controller.', () => {
    var bearsController = $ControllerConstructor('ForceController', { $scope });
    expect(typeof bearsController).toBe('object');
    expect(Array.isArray($scope.bears)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });
  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('ForceController', { $scope });
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Should make a GET request to "/api/light".', () => {
      $httpBackend.expectGET('http://localhost:3000/api/light').respond(200, [{ name: 'Luke' }]);
      $scope.getAllLightJedi();
      $httpBackend.flush();
      expect($scope.lightJedi.length).toBe(1);
      expect($scope.lightJedi[0].name).toBe('Luke');
    });
    it('Should make a GET request to "/api/dark".', () => {
      $httpBackend.expectGET('http://localhost:3000/api/dark').respond(200, [{ name: 'Vader' }]);
      $scope.getAllDarkJedi();
      $httpBackend.flush();
      expect($scope.darkJedi.length).toBe(1);
      expect($scope.darkJedi[0].name).toBe('Vader');
    });
    it('Should make a POST request to "/api/light".', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/light', { name: 'the sent jedi' })
        .respond(200, { name: 'the response jedi' });
      $scope.newLightJedi = { name: 'the new jedi' };
      $scope.createLightJedi({ name: 'the sent jedi' });
      $httpBackend.flush();
      expect($scope.lightJedi.length).toBe(1);
      expect($scope.newLightJedi).toBe(null);
      expect($scope.lightJedi[0].name).toBe('the response jedi');
    });
    it('Should make a POST request to "/api/dark".', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/dark', { name: 'the sent jedi' })
        .respond(200, { name: 'the response jedi' });
      $scope.newDarkJedi = { name: 'the new jedi' };
      $scope.createDarkJedi({ name: 'the sent jedi' });
      $httpBackend.flush();
      expect($scope.darkJedi.length).toBe(1);
      expect($scope.newDarkJedi).toBe(null);
      expect($scope.darkJedi[0].name).toBe('the response jedi');
    });
  });
});
