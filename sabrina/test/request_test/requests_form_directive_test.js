var angular = require('angular');
var template = require('../../app/templates/requests/directives/request_form_directive.html');

describe('request form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('hogcApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/requests/directives/request_form_directive.html').respond(200, template);

    var element = $compile('<request-form data-request="{}" data-button-text="test button"></request-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/requests/directives/request_form_directive.html').respond(200, template);
    var called = false;
    scope.request = {name: 'inside scope'};

    scope.testSave = function(input) {
      expect(input.name).toBe('from directive');
      scope.request = input;
      called = true;
    };

    var element = $compile('<request-form data-request="{name: \'inside directive\'}" data-save=testSave></request-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({name: 'from directive'});
    expect(called).toBe(true);
    expect(scope.request.name).toBe('from directive');
  });
});
