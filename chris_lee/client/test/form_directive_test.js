var angular = require('angular');
var ctTemplate = require('../app/templates/ct/directives/ct_form_directive.html');
var tTemplate = require('../app/templates/t/directives/t_form_directive.html');

describe('form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('CSApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the CT directive', () => {
    $httpBackend.when('GET', '/templates/ct/directives/ct_form_directive.html').respond(200, ctTemplate);
    var element = $compile('<ct-form data-ct="{}" data-button-text="test button"></ct-form')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save CT function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/ct/directives/ct_form_directive.html').respond(200, ctTemplate);
    var called = false;
    scope.ct = {name: 'inside ct scope'};

    scope.testSave = function(input) {
      expect(input.name).toBe('from ct directive');
      scope.ct = input;
      called = true
    };

    var element = $compile('<ct-form data-ct="{name: \'inside directive\'}" data-save=testSave></ct-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(typeof element.isolateScope().save).toBe('function');
    element.isolateScope().save(scope)({name: 'from ct directive'});
    expect(called).toBe(true);
    expect(scope.ct.name).toBe('from ct directive');
  })

  it('should load the T directive', () => {
    $httpBackend.when('GET', '/templates/t/directives/t_form_directive.html').respond(200, tTemplate);
    var element = $compile('<t-form data-t="{}" data-button-text="test button"></ct-form')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save T function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/t/directives/t_form_directive.html').respond(200, tTemplate);
    var called = false;
    scope.t = {name: 'inside scope'};

    scope.testSave = function(input) {
      expect(input.name).toBe('from t directive');
      scope.t = input;
      called = true
    };

    var element = $compile('<t-form data-t="{name: \'inside directive\'}" data-save=testSave></t-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(typeof element.isolateScope().save).toBe('function');
    element.isolateScope().save(scope)({name: 'from t directive'});
    expect(called).toBe(true);
    expect(scope.t.name).toBe('from t directive');
  })

});
