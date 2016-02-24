const angular = require('angular');
const twoResourcesApp = angular.module('twoResourcesApp',[]);

require('./services/resources_service')(twoResourcesApp);
require('./services/resource_store')(twoResourcesApp);

require('./movies')(twoResourcesApp);
require('./actors')(twoResourcesApp);

// require('./directives');
