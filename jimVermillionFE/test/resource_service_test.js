var angular = require('angular');

describe('resource service', () => {
  
  var testService;
  var $httpBackend;
  var flowerResource;

  beforeEach(angular.mock.module('flower'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, Resource) {
    $httpBackend = _$httpBackend_;
    flowerResource = Resource;
    testService = Resource('api/test');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', () => {
    expect(typeof flowerResource).toBe('function');
  });

  it('should service should have prop of resourceName', () => {
    expect(testService.resourceName).toBe('api/test');
  });

  it('should service the get success', () => {
    var successFlower = {name: 'success flower!'};
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(200, successFlower);
    testService.get((err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(successFlower.name);
    });
    $httpBackend.flush();
  });

  it('should service the get err', () => {
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(404, 'what the what?');
    testService.get((err, res) => {
      expect(err.data).toBe('what the what?');
      expect(err.status).not.toBe(undefined);
      expect(res).toBe(undefined);
    });
    $httpBackend.flush();
  });

  it('should service the post success', () => {
    var successFlower = {name: 'success bear!'};
    $httpBackend.expectPOST('http://localhost:3000/api/test').respond(200, successFlower);
    testService.create(successFlower, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(successFlower.name);
    });
    $httpBackend.flush();
  });

  it('should service the PUT success', () => {
    var successFlower = {name: 'success bear!', _id:1};
    $httpBackend.expectPUT('http://localhost:3000/api/test/1').respond(200, successFlower);
    testService.update(successFlower, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(successFlower.name);
    });
    $httpBackend.flush();
  });

  it('should service the DELETE success', () => {
    var successFlower = {name: 'success bear!', _id:1};
    $httpBackend.expectDELETE('http://localhost:3000/api/test/1').respond(200, successFlower);
    testService.delete(successFlower, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(successFlower.name);
    });
    $httpBackend.flush();
  });
});
