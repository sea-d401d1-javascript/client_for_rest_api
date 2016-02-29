var angular = require('angular');
var template = require('../app/templates/students/directives/student.html');

describe('student display directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('studentsApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.expectGET('/templates/students/directives/student.html').respond(200, template);

    var element = $compile('<student data-student-data="{name: \'test student\'}"></student>')($rootScope);
      $httpBackend.flush();
      $rootScope.$digest();
      expect(element.html()).toContain('test student');
  });
});
