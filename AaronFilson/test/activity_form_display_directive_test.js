var angular = require('angular');

var template = require('../app/templates/activity/directives/act.html');

describe('The activity display directive', () => {
  var $compile;
  var $httpBackend;
  var $rootScope;

  beforeEach(angular.mock.module('activityApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
    }
  ));

  it('should load up the display directive', () => {
    $httpBackend.when('GET', '/templates/activity/directives/act.html').respond(200, template);

    var element = $compile('<myAct>5k run</myAct>')($rootScope);

    $rootScope.$digest();

    expect(element.html()).toContain('5k run');
  });
});
