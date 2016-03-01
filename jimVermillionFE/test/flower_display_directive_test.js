var angular = require('angular');
var template = require('../app/templates/flower_app_resource.html');

describe('flower display directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('flower'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) { // wtf does this come from? how??
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.expectGET('/templates/flower_app_resource.html').respond(200, template);

    var element = $compile('<flower data-flower-data="{name: \'test flower\'}"></flower>')($rootScope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test flower');
  });

    it('should pass in a flower off of the scope', () => {
    $httpBackend.expectGET('/templates/flower_app_resource.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.flower = {name: 'test flower 2', difficulty_to_grow: 'meh'};

    var element = $compile('<flower data-flower-data="flower"></flower>')(scope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test flower 2');
  });
});
