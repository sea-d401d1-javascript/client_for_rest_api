var angular = require('angular');

describe('resource service', () => {
  beforeEach(angular.mock.module('petsApp'));

  var $httpBackend;
  var Resource;

  beforeEach(angular.mock.inject(function(_$httpBackend_, catResource) {
    $httpBackend = _$httpBackend_;
    Resource = catResource;
  }));

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });

  it('should make a successful cat resource GET request via the service', () => {
    var res = new Resource('/cats');
    $httpBackend.expectGET('http://localhost:3000/app/cats').respond(200, { name: 'GET cat', _id: 1 });
    res.get(function(err, res) {
      expect(res.name).toBe('GET cat');
    });
    $httpBackend.flush();
  });

  // it('should make a successful POST request via the service', () => {
  //   var res = new Resource('/cats');
  //   $httpBackend.expectPOST({ name: 'the POST bear', _id: 2 }, 'http://localhost:3000/app/cats').respond(200, { name: 'the response bear', _id: 3 });
  //   res.create(function(err, res) {
  //     expect(res.name).toBe('the response bear');
  //     expect(err).toBe(null);
  //   });
  //   $httpBackend.flush();
  // });

});
