var angular = require('angular');
var template = require('../app/templates/movies/directives/movie_edit.html');
console.log(template);


describe('movie edit directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('twoResourcesApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/movies/directives/movie_edit.html').respond(200,template);
    var element = $compile('<movie-edit data-movie-data="{name:\'inside directive\'}"></movie-edit>')($rootScope);
    console.log(element);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('inside directive');
  });

  // it('should transclue the element', () => {
  //  $httpBackend.when('GET', '/templates/movies/directives/movie_edit.html').respond(200,template);
  //   var element = $compile('<movie data-movie-data="{name:\'inside directive\'}" ">Hello</movie>')($rootScope);
  //   $httpBackend.flush();
  //   $rootScope.$digest();
  //   expect(element.html()).toContain('inside directive');
  //   expect(element.html()).toContain('Hello');
  // });
});
