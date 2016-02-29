module.exports = function(app) {
  app.directive('donor', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/donors/directives/donor.html',
      scope: {
        donorData: '='
      }
    };
  });
};
