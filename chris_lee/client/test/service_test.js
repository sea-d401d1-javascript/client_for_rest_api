var angular = require('angular');

describe('resource service', () => {

  var $httpBackend;
  var Resource;
  var testService;

  beforeEach(angular.mock.module('CSApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, csResource) {
    $httpBackend = _$httpBackend_;
    Resource = csResource;
    testService = Resource('/test');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });

  it('should have a resource name', () => {
    expect(testService.resourceName).toBe('/test');
  });

  it('should handle success of the get function', () => {
    var err, res;
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(200, {name: 'test CT'});
    testService.get((_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).toBe(null);
    expect(res.name).toBe('test CT');
  });

  it('should handle failure of the get function', () => {
    var err, res;
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(404, 'error');
    testService.get((_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).not.toBe(null);
    expect(err.status).toBe(404);
    expect(err.data).toBe('error');
    expect(res).toBe(undefined);
  });

  it('should handle success of the create function', () => {
    var newCT = {name: 'new CT'};
    var err, res;
    $httpBackend.expectPOST('http://localhost:3000/api/test').respond(200, newCT);
    testService.create(newCT, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).toBe(null);
    expect(res.name).toBe(newCT.name);
  });

  it('should handle failure of the create function', () => {
    var newCT = {name: 'new CT'};
    var err, res;
    $httpBackend.expectPOST('http://localhost:3000/api/test').respond(404, 'error');
    testService.create(newCT, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).not.toBe(null);
    expect(err.status).toBe(404);
    expect(err.data).toBe('error');
    expect(res).toBe(undefined);
  });

  it('should handle success of the update function', () => {
    var testCT = {name: 'test CT', _id: '123'};
    var err, res;
    $httpBackend.expectPUT('http://localhost:3000/api/test/123').respond(200, testCT);
    testService.update(testCT, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).toBe(null);
    expect(res.name).toBe(testCT.name);
  });

  it('should handle failure of the update function', () => {
    var testCT = {name: 'test CT', _id: '123'};
    var err, res;
    $httpBackend.expectPUT('http://localhost:3000/api/test/123').respond(404, 'error');
    testService.update(testCT, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).not.toBe(null);
    expect(err.status).toBe(404);
    expect(err.data).toBe('error');
    expect(res).toBe(undefined);
  });

  it('should handle success of the delete function', () => {
    var testCT = {name: 'test CT', _id: '123'};
    var err, res;
    $httpBackend.expectDELETE('http://localhost:3000/api/test/123').respond(200, testCT);
    testService.delete(testCT, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).toBe(null);
    expect(res.name).toBe(testCT.name);
  });

  it('should handle failure of the delete function', () => {
    var testCT = {name: 'test CT', _id: '123'};
    var err, res;
    $httpBackend.expectDELETE('http://localhost:3000/api/test/123').respond(404, 'error');
    testService.delete(testCT, (_err_, _res_) => {
      err = _err_;
      res = _res_;
    });
    $httpBackend.flush();
    expect(err).not.toBe(null);
    expect(err.status).toBe(404);
    expect(err.data).toBe('error');
    expect(res).toBe(undefined);
  });

});
