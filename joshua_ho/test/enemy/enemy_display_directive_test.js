var angular = require('angular');
var template = require( __dirname + '/../../app/templates/enemy/directives/enemy.html');

describe('Enemy Display Directive' , () => {
  var $rootScope;
  var $compile;
  var $scope;

  beforeEach(angular.mock.module('friendsApp'));

  beforeEach(angular.mock.inject( function(_$compile_ , _$rootScope_ , _$httpBackend_ ){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $rootScope.data = {enemies: []};
  }));

  it('should load the directive' , () => {

    $httpBackend.when('GET' , '/templates/enemy/directives/enemy.html').respond(200 , template);
    $scope.data.enemies = {name: 'test name'};
    var element = $compile('<enemy-display>{{data.enemies.name}}</enemy-display>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test name');

  });
});
