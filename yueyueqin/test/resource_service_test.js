require(__dirname + '/../app/js/two_resources_controller');
var angular = require('angular');
require('angular-mocks');

describe('resource service', () => {
  beforeEach(angular.mock.module('twoResourcesApp'));
  var $httpBackend;
  var testResource;
  beforeEach(angular.mock.inject(function(_$httpBackend_, twoResource){
    $httpBackend = _$httpBackend_;
    Resource = twoResource;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
    var testResource = Resource('/test');
    expect(testResource.ResourceName).toBe('/test');
  });

  describe('Test Service Resource Prototypes', () => {
    var $httpBackend;
    var Resource;
    var testResource;
    beforeEach(angular.mock.inject(function(_$httpBackend_, twoResource){
      $httpBackend = _$httpBackend_;
      Resource = twoResource;
      testResource = Resource('/test');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('GET All Data', () => {
      var getTest = {name: 'gettest'};
      var plugin = false;
      expect(typeof testResource).toBe('object');
      $httpBackend.expectGET('http://localhost:3000/api/test')
        .respond(200, getTest);
      testResource.getAll(function(err, res){
        expect(err).toBe(null);
        expect(res.name).toBe(getTest.name);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

    it('POST Data', () => {
      var postTest = {name: 'posttest'};
      var plugin = false;
      $httpBackend.expectPOST('http://localhost:3000/api/test',postTest)
        .respond(200, postTest);
      testResource.create(postTest,function(err,res){
        expect(err).toBe(null);
        expect(res.name).toBe(postTest.name);
        plugin  = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

    it('UPDATE Data', () => {
      var putTest = {_id:3,name: 'putTest'};
      var plugin = false;
      $httpBackend.expectPUT('http://localhost:3000/api/test/' + putTest._id, putTest)
        .respond(200);
      testResource.update(putTest,function(err, res) {
        expect(err).toBe(null);
        expect(res).toBe(undefined);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });
    it('DELETE Data', () => {
      var deleteTest = {_id:3, name: 'deleteTest'};
      var plugin = false;
      $httpBackend.expectDELETE('http://localhost:3000/api/test/' + deleteTest._id)
        .respond(200);
      testResource.delete(deleteTest,function(err, res) {
        expect(err).toBe(null);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

    it('Handle Error',() => {
      var plugin = false;
      $httpBackend.expectGET('http://localhost:3000/api/test')
        .respond(404);
      testResource.getAll(function(err,res){
        expect(err.status).toBe(404);
        expect(res).toBe(undefined);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });
  });

});
