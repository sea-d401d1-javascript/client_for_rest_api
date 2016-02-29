module.exports = function(app) {
  app.controller('TeamsController', ['$scope', '$http', function($scope, $http) {
    $scope.teams = [];
    $scope.errors = [];
    var defaults = {city: 'Newark', mascot: 'Wallabies'};
    var backendUrl = 'http://localhost:4000/api/';
    $scope.newTeam = Object.create(defaults);

    $scope.getAll = function() {
      $http.get(backendUrl + 'teams')
        .then(function(res) {
          $scope.teams = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(team) {
      $http.post(backendUrl + 'teams', team)
        .then(function(res) {
          $scope.teams.push(res.data);
          $scope.newTeam = Object.create(defaults);
        }, function(err) {
          console.log(err.data)
        });
    };

    $scope.update = function(team) {
      team.editing = false;
      $http.put(backendUrl + 'teams/' + team._id, team)
        .then(function(res) {
          console.log('this team has a new name');
        }, function(err) {
          $scope.errors.push('could not get team: ' + team.name);
          console.log(err.data);
        });
    };

    $scope.remove = function(team) {
      $scope.teams.splice($scope.teams.indexOf(team), 1);
      $http.delete(backendUrl + 'teams/' + team._id)
        .then(function(res) {
          console.log('totes cool, team murdered');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('City Referendum, could not move: ' + team.name);
          $scope.getAll();
        });
    };
  }]);
};
