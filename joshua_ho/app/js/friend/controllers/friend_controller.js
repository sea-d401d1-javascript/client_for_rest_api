//This is broken, not changing view

//IT WORKS
module.exports = function(app) {
  app.controller('FriendController' , ['$scope' , '$http' , 'cfResource' , function ($scope , $http , Resource) {
    $scope.title = 'List of Friends in my life';
    var friendService = Resource('/friends');

    $scope.getAll = function() {
      friendService.getAll( function(err , res) {
        if (err) return console.log(err);
        $scope.data.friends = res;

      });
    };
    $scope.post = function(person) {
      console.log(person + ' the new friend');
      $scope.data.friends.push(person);
      friendService.post(person , function(err , res) {
        if (err) return console.log(err);
        $scope.data.newPerson = null;
        $scope.message = 'New Friend Added';
        $scope.data.friends.splice(index, 1, res);
      });
    };

    $scope.put = function(friend) {
      friendService.put(friend , function(err , res) {
        if (err) return console.log(err);
        $scope.message = "Friend Edited";
      });
    };

    $scope.delete = function(exFriend, index) {
      friendService.delete(exFriend , function(err , res) {
        if (err) return console.log(err);
        $scope.data.friends.splice(index , 1);
        $scope.message = 'Friend Deleted :[ ';
      });
    };
  }]);
};
