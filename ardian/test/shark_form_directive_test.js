var angular = require('angular');
var template = require('../app/templates/sharks/directives/sharks_form.html');

describe('shark form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('myApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/sharks/directives/sharks_form.html').respond(200, template);

    var element = $compile('<shark-form data-shark="{}" data-button-text="test button"></shark-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save function', () =>{
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/sharks/directives/sharks_form.html').respond(200, template);
    var called = false;
    scope.bear = {name: 'inside scope'};

    scope.testSave = function(input) {
      expect(input.name).toBe('from directive');
      scope.bear = input;
      called = true;
    };

    var element = $compile('<shark-form data-shark="{name: \'inside directive\'}" data-save=testSave></shark-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({name: 'from directive'});
    expect(called).toBe(true);
    expect(scope.bear.name).toBe('from directive');
  });

});
