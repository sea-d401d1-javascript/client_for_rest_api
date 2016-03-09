module.exports = function(app) {
  app.directive('actorEdit',function() {
    return{
      restrict: 'E',
      replace:true,
      transclude: true,
      templateUrl: '/templates/actors/directives/actor_edit.html',
      scope: {
        actorData: '='
      }
    };
  });
};
