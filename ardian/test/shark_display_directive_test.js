var angular = require('angular');
var template = require('../app/templates/sharks/directives/sharks_display.html');

describe('shark display directive', ()=> {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('myApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive with an appropriate sharks scope', () => {
    $httpBackend.when('GET', '/templates/sharks/directives/sharks_display.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.newShark = {name: 'inside scope name', size: 'inside scope size'};
    var element = $compile('<shark data-shark-data="newShark">shjsdghsghsohsoh</shark>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside scope name');
    expect(element.html()).toContain('inside scope size');
    expect(element.html()).toContain('shjsdghsghsohsoh');
  });

  it('should load the directive with an appropriate sharks object', () => {
    $httpBackend.when('GET', '/templates/sharks/directives/sharks_display.html').respond(200, template);
    var scope = $rootScope.$new();
    var element = $compile('<shark data-shark-data="{name: \'bruce\', size: \'large\'}">shjsdghsghsohsoh</shark>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('bruce');
    expect(element.html()).toContain('large');
    expect(element.html()).toContain('shjsdghsghsohsoh');
  });
});
