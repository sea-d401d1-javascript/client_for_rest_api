var angular = require('angular');
var template = require('../app/templates/flower_form.html');

describe('flower form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('flower'));
  
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.expectGET('/templates/flower_form.html').respond(200, template);

    var element = $compile('<flower-form data-flower="{}" data-button-text="test button"></flower-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/flower_form.html').respond(200, template);
    var called = false;
    scope.flower = {name: 'inside scope'};
    
    scope.testSave = function(input) {
      expect(input.name).toBe('from directive');
      scope.flower = input;
      called = true;
    }                     // remember that this behaves a little different just name the function and not pass it anything
    var element = $compile('<flower-form data-flower="{name: \'inside directive\'}" data-save="testSave"></flower-form>')(scope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(typeof element.isolateScope().save).toBe('function');
    element.isolateScope().save(scope)({name: 'from directive'});
    expect(called).toBe(true);
    expect(scope.flower.name).toBe('from directive');
  });

});
