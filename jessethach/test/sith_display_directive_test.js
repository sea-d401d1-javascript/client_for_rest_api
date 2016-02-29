var angular = require('angular');
var template = require('../app/templates/sithlords/directives/sith.html');

describe('sith display directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('jedisApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive with an appropriate scope', () => {
    $httpBackend.when('GET', '/templates/sithlords/directives/sith.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.newSith = {name: 'test sith', status: 'Dead', lightsaberColor: 'green'};
    var element = $compile('<sith data-sith-data="newSith">This is a test</sith>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test sith');
    expect(element.html()).toContain('Dead');
    expect(element.html()).toContain('green');
    expect(element.html()).toContain('This is a test');
  });

  it('should load the directive with an appropriate object', () => {
    $httpBackend.when('GET', '/templates/sithlords/directives/sith.html').respond(200, template);
    var scope = $rootScope.$new();
    var element = $compile('<sith data-sith-data="{name: \'test\', status: \'Alive\', lightsaberColor: \'blue\'}">inside directive</sith>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test');
    expect(element.html()).toContain('Alive');
    expect(element.html()).toContain('blue');
    expect(element.html()).toContain('inside directive');
  });
});
