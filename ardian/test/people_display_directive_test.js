var angular = require('angular');
var template = require('../app/templates/people/directives/people_display.html');

describe('people display directive', ()=> {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('myApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive with an appropriate people scope', () => {
    $httpBackend.when('GET', '/templates/people/directives/people_display.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.newPeople = {name: 'inside scope', weapon: 'inside scope weapon'};
    var element = $compile('<people data-people-data="newPeople">shjsdghsghsohsoh</people>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside scope');
    expect(element.html()).toContain('inside scope weapon');
    expect(element.html()).toContain('shjsdghsghsohsoh');
  });

  it('should load the directive with an appropriate people object', () => {
    $httpBackend.when('GET', '/templates/people/directives/people_display.html').respond(200, template);
    var scope = $rootScope.$new();
    var element = $compile('<people data-people-data="{name: \'bruce\', weapon: \'gun\'}">shjsdghsghsohsoh</people>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('bruce');
    expect(element.html()).toContain('gun');
    expect(element.html()).toContain('shjsdghsghsohsoh');
  });
});
