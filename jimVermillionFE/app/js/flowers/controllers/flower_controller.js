module.exports = exports = function(app){
  app.controller('FlowerController',
    ['$scope', '$http', 'Resource', function($scope, $http, Resource) {

      $scope.flowers = [];
      $scope.gardeners = [];

      var flowerService = Resource('api/flowers');          // eslint-disable-line
      var gardenerService = Resource('api/gardeners');      // eslint-disable-line
      var nCService = Resource('nonCrud/howManyFlowers');   // eslint-disable-line

      function handleError(err) {
          return console.log(err);
      }
      function resourceDepicter(resource){
        if ($scope.flowers.indexOf(resource) > -1) {
          return 'flowers';
        } 
        return 'gardeners';
      }
      function whichService(list){
        if (list === $scope.flowers) return flowerService;
        return gardenerService;
      }

      $scope.toggleEdit = function(resource, index) {
        if (resource.backup) {
          var temp = resource.backup; 
          var collection = resourceDepicter(resource);
          $scope[collection].splice(index, 1, temp);
        } else {
          resource.backup = angular.copy(resource);
          resource.editing = true;
        }
      };

      $scope.nC = function() {
        $scope.nonCrud = 'With the gardeners on hand we can potentially grow '
          + $scope.flowers.length * $scope.gardeners.length
          + ' flowers.';
      };

      $scope.get = function(list) {
        var service = whichService(list);
        service.get((err, res) => {
          if (err) return handleError(err);
          if (service === flowerService) $scope.flowers = res;
          else $scope.gardeners = res;
        });
      };

      $scope.getAll = function() {
        $scope.get($scope.flowers);
        $scope.get($scope.gardeners);
        $scope.nC();
      };

      $scope.post = function(resource, list) {
        var service = whichService(list);
        service.create(resource, (err, res) => {
          if (err) return handleError(err);
          if (list === $scope.flowers) {
            $scope.flowers.push(res);
            $scope.newFlower = null;
          } else {
            $scope.gardeners.push(res);
            $scope.newGardener = null;
          }
          $scope.nC();
        });
      };

      $scope.update = function(resource, list) {
        var service = whichService(list);
        service.update(resource, (err, res) => { // eslint-disable-line
          resource.editing = false;
          resource.backup = null;
          if (err) handleError(err);
        });
      };

      $scope.delete = function(resource, index, list) {
        var service = whichService(list);
        service.delete(resource, (err, res) => { // eslint-disable-line
          if (err) return handleError(err);
          if (list === $scope.flowers) $scope.flowers.splice(index, 1);
          else $scope.gardeners.splice(index, 1);
          $scope.nC();
        });
      };

  }]);
};
