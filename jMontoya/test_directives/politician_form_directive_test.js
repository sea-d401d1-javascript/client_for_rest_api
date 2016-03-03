var angular = require('angular');
var template = require('../app/templates/politicians/directives/dempolitician_form_directive.html');

describe('dem form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('politiciansApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/politicians/directives/dempolitician_form_directive.html').respond(200, template);

    var element = $compile('<demform data-dem="{}" data-button-text="test button"></demform>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/politicians/directives/dempolitician_form_directive.html').respond(200, template);
    var called = false;
    scope.demPolitician = {name: 'inside scope'};

    scope.testSave = function(input) {
      expect(input.name).toBe('from directive');
      scope.demPolitician = input;
      called = true;
    };

    var element = $compile('<demform data-dem="{name: \'inside directive\'}" data-save=testSave></demform>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({name: 'from directive'});
    expect(called).toBe(true);
    expect(scope.demPolitician.name).toBe('from directive');
  });
});
