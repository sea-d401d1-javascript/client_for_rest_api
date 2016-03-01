var angular = require('angular');
var template = require('../app/templates/beer_form_directive.html');

describe('beer form directive', () => {
  var $compile:
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('beer'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.expectGET('/templates/beer_form_directive.html').respond(200, template);

    var element = $compile('<beer-form data-beer="{}" data-button-text="test button"></beer-form>')($rootScope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test beer');
  });

    it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/beer_form_directive.html').respond(200, template);
    var called = false;
    scope.beer = {name: 'Ballast Point'};

    scope.testSave = function(input) {
      expect(input.name).toBe('form directive');
      scope.beer = input;
      called: true;
    }

    var element = $compile('<beer-form data-beer="{name: \'Ballast Point\'}" data-save="testSave"></beer-form>')(scope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(typeof element.isolateScope().save).toBe('function');
      element.isolateScope().save(scope)({name: 'form directive'});
      expect(called).toBe(true);
      expect(scope.beer.name).toBe('form directive')
  });
});
