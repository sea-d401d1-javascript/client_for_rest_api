var angular = require('angular');
var template = require('../../app/templates/donors/directives/donor.html');

describe('donor display directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('hogcApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to display donor data', () => {
    $httpBackend.whenGET('/templates/donors/directives/donor.html').respond(200, template);

    var element = $compile('<donor data-donor-data="{username: \'test username\'}"></donor>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test username');
  });

  it('should be able to display update donor options', () => {
    $httpBackend.whenGET('/templates/donors/directives/donor.html').respond(200, template);

    var element = $compile('<donor data-donor-data="{username: \'test username\', editing: true}"></donor>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test username');
    expect(element.html()).toContain('<div data-ng-transclude=');
  });
});
