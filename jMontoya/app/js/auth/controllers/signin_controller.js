module.exports = function(app) {
  app.controller('SigninController', ['$scope', 'politicianAuth', '$location', function($scope, auth, $location) {
    $scope.submit = function(auth) {
      auth.signIn(user, function() {
        $scope.updateUsername();
        $location.path('/home');
      });
    };
  }]);
};
