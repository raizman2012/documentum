/**
 * HACK Do not reload the current template if it is not needed.
 *
 * See AngularJS: Change hash and route without completely reloading controller http://stackoverflow.com/questions/12115259/angularjs-change-hash-and-route-without-completely-reloading-controller
 */
angular.module('core').factory('DoNotReloadCurrentTemplate', ['$route', function($route) {
    return function(scope) {
        var lastRoute = $route.current;
        scope.$on('$locationChangeSuccess', function() {
            if (lastRoute.$$route.templateUrl === $route.current.$$route.templateUrl) {
                console.log('DoNotReloadCurrentTemplate not reloading template: ' + $route.current.$$route.templateUrl);
                $route.current = lastRoute;
            }
        });
    };
}]);