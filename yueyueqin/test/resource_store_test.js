require(__dirname + '/../app/js/two_resources_controller');
var angular = require('angular');
require('angular-mocks');

describe('data store', () => {
  beforeEach(angular.mock.module('twoResourcesApp'));
  var Store;
  var test;
  beforeEach(angular.mock.inject(function(resourceStore){
    Store = resourceStore;
  }));

  it('should be a object',() => {
    expect(typeof Store).toBe('object');
    expect(Store.data).toBe(undefined);
  });

  it('should get and set', () => {
    test = Store.get('prop1');
    Store.set('prop1','keyvalue');
    expect(Store.set('prop1','keyvalue')).toBe('keyvalue');
    console.log(Store.data);
  })
});
