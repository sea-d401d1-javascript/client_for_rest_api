var angular = require('angular');

describe('authentication service', () => {
  beforeEach(angular.mock.module('twoResourcesApp'));
  var $httpBackend;
  var $window;
  var userAuthTest;
  beforeEach(angular.mock.inject(function(_$httpBackend_, _$window_, userAuth) {
    $httpBackend = _$httpBackend_;
    $window = _$window_;
    userAuthTest = userAuth;
  }));
  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should be a service', () => {
    expect(typeof userAuthTest).toBe('object');
  });

  describe('Test Auth Service Each Property Function', () => {
    var $httpBackend;
    var $window;
    var userAuthTest;
    beforeEach(angular.mock.inject(function(_$httpBackend_, _$window_, userAuth) {
      $httpBackend = _$httpBackend_;
      $window = _$window_;
      userAuthTest = userAuth;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });
    it('should create new user', () => {
      var newuser = {username:'test',email:'test@gmail.com',password:'forbar123', comfirmpassword:'forbar123'};
      var plugin = false;
      $httpBackend.expectPOST('http://localhost:3000/api/signup', newuser)
        .expect(200,'1234');
      userAuthTest.createUser(newuser, function(err, res) {
        expect(err).toBe(null);
        expect(res).toBe('1234');
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

  });

});
