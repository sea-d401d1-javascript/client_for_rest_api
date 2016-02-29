var angular = require('angular');
var template = require('../app/templates/sithlords/directives/sith_form_directive.html');

describe('sith form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('jedisApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/sithlords/directives/sith_form_directive.html').respond(200, template);

    var element = $compile('<sith-form data-sith="{}" data-button-text="test button"></sith-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/sithlords/directives/sith_form_directive.html').respond(200, template);
    var called = false;
    scope.sith = {name: 'inside scope'};

    scope.testSave = function(input) {
      scope.sith = input;
      called = true;
    };

    var element = $compile('<sith-form data-sith="{name: \'inside directive\'}" data-save=testSave></sith-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({name: 'test sith'});
    expect(called).toBe(true);
    expect(scope.sith.name).toBe('test sith');
  });

});
