var angular = require('angular');
var template = require('../../app/templates/requests/directives/request.html');

describe('request display directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('hogcApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to display request data', () => {
    $httpBackend.whenGET('/templates/requests/directives/request.html').respond(200, template);

    var element = $compile('<request data-request-data="{firstName: \'test name\'}"></request>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test name');
  });

  it('should be able to transclude update request options', () => {
    $httpBackend.whenGET('/templates/requests/directives/request.html').respond(200, template);

    var element = $compile('<request data-request-data="{firstName: \'test name\', editing: true}"><div></div></request>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test name');
    expect(element.html()).toContain('<div class="ng-scope">');
  });
});
