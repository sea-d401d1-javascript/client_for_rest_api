module.exports = function(app) {
  app.controller('SigninController', ['$scope','userAuth', '$location', function($scope, userAuth, $location) {
    $scope.submit = function(input) {
      userAuth.signIn(input, function(err, res) {
        if(err) {
          $scope.response = err.data.msg;
          return console.log(err);
        }
        $location.path('/home');
      });
    };
  }]);
};
