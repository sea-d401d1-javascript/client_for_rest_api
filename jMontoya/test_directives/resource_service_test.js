var angular = require('angular');

describe('reosurce service', () => {
  beforeEach(angular.mock.module('politiciansApp'));

  var $httpBackend;
  var Resource;
  beforeEach(angular.mock.inject(function(_$httpBackend_, Resource) {
    $httpBackend = _$httpBackend_;
    Resource = Resource;
  }));

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });
});
