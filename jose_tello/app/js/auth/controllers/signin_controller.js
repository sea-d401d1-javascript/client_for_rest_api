module.exports = function(app) {
  app.controller('SigninController', ['$scope', 'petsAuth', '$location', function($scope, auth, $location) {
    $scope.submit = function(user) {
      auth.signIn(user, function() {
        $scope.updateUsername();
        $location.path('/home');
      });
    };
  }]);
};
