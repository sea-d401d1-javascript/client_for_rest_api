var angular = require('angular');
var template = require('../app/templates/jedis/directives/jedi_form_directive.html');

describe('jedi form directive', () => {
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
    $httpBackend.when('GET', '/templates/jedis/directives/jedi_form_directive.html').respond(200, template);

    var element = $compile('<jedi-form data-jedi="{}" data-button-text="test button"></jedi-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/jedis/directives/jedi_form_directive.html').respond(200, template);
    var called = false;
    scope.jedi = {name: 'inside scope'};

    scope.testSave = function(input) {
      scope.jedi = input;
      called = true;
    };

    var element = $compile('<jedi-form data-jedi="{name: \'inside directive\'}" data-save=testSave></jedi-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({name: 'test jedi'});
    expect(called).toBe(true);
    expect(scope.jedi.name).toBe('test jedi');
  });

});
