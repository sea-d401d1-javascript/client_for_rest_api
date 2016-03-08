var angular = require('angular');

describe('resource service', () => {

  var testService;
  var $httpBackend;
  var Resource;

  beforeEach(angular.mock.module('beersApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, Resource) {
    $httpBackend = _$httpBackend_;
    Resource = Resource;
    testService = Resource('/test');
  }));

 afterEach(() => {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
   });
 
   it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });
 
   it('should let service have prop of resourceName', () => {
     expect(testService.resourceName).toBe('/test');
   });
 
  it('should service the getAll function', () => {
    var successBeer = {name: 'success beer!'};
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(200, successBeer);
    testService.getAll((err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(successBeer.name);
    });
    $httpBackend.flush();
  });

  it('should service the handlerror helper function', () => {
    var successBeer = {name: 'success beer!'};
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(404, 'incorrect address?');
    testService.getAll((err, res) => {
      expect(err.data).toBe('incorrect address?');
      expect(err.status).not.toBe(undefined);
      expect(res).toBe(undefined);
    });
    $httpBackend.flush();
  });
 
  it('should service the create function', () => {
    var beer = {name: 'created beer'};
    $httpBackend.expectPOST('http://localhost:3000/api/test', beer).respond(200, beer);
    testService.create(beer, (err, res) => {
      expect(err).toBe(null);
     expect(res.name).toBe(beer.name);
    });
   $httpBackend.flush();
  });
 
  it('should service the update function', () => {
     var beer = {name: 'updatebeer', _id: 1};
     $httpBackend.expectPUT('http://localhost:3000/api/test/1', beer).respond(200, beer);
     testService.update(beer, (err, res) => {
     expect(err).toBe(null);
      expect(res._id).toBe(1);
  });
    $httpBackend.flush();
  });
 
  it('should service the delete function', () => {
    var beer = {name: 'deletebeer', _id: 1};
    $httpBackend.expectDELETE('http://localhost:3000/api/test/1').respond(200, beer);
    testService.delete(beer, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe('deletebeer');
    });
   $httpBackend.flush();
  });
});
