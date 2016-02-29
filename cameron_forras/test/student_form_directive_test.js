var angular = require('angular');
var template = require('../app/templates/students/directives/student_form_directive.html');

describe('student form directive', () => {
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
    $httpBackend.when('GET', '/templates/students/directives/student_form_directive.html').respond(200, template);
    
    var element = $compile('<student-form data-student="{}" data-button-text="test button"></student-form>')
    ($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/students/directives/student_form_directive.html').respond(200, template);
    var called = false;
    scope.student = {name: 'inside scope'};

    scope.testSave = function(input) {
      expect(input.name).toBe('from directive');
      scope.student = input;
      called = true;
    };

    var element = $compile('<student-form data-student="{name: \'inside directive\'}" data-save=testSave></student-form')(scope);
      $httpBackend.flush();
      $rootScope.$digest();

      element.isolateScope().save(scope)({name: 'from directive'});
      expect(called).toBe(true);
      expect(scope.student.name).toBe('from directive');
  });
});
