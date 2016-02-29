var angular = require('angular');
var template = require('../app/templates/jedis/directives/jedi.html');

describe('jedi display directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('jedisApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive with an appropriate scope', () => {
    $httpBackend.when('GET', '/templates/jedis/directives/jedi.html').respond(200, template);
    var scope = $rootScope.$new();
    scope.newJedi = {name: 'inside scope name', flavor: 'inside scope flavor', fishPreference: 'inside scope fish preference'};
    var element = $compile('<jedi data-jedi-data="newJedi">shjsdghsghsohsoh</jedi>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside scope name');
    expect(element.html()).toContain('inside scope flavor');
    expect(element.html()).toContain('inside scope fish preference');
    expect(element.html()).toContain('shjsdghsghsohsoh');
  });

  it('should load the directive with an appropriate object', () => {
    $httpBackend.when('GET', '/templates/jedis/directives/jedi.html').respond(200, template);
    var scope = $rootScope.$new();
    var element = $compile('<jedi data-jedi-data="{name: \'yogi\', flavor: \'grizzly\', fishPreference: \'saalmons\'}">shjsdghsghsohsoh</jedi>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('yogi');
    expect(element.html()).toContain('grizzly');
    expect(element.html()).toContain('saalmons');
    expect(element.html()).toContain('shjsdghsghsohsoh');
  });
});
