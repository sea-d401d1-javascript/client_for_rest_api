const angular = require('angular');
const wapApp = angular.module('wapApp', []);

require('./services')(wapApp);

require('./dogs')(wapApp);

require('./directives')(wapApp);
