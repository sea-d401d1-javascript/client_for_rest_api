var angular = require('angular');

describe('request auth service', () => {
  beforeEach(angular.mock.module('hogcApp'));

  var $httpBackend;
  var Resource;
  beforeEach(angular.mock.inject(function(_$httpBackend_, cfResource) {
    $httpBackend = _$httpBackend_;
    Resource = cfResource;
  }));

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });
});
