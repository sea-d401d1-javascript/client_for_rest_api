var angular = require('angular');

describe('signup controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('flower'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var signupController = $ControllerConstructor('SigninController', {$scope});
    expect(typeof signupController).toBe('object');
    expect(typeof $scope.submit).toBe('function');
  });
});
