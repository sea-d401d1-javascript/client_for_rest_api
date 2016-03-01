module.exports = exports = function(app){
  app.controller('FlowerController',
    ['$scope', '$http', 'Resource', ($scope, $http, Resource) => {
      $scope.flowers = [];
      $scope.gardeners = [];
      var flowerService = Resource('api/flowers');          // eslint-disable-line
      var gardenerService = Resource('api/gardeners');      // eslint-disable-line
      var nCService = Resource('nonCrud/howManyFlowers');   // eslint-disable-line

      function handleError(err) {
          return console.log(err);
      }

      $scope.toggleEdit = function(flower) {
        if (flower.backup) {
          var temp = flower.backup; 

          $scope.flowers.splice($scope.flowers.indexOf(flower), 1, temp);
        } else {
          flower.backup = angular.copy(flower);
          flower.editing = true;
        }
      };

      $scope.getFlowers = function() {
        flowerService.get((err, res) => {
          if (err) handleError(err);
          $scope.flowers = res;
        });
      };

      $scope.getGaredeners = function() {
        gardenerService.get((err, res) => {
          if (err) handleError(err);
          $scope.gardeners = res;
        });
      };

      $scope.nC = function() {
        nCService.get((err, res) => {
          if (err) handleError(err);
          $scope.nonCrud = res;
        });
        // Ability to refactor to update this resource from front end only.
        // $scope.nonCrud = 'With the gardeners on hand we can potentially grow '
        //   + $scope.flowers.length * $scope.gardeners.length
        //   + ' flowers.';
      };

      $scope.getAll = function() {
        $scope.getFlowers();
        $scope.getGaredeners();
        $scope.nC();
      };

      $scope.postFlower = function(flower) {
        flowerService.create(flower, (err, res) => {
          if (err) handleError(err);
          $scope.flowers.push(res);
          $scope.newFlower = null;
          $scope.nC();
        });
      };

      $scope.updateFlower = function(flower) {
        flowerService.update(flower, (err, res) => {  // eslint-disable-line
          flower.editing = false;
          flower.backup = null;
          handleError(err);
        });
      };

      $scope.deleteFlower = function(flower, index) {
        flowerService.delete(flower, (err, res) => { // eslint-disable-line
          if (err) handleError(err);
          $scope.flowers.splice(index, 1);
          $scope.nC();
        });
      };

      $scope.postGardener = function(gardener) {
        gardenerService.create(gardener, (err, res) => {
          if (err) handleError(err);
          $scope.gardeners.push(res);
          $scope.newGardener = null;
          $scope.nC();
        });
      };

      $scope.deleteGardener = function(gardener, index) {
        gardenerService.delete(gardener, (err, res) => { // eslint-disable-line
          if (err) handleError(err);
          $scope.gardeners.splice(index, 1);
          $scope.nC();
        });
      };

      $scope.updateGardener = function(gardener) {
        gardenerService.update(gardener, (err, res) => { // eslint-disable-line
          gardener.editing = false;
          if (err) handleError(err);
        });
      };
  }]);
};