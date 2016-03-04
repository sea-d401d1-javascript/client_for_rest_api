var angular = require('angular');
var template = require('../app/templates/movies/directives/movie_form.html');
console.log(template);

describe('movie form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('twoResourcesApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET','/templates/movies/directives/movie_form.html').respond(200, template);
    var element = $compile('<div data-movie-form data-movie="{}" data-button-text="test button"></div>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET','/templates/movies/directives/movie_form.html')
      .respond(200, template);
    var call = false;
    scope.movie = {name: 'test movie'};
    scope.testSave = function(input){
      expect(input.name).toBe('test movie');
      call = true;
    };
    var element = $compile('<movie-form data-movie="{name : \'test movie from compile\'}" data-save=testSave><button type="submit">New movie</button></movie-form>')(scope);

    $httpBackend.flush();
    $rootScope.$digest();
    element.isolateScope().save(scope)(scope.movie);
    expect(call).toBe(true);
  });
});
