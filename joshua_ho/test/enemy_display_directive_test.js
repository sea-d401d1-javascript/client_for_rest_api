// var angular = require('angular');
// var template = require('../app/templates/enemy/directives/enemy.html');
//
// describe('Enemy Directive' , () => {
//   var $rootScope;
//   var $compile;
//
//   beforeEach(angular.mock.module('friendsApp'));
//
//   beforeEach(angular.mock.inject( function(_$compile_ , _$rootScope_ , _$httpBackend_ ){
//     $compile = _$compile_;
//     $rootScope = _$rootScope_;
//     $httpBackend = _$httpBackend_;
//   }));
//
//   it('should load the directive' , () => {
//
//     $httpBackend.when('GET' , '/templates/enemy/directives/enemy.html').respond(200 , template);
//     $rootScope.enemy = {name: 'test name'};
//     var element = $compile('<enemy-display ng-model="enemy.name"></enemy-display>')($rootScope);
//     $httpBackend.flush();
//     $rootScope.$digest();
//
//     expect(element.html()).toContain('test name');
//
//
//   });
// });
