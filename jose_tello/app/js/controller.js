const angular = require('angular');
const petsApp = angular.module('petsApp', []);
require('./services')(petsApp);
require('./cats')(petsApp);
require('./services')(petsApp);
require('./dogs')(petsApp);
