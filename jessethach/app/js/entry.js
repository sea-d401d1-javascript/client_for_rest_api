const angular = require('angular');
const jedisApp = angular.module('jedisApp', []);

require('./services')(jedisApp);

require('./jedis')(jedisApp);
require('./sithlords')(jedisApp);
