'use strict';

/**
 * Angular controller for 'tree_folder_toolbar_table' snippet
 */
angular.module('documentum').controller('EditorController', ['$scope', 'explorer', 'editor', '$stateParams', '$location', '$window', '$routeParams',
    function ($scope, explorer, editor, $stateParams, $location, $window) {
        console.log('in controller EditorController');

        angular.extend($scope, editor);

        console.log('$stateParams:', $stateParams);

        var objectId = $stateParams.objectId;
        if (objectId !== undefined) {
            if (explorer.treeFromData.getSelectedNode() !== undefined) {
                var nodes = explorer.treeFromData.getSelectedNode().children;
                var index = _.findIndex(nodes, function(node) {
                    return objectId === node.data.content.properties.r_object_id;
                });
                console.log('index:', index);
                if (index !== -1) {
                    var data = nodes[index].data;
                    editor.addToLastDocuments(data);
                }
            }

        }

        //explorer
        $scope.$on('$locationChangeStart', function (event) {
            console.log('here in EditorController, $locationChangeStart', $location.path(), '', $location.search());
        });
    }]);