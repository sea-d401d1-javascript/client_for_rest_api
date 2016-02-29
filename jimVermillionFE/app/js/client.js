'use strict';

// require('!style!css!../css/style.css');
const angular = require('angular');
var flowerApp = angular.module('flower', []);
require('./services/resource_services')(flowerApp);
require('./controllers/flower_controller')(flowerApp);
