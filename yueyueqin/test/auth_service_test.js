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
        .respond(200,{token:'token'});
      userAuthTest.createUser(newuser, function(err, res) {
        expect(err).toBe(null);
        expect(res.data.token).toBe('token');
        expect($window.localStorage.token).toBe('token');
        expect(res.status).toBe(200);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });
    it('should throw error when there is error to create new user', () => {
      var newuser = {username:'test',email:'test@gmail.com',password:'forbar123', comfirmpassword:'forbar123'};
      var plugin = false;
      $httpBackend.expectPOST('http://localhost:3000/api/signup', newuser)
        .respond(400,{message:'error'});
      userAuthTest.createUser(newuser, function(err, res) {
        expect(err.status).toBe(400);
        expect(err.data.message).toBe('error');
        expect(res).toBe(undefined);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

    it('should signin current user', () => {
      var currentuser = {email:'test@gmail.com', password:'forbar123'};
      var plugin = false;
      $httpBackend.expectGET('http://localhost:3000/api/signin')
        .respond(200, {token:'token'});
      userAuthTest.signIn(currentuser, function(err, res) {
        expect(err).toBe(null);
        expect(res.data.token).toBe('token');
        expect($window.localStorage.token).toBe('token');
        expect(res.status).toBe(200);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

    it('should throw error when there is error to signin current user', () => {
      var currentuser = {email:'test@gmail.com', password:'forbar123'};
      var plugin = false;
      $httpBackend.expectGET('http://localhost:3000/api/signin')
        .respond(400, {message:'error'});
      userAuthTest.signIn(currentuser, function(err, res) {
        expect(err.status).toBe(400);
        expect(err.data.message).toBe('error');
        expect(res).toBe(undefined);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

    it('should get token', () => {
      var token;
      $window.localStorage.token = 'token';
      expect(userAuthTest.getToken()).toBe('token');
    });

    it('should get user name', () => {
      var username = {name: 'username'};
      $httpBackend.expectGET('http://localhost:3000/api/currentuser')
        .respond(200, username);
      userAuthTest.getUsername(function(err, res) {
        expect(err).toBe(null);
        expect(res.data.name).toBe('username');
        expect(res.status).toBe(200);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

    it('should throw error when there is error to get user name', () => {
      $httpBackend.expectGET('http://localhost:3000/api/currentuser')
        .respond(400, {message: 'error'});
      userAuthTest.getUsername(function(err, res) {
        expect(err.status).toBe(400);
        expect(err.data.message).toBe('error');
        expect(res).toBe(undefined);
        plugin = true;
      });
      $httpBackend.flush();
      expect(plugin).toBe(true);
    });

  });

});
