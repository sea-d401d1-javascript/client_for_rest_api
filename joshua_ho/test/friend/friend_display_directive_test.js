var angular = require('angular');
var template = require( __dirname + '/../../app/templates/friend/directives/friends.html');

describe('Friend Display Directive' , () => {
  var $rootScope;
  var $compile;
  var $scope;

  beforeEach(angular.mock.module('friendsApp'));

  beforeEach(angular.mock.inject( function(_$compile_ , _$rootScope_ , _$httpBackend_ ){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $rootScope.data = {friends: []};
  }));

  it('should load the directive' , () => {

    $httpBackend.when('GET' , '/templates/friend/directives/friends.html').respond(200 , template);
    $scope.data.friends = {name: 'test name'};
    var element = $compile('<friend-display>{{data.friends.name}}</friend-display>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test name');

  });
});
