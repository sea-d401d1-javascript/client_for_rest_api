var angular = require('angular');
var template = require('../app/templates/brewers/directives/brewer.html');

describe('brewer display directive', () => {
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
    $httpBackend.expectGET('/templates/brewers/directives/brewer.html').respond(200, template);

    var element = $compile('<brewer data-brewer-data="{name: \'test brewer\'}"></brewer>')($rootScope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test brewer');
  });

    it('should pass in a brewer off of the scope', () => {
    $httpBackend.expectGET('/templates/brewers/directives/brewer.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.brewer = {name: 'test brewer 2', style: 'stout'};

    var element = $compile('<brewer data-brewer-data="brewer"></brewer>')(scope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test brewer 2');
  });
});
