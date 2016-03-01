var angular = require('angular');
var template = require('../app/templates/dogs/dogs_form.html');

describe('dog form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('petsApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the form directive', () => {
    $httpBackend.when('GET', '/templates/dogs/dogs_form.html').respond(200, template);

    var element = $compile('<dog-form data-dog="{}" data-button-text="test button"></dog-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed "save" function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/dogs/dogs_form.html').respond(200, template);
    var called = false;
    scope.dog = { name: 'inside scope' };

    scope.testSave = function(input) {
      expect(input.name).toBe('from directive');
      scope.dog = input;
      called = true;
    };

    var element = $compile('<dog-form data-dog="{ name: \'inside directive\' }" data-save=testSave></dog-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({ name: 'from directive' });
    expect(called).toBe(true);
    expect(scope.dog.name).toBe('from directive');
  });
});
