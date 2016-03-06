var angular = require('angular');
var template = require('../app/templates/beers/directives/beer.html');

describe('beer display directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('beer'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.expectGET('/templates/beers/directives/beer.html').respond(200, template);

    var element = $compile('<beer data-beer-data="{name: \'test beer\'}"></beer>')($rootScope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test beer');
  });

    it('should pass in a beer off of the scope', () => {
    $httpBackend.expectGET('/templates/beers/directives/beer.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.beer = {name: 'test beer 2', style: 'stout'};

    var element = $compile('<beer data-beer-data="beer"></beer>')(scope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test beer 2');
  });
});
