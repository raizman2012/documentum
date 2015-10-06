'use strict';

/**
 * Angular controller for 'tree_folder_toolbar_table' snippet
 */
angular.module('documentum').controller('ExplorerController', ['$scope', 'explorer', '$stateParams', '$location', '$window', '$routeParams',
    function ($scope, explorer, $stateParams, $location, $window, $routeParams) {

        angular.extend($scope, explorer);

        console.log('$stateParams:', $stateParams);
        console.log('$routeParams:', $routeParams);
        console.log('$location.search:', $location.search());

        $scope.$on('$locationChangeStart', function(event) {
            console.log('here in ExplorerController $locationChangeStart', $location.path(), '', $location.search());

            var documentumPath = $location.search().documentumPath;
            //console.log('documentumPath:',documentumPath);
            explorer.selectNodeByPath(documentumPath);
            $window.document.title = 'Documentum:'+documentumPath;
        });

        // on load perform select of needed
        var documentumPath = $location.search().documentumPath;
        if (documentumPath !== undefined && documentumPath.length > 0) {
            explorer.selectNodeByPath(documentumPath);
            $window.document.title = 'Documentum:'+documentumPath;
        }

        $scope.test = function() {
            var documentumPath = $location.search().documentumPath;
            //console.log('documentumPath:',documentumPath);
            explorer.selectNodeByPath(documentumPath);

        }
    }
]);