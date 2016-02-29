const angular = require('angular');
const hogcApp = angular.module('hogcApp', []);

require('./services')(hogcApp);
require('./requests')(hogcApp);
require('./donors')(hogcApp);
