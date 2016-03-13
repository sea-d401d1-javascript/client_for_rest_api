module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$location', 'mixAuth', function($scope, $location, auth) {
    $scope.signup = true;
    $scope.submit = function(user) {
      auth.createUser(user, function(err) {
        if(err) return console.log("Got err in making user : " + err);
        $scope.updateUsername();
        $location.path('/');
      });
    };
  }]);
};
