var angular = require('angular');
var ctTemplate = require('../app/templates/ct/directives/ct.html');
var tTemplate = require('../app/templates/t/directives/t.html');

describe('display directives', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('CSApp'));

  before(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the CT directive', () => {
    $httpBackend.when('GET', '/templates/ct/directives/ct.html').respond(200, ctTemplate);
    var element = $compile('<ct data-ct-data="{name: \'inside ct directive\'}"></ct>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside ct directive');
  });

  it('should transclude the CT element', () => {
    $httpBackend.when('GET', '/templates/ct/directives/ct.html').respond(200, ctTemplate);
    var element = $compile('<ct data-ct-data="{name: \'inside directive\'}"></ct>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside directive');
  });

  it('should load the T directive', () => {
    $httpBackend.when('GET', '/templates/t/directives/t.html').respond(200, tTemplate);
    var element = $compile('<ct data-t-data="{name: \'inside t directive\'}"></ct>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside t directive');
  });

  it('should transclude the T element', () => {
    $httpBackend.when('GET', '/templates/t/directives/t.html').respond(200, tTemplate);
    var element = $compile('<ct data-t-data="{name: \'inside t directive\'}"></ct>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside t directive');
  });

})
