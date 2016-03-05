module.exports = function(app) {
  app.controller('authController', ['$scope', 'politicianAuth', function($scope, politicianAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      politicianAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      politicianAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
