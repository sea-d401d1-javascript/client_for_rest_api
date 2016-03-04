var angular = require('angular');

describe('auth controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('flower'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var authController = $ControllerConstructor('authController', {$scope});
    expect(typeof authController).toBe('object');
    expect($scope.username).toBe(null);
    expect(typeof $scope.updateUsername).toBe('function');
  });
});
