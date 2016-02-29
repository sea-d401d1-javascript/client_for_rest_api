module.exports = function(app) {
  app.controller('PlayersController', ['$scope', '$http', function($scope, $http) {
    $scope.players = [];
    $scope.errors = [];
    var defaults = {age: 25, position: 'Defensive Back'};
    var backendUrl = 'http://localhost:4000/api/';
    $scope.newPlayer = Object.create(defaults);

    $scope.getAll = function() {
      $http.get(backendUrl + 'players')
        .then(function(res) {
          $scope.players = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(player) {
      $http.post(backendUrl + 'players', player)
        .then(function(res) {
          $scope.players.push(res.data);
          $scope.newPlayer = Object.create(defaults);
        }, function(err) {
          console.log(err.data)
        });
    };

    $scope.update = function(player) {
      player.editing = false;
      $http.put(backendUrl + 'players/' + player._id, player)
        .then(function(res) {
          console.log('this player\'s name is now correctly spelled!');
        }, function(err) {
          $scope.errors.push('could not get player: ' + player.name);
          console.log(err.data);
        });
    };

    $scope.remove = function(player) {
      $scope.players.splice($scope.players.indexOf(player), 1);
      $http.delete(backendUrl + 'players/' + player._id)
        .then(function(res) {
          console.log('Player cut');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not cut: ' + player.name);
          $scope.getAll();
        });
    };
  }]);
};
