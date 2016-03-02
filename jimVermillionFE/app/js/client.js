'use strict';

const angular = require('angular');
var flowerApp = angular.module('flower', []);

require('./services/resource_services')(flowerApp);
require('./flowers')(flowerApp);
