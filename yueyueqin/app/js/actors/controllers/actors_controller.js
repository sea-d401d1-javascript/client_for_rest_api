module.exports = function(app) {
  app.controller('ActorsController', ['$scope', '$http', 'twoResource', function($scope, $http, Resource) {
    $scope.actors = [];
    var actorResource = Resource('/actors');

    $scope.getAllActors = function() {
      actorResource.getAll(function(err,res){
        if(err) return console.log(err);
        $scope.actors = res;
      });
    };


    $scope.createActor = function(actor) {
      actorResource.create(actor,function(err,res) {
        if(err) return console.log(err);
        $scope.actors.push(res);
        $scope.newActor = null;
      });
    };


    $scope.updateActor = function(actor) {
      actorResource.update(actor,function(err,res) {
        if(err) return console.log(err);
        $scope.actors = $scope.actors.map(function(item) {
          if(item._id === actor._id){
            item = actor;
            return item;
          }
          return item;
        });
        actor.editing = false;
      });
    };

    $scope.deleteActor =  function(actor) {
      actorResource.delete(actor,function(err,data) {
        if(err) return console.log(err);
        $scope.actors = $scope.actors.filter((item) => item._id !== actor._id);
      });
    };

  }]);
};
