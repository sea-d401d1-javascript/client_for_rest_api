const angular = require('angular');
const twoResourcesApp = angular.module('twoResourcesApp',[]);

require('./services')(twoResourcesApp);


require('./movies')(twoResourcesApp);
require('./actors')(twoResourcesApp);
