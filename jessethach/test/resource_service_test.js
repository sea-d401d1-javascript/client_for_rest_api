var angular = require('angular');

describe('resource service', () => {

  var testService;
  var $httpBackend;
  var Resource;

  beforeEach(angular.mock.module('jedisApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, cfResource) {
    $httpBackend = _$httpBackend_;
    Resource = cfResource;
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
    var successJedi = {name: 'success jedi!'};
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(200, successJedi);
    testService.getAll((err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(successJedi.name);
    });
    $httpBackend.flush();
  });

  it('should service the getAll err', () => {
    var successJedi = {name: 'success jedi!'};
    $httpBackend.expectGET('http://localhost:3000/api/test').respond(404, 'what the what?');
    testService.getAll((err, res) => {
      expect(err.data).toBe('what the what?');
      expect(err.status).not.toBe(undefined);
      expect(res).toBe(undefined);
    });
    $httpBackend.flush();
  });

  it('should service the create function', () => {
    var jedi = {name: 'created jedi'};
    $httpBackend.expectPOST('http://localhost:3000/api/test', jedi).respond(200, jedi);
    testService.create(jedi, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe(jedi.name);
    });
    $httpBackend.flush();
  });

  it('should service the update function', () => {
    var jedi = {name: 'updatejedi', _id: 1};
    $httpBackend.expectPUT('http://localhost:3000/api/test/1', jedi).respond(200, jedi);
    testService.update(jedi, (err, res) => {
      expect(err).toBe(null);
      expect(res._id).toBe(1);
    });
    $httpBackend.flush();
  });

  it('should service the delete function', () => {
    var jedi = {name: 'deletejedi', _id: 1};
    $httpBackend.expectDELETE('http://localhost:3000/api/test/1').respond(200, jedi);
    testService.delete(jedi, (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe('deletejedi');
    });
    $httpBackend.flush();
  });

});
