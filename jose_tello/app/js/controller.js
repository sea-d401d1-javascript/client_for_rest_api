'use strict';

const angular = require('angular');
const catsApp = angular.module('catsApp', []);
require('./services')(catsApp);
require('./cats')(catsApp);
