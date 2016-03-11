var angular = require('angular');

describe('The Friend controller', () => {
  var $httpBackend;
  var $rootScope;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('friendsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var friendController = $ControllerConstructor('FriendController', {$scope});
    expect(typeof friendController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function( _$httpBackend_ , _$rootScope_ , _$controller_) {
      $rootScope = _$rootScope_;
      $rootScope.data = {friends: []};
      $scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('FriendController', {$scope});

    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/friends', () => {
      $httpBackend.expectGET('http://localhost:5000/api/friends').respond(200, [{name: 'test friend'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.data.friends.length).toBe(1);
      expect($scope.data.friends[0].name).toBe('test friend');
    });

    it('should create a new friend', () => {

      var testPerson = {name: 'test friend'}
      $rootScope.data.newPerson = 1;

      $httpBackend.expectPOST('http://localhost:5000/api/friends', testPerson).respond(200, {name: 'the response friend'});
      $rootScope.data.newPerson = 1;
      $scope.post(testPerson, 0);
      $httpBackend.flush();
      expect($scope.data.friends[0].name).toBe('the response friend');
    });

    it('should update a friend', () => {
      var testFriend = {name: 'inside put', _id: 5};

      $httpBackend.expectPUT('http://localhost:5000/api/friends/5', testFriend).respond(200);
      $scope.put(testFriend);
      $httpBackend.flush();
      expect($scope.message).toBe('Friend Edited');
    });
    //
    it('should lose a friend', () => {
      var exFriend = {name: 'condemned friend', _id: 1};
      $scope.data.friends.push(exFriend);
      expect($scope.data.friends.indexOf(exFriend)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:5000/api/friends/1').respond(200);
      $scope.delete(exFriend , 0);
      $httpBackend.flush();
      expect($scope.data.friends.indexOf(exFriend)).toBe(-1);
    });
  });
});
