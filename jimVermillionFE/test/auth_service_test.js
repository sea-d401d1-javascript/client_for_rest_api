var angular = require('angular');

describe('request auth service', () => {
  beforeEach(angular.mock.module('flower'));

  var $httpBackend;
  var fa;
  beforeEach(angular.mock.inject(function(_$httpBackend_, flowerAuth) {
    $httpBackend = _$httpBackend_;
    fa = flowerAuth;
    console.log(fa);

  }));

  it('should be a service', () => {
    expect(typeof fa).toBe('object');
    expect(typeof fa.signIn).toBe('function');
  });
});
