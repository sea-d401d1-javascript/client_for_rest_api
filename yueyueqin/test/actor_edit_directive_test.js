var angular = require('angular');
var template = require('../app/templates/actors/directives/actor_edit.html');

describe('actor edit directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('twoResourcesApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/actors/directives/actor_edit.html')
      .respond(200, template);
    var element = $compile('<actor-edit data-actor-data="{name:\'inside directive\'}"></actor-edit>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside directive');
  });

  it('should transclude the element', () => {
    $httpBackend.when('GET', '/templates/actors/directives/actor_edit.html')
      .respond(200, template);
    var element = $compile('<actor-edit data-actor-data="{name:\'inside directive\'}"><p>Hello</p></actor-edit>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside directive');
    expect(element.html()).toContain('Hello');
  });
});
