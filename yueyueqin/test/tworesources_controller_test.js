require(__dirname + '/../app/js/two_resources_controller.js');
var angular = require('angular');
require('angular-mocks');

describe('movies controller',() => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('twoResourcesApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));
  it('should be able to make a controller', function() {
    var moviesController = $ControllerConstructor('MoviesController',{
      $scope
    });

    expect(typeof moviesController).toBe('object');
    expect(angular.isArray($scope.movies)).toBe(true);
    expect($scope.movies.length).toBe(0);
    expect(typeof $scope.getAllMovies).toBe('function');
  });

  describe('REST request', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('MoviesController',{
        $scope
      });
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/movies', () => {
      $httpBackend.expectGET('http://localhost:3000/api/movies').respond(200,[{
        name:'test'
      }]);

      $scope.getAllMovies();
      $httpBackend.flush();

      expect($scope.movies.length).toBe(1);
      expect($scope.movies[0].name).toBe('test');
    });

    it('should create a new movie', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/movies',{name:'postmovie'})
        .respond(200,{name:'responsenewmovie'});
      $scope.newMovie={name: 'newMovie'};
      $scope.createMovie({name:'postmovie'});
      $httpBackend.flush();
      expect($scope.movies.length).toBe(1);
      expect($scope.movies[0].name).toBe('responsenewmovie');
      expect($scope.newMovie).toBe(null);

    });

    it('should update a movie', () => {
      var putmovie = {_id:1,name:'putmovie',editing:true};
      $scope.movies.push({_id:1, name:'movie'});
      $httpBackend.expectPUT('http://localhost:3000/api/movies/1',{_id:1,name:'putmovie',editing:true})
        .respond(200,{name:'responseputmovie'});

      $scope.updateMovie(putmovie);
      $httpBackend.flush();
      expect(putmovie.editing).toBe(false);
      expect($scope.movies[0].name).toBe('putmovie');
      expect($scope.movies[0].editing).toBe(false);
    });

    it('should delete a movie', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/movies/1')
        .respond(200, {name:'responsedeletemovie'});
      var movie = {_id:1, name:'deletemovie'};
      $scope.movies = [{_id:1, name:'deletemovie'},{_id:2, name:'secondmovie'}];
      $scope.deleteMovie(movie);
      $httpBackend.flush();
      expect($scope.movies.length).toBe(1);
      expect($scope.movies[0]._id).toBe(2);
      expect($scope.movies[0].name).toBe('secondmovie');
    });

  });


});

describe('actors controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('twoResourcesApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to make a controller', function() {
    var ActorsController = $ControllerConstructor('ActorsController',{
      $scope
    });
    expect(typeof ActorsController).toBe('object');
    expect(angular.isArray($scope.actors)).toBe(true);
    expect($scope.actors.length).toBe(0);
    expect(typeof $scope.getAllActors).toBe('function');
  });

  describe('REST request', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('ActorsController',{
        $scope
      });
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should  make a get request', () => {
      $httpBackend.expectGET('http://localhost:3000/api/actors').respond(200,[{
        name:'testactor'
      }]);
      $scope.getAllActors();
      $httpBackend.flush();
      expect($scope.actors.length).toBe(1);
      expect($scope.actors[0].name).toBe('testactor');
    });

    it('should create a new actor', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/actors',{name:'postactor'})
        .respond(200,{name: 'responsenewactor'});
      $scope.newActor = {name: 'newactor'};
      $scope.createActor({name: 'postactor'});
      $httpBackend.flush();
      expect($scope.actors.length).toBe(1);
      expect($scope.newActor).toBe(null);
      expect($scope.actors[0].name).toBe('responsenewactor');
    });

    it('should update a new actor', () => {
      var putactor = {_id:1,name:'putactor',editing:true};
      $scope.actors.push({_id:1, name:'actor'});
      $httpBackend.expectPUT('http://localhost:3000/api/actors/1',{_id:1,name:'putactor',editing:true})
        .respond(200,{name:'responseputmovie'});

      $scope.updateActor(putactor);
      $httpBackend.flush();
      expect(putactor.editing).toBe(false);
      expect($scope.actors[0].name).toBe('putactor');
      expect($scope.actors[0].editing).toBe(false);
    });

    it('should delete a actor', () => {
      var actor = {_id:1, name:'deleteactor'};
      $scope.actors = [{_id:1, name:'deleteactor'},{_id:2, name:'secondactor'}];
      $httpBackend.expectDELETE('http://localhost:3000/api/actors/1')
        .respond(200, {name:'responsedeletemovie'});
      $scope.deleteActor(actor);
      $httpBackend.flush();
      expect($scope.actors.length).toBe(1);
      expect($scope.actors[0]._id).toBe(2);
      expect($scope.actors[0].name).toBe('secondactor');

    });
  });
});
