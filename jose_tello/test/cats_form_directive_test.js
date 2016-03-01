var angular = require('angular');
var template = require('../app/templates/cats/cats_form.html');

describe('cat form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('petsApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the form directive', () => {
    $httpBackend.when('GET', '/templates/cats/cats_form.html').respond(200, template);

    var element = $compile('')
  });
});
