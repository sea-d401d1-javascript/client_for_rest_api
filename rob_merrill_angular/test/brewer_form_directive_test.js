var angular = require('angular');
var template = require('../app/templates/brewers/directives/brewer_form_directive.html');

describe('brewer form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('brewer'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.expectGET('/templates/brewers/directives/brewer_form_directive.html').respond(200, template);

    var element = $compile('<brewer-form data-brewer="{}" data-button-text="test button"></brewer-form>')($rootScope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test brewer');
  });

    it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/brewers/directives/brewer_form_directive.html').respond(200, template);
    var called = false;
    scope.brewer = {name: 'Ballast Point'};

    scope.testSave = function(input) {
      expect(input.name).toBe('form directive');
      scope.brewer = input;
      called: true;
    }

    var element = $compile('<brewer-form data-brewer="{name: \'Ballast Point\'}" data-save="testSave"></brewer-form>')(scope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(typeof element.isolateScope().save).toBe('function');
      element.isolateScope().save(scope)({name: 'form directive'});
      expect(called).toBe(true);
      expect(scope.brewer.name).toBe('form directive')
  });
});
