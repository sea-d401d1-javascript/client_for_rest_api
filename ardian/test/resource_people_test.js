var angular = require('angular');

describe('resource service', () => {
  beforeEach(angular.mock.module('myApp'));

  var $httpBackend;
  var Resource;
  beforeEach(angular.mock.inject(function(_$httpBackend_, myResource) {
    $httpBackend = _$httpBackend_;
    Resource = myResource('/people');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', () => {
    expect(typeof Resource).toBe('object');
  });

  it('should getAll people', () => {
    $httpBackend.expectGET('http://localhost:3000/api/people').respond(200, [{name: 'test people'}]);
    Resource.getAllPeople(function(err, data) {
      expect(err).toBe(null);
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('test people')
    });
    $httpBackend.flush();
  });

  it('should create a person', () => {
    $httpBackend.expectPOST('http://localhost:3000/api/people', {name: 'the sent person'}).respond(200, {name: 'the response person'});
    var cbCalled = false;
    Resource.create({name: 'the sent person'}, function(err, data) {
      cbCalled = true;
      expect(err).toBe(null);
      expect(data.name).toBe('the response person');
    });
    $httpBackend.flush();
    expect(cbCalled).toBe(true);
  });

  it('should edit a shark', () => {
    var testPerson = {name: 'inside scope', _id: 5};
    $httpBackend.expectPUT('http://localhost:3000/api/people/5', testPerson).respond(200);
    var cbCalled = false;
    Resource.update(testPerson, function(err, res) {
      cbCalled = true;
      expect(err).toBe(null);
      expect(res).not.toBe(null);
    });
    $httpBackend.flush();
    expect(cbCalled).toBe(true);
  });

  it('should delete a shark', () => {
    var testPerson = {name: 'condemned shark', _id: 1};
    $httpBackend.expectDELETE('http://localhost:3000/api/people/1').respond(200);
    Resource.delete(testPerson, function(err, res) {
      expect(err).toBe(null);
      expect(res).not.toBe(null);
    });
    $httpBackend.flush();
  });
});
