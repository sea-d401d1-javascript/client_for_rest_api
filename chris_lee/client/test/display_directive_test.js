var angular = require('angular');
var ctTemplate = require('../app/templates/ct/directives/ct_display_directive.html');
var tTemplate = require('../app/templates/ct/directives/t_display_directive.html');

describe('display directives', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('CSApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the CT display directive', () => {
    $httpBackend.when('GET', '/templates/ct/directives/ct.html').respond(200, ctTemplate);
    var element = $compile('<ct data-ct-data="{name: \'inside ct directive\'}"></ct>')($rootScope);
    console.log(element);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside ct directive');
  });

  // it('should transclude the CT element', () => {
  //   $httpBackend.when('GET', '/templates/ct/directives/ct.html').respond(200, ctTemplate);
  //   var element = $compile('<ct data-ct-data="{name: \'inside directive\'}"></ct>')($rootScope);
  //   $httpBackend.flush();
  //   $rootScope.$digest();
  //   expect(element.html()).toContain('inside directive');
  // });

  it('should load the T display directive', () => {
    $httpBackend.when('GET', '/templates/t/directives/t.html').respond(200, tTemplate);
    var element = $compile('<t data-t-data="{name: \'inside t directive\'}"></t>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside t directive');
  });

  // it('should transclude the T element', () => {
  //   $httpBackend.when('GET', '/templates/t/directives/t.html').respond(200, tTemplate);
  //   var element = $compile('<ct data-t-data="{name: \'inside t directive\'}"></ct>')($rootScope);
  //   $httpBackend.flush();
  //   $rootScope.$digest();
  //   expect(element.html()).toContain('inside t directive');
  // });

})
