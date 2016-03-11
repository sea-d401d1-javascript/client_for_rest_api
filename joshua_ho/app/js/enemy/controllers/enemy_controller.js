//This is broken, not changing view

//IT WORKS
module.exports = function(app) {
  app.controller('EnemyController' , ['$scope' , '$http' , 'cfResource' , function ($scope , $http , Resource) {
    $scope.title = 'List of Enemies in my life';
    var enemyService = Resource('/enemies');

    $scope.getAll = function() {
      enemyService.getAll( function(err , res) {
        if (err) return console.log(err);
        $scope.data.enemies = res;
      });
    };
    $scope.post = function(person) {
      console.log(person + ' the new friend');
      $scope.data.enemies.push(person);
      enemyService.post(person , function(err , res) {
        if (err) return console.log(err);
        $scope.data.newPerson = null;
        $scope.message = 'New Enemy Added :O ';
        $scope.data.enemies.splice(index, 1, res);
      });
    };

    $scope.put = function(enemy) {
      enemyService.put(enemy , function(err , res) {
        if (err) return console.log(err);
        $scope.message = "Enemy Edited";
      });
    };

    $scope.delete = function(exEnemy, index) {
      enemyService.delete(exEnemy , function(err , res) {
        if (err) return console.log(err);
        $scope.data.enemies.splice(index , 1);
        $scope.message = 'Enemy "Deleted" ';
      });
    };
  }]);
};
