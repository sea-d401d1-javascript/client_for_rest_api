require('../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('students controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('studentsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller; 
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var studentsController = $ControllerConstructor('StudentsController', {$scope});
    expect(typeof studentsController).toBe('object');
    expect(Array.isArray($scope.students)).toBe(true);
    expect(typeof $scope.getAllStudents).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('StudentsController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/students', () => {
      $httpBackend.expectGET('http://localhost:3000/api/students').respond(200, [{name: 'test student'}]);
      $scope.getAllStudents();
      $httpBackend.flush();
      expect($scope.students.length).toBe(1);
      expect($scope.students[0].name).toBe('test student');
    });

    it('should create a new student', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/students/', {name: 'the sent student'}).respond(200, {name: 'the response student'});
      $scope.newStudent = {name: 'the new student'};
      $scope.createStudent({name: 'the sent student'});
      $httpBackend.flush();
      expect($scope.students.length).toBe(1);
      expect($scope.newStudent).toBe(null);
      expect($scope.students[0].name).toBe('the response student');
    });

    it('should update a student', () => {
      var testStudent = {name: 'inside scope', editing: true, _id: 5};
      $scope.students.push(testStudent);
      $httpBackend.expectPUT('http://localhost:3000/api/students/5', testStudent).respond(200);
      $scope.updateStudent(testStudent);
      $httpBackend.flush();
      expect(testStudent.editing).toBe(false); 
      expect($scope.students[0].editing).toBe(false);
    });

    it('should delete a student', () => {
      var testStudent = {name: 'deleted student', _id: 1};
      $scope.students.push(testStudent);
      expect($scope.students.indexOf(testStudent)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/students/1').respond(200);
      $scope.deleteStudent(testStudent);
      $httpBackend.flush();
      expect($scope.students.indexOf(testStudent)).toBe(-1);
    });
  });
});
