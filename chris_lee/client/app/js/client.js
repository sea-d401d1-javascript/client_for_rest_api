const angular = require('angular');
const CSApp = angular.module('CSApp', []);
require('./services')(CSApp);
require('./ct')(CSApp);
require('./t')(CSApp);
