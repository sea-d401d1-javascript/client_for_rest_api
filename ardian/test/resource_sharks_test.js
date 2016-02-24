var angular = require('angular');

describe('resource service', () => {
  beforeEach(angular.mock.module('myApp'));

  var $httpBackend;
  var Resource;
  beforeEach(angular.mock.inject(function(_$httpBackend_, myResource) {
    $httpBackend = _$httpBackend_;
    Resource = myResource('/sharks');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', () => {
    expect(typeof Resource).toBe('object');
  });

  it('should getAll sharks', () => {
    $httpBackend.expectGET('http://localhost:3000/api/sharks').respond(200, [{name: 'test shark'}]);
    Resource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('test shark')
    });
    $httpBackend.flush();
  });

  it('should create a shark', () => {
    $httpBackend.expectPOST('http://localhost:3000/api/sharks', {name: 'the sent shark'}).respond(200, {name: 'the response shark'});
    var cbCalled = false;
    Resource.create({name: 'the sent shark'}, function(err, data) {
      cbCalled = true;
      expect(err).toBe(null);
      expect(data.name).toBe('the response shark');
    });
    $httpBackend.flush();
    expect(cbCalled).toBe(true);
  });

  it('should edit a shark', () => {
    var testShark = {name: 'inside scope', _id: 5};
    $httpBackend.expectPUT('http://localhost:3000/api/sharks/5', testShark).respond(200);
    var cbCalled = false;
    Resource.update(testShark, function(err, res) {
      cbCalled = true;
      expect(err).toBe(null);
      expect(res).not.toBe(null);
    });
    $httpBackend.flush();
    expect(cbCalled).toBe(true);
  });

  it('should delete a shark', () => {
    var testShark = {name: 'condemned shark', _id: 1};
    $httpBackend.expectDELETE('http://localhost:3000/api/sharks/1').respond(200);
    Resource.delete(testShark, function(err, res) {
      expect(err).toBe(null);
      expect(res).not.toBe(null);
    });
    $httpBackend.flush();
  });
});
