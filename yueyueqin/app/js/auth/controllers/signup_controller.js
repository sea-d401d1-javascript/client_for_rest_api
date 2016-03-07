module.exports = function(app) {
  app.controller('SignupController',['$scope', '$location', 'userAuth', function($scope, $location, userAuth){
    $scope.signup = true;
    console.log($scope.input)
    $scope.submit = function(input) {
      console.log(input);
      userAuth.createUser(input, function(err, res){
        if(err) {
          $scope.response = err.data.msg;
          return console.log(err);
        }
        $location.path('/home');
      });
    };
  }]);
};
