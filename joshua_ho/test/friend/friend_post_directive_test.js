var angular = require('angular');
var template = require( __dirname + '/../../app/templates/friend/directives/friend_post_form.html');

describe('Friend Post Directive' , () => {
  var $rootScope;
  var $compile;
  var $scope;

  beforeEach(angular.mock.module('friendsApp'));

  beforeEach(angular.mock.inject( function(_$compile_ , _$rootScope_ , _$httpBackend_ ){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $rootScope.data = {friends: {}};
  }));

  it('should load the directive' , () => {

    $httpBackend.when('GET' , '/templates/friend/directives/friend_post_form.html').respond(200 , template);
    $scope.data.newPerson = {name: 'testName' , age: 1};
    var element = $compile('<friend-post-form></friend-post-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('Add a New Friend');

  });
});
