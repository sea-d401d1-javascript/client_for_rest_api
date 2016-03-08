const angular = require('angular');

const myApp = angular.module('myApp', []);

require('./services/resource')(myApp);

require('./sharks')(myApp);

require('./people')(myApp);
