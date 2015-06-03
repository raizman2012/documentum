'use strict';

/**
 * Angular controller for 'tree_folder_toolbar_table' snippet
 */
angular.module('documentum').controller('ExplorerController', ['$scope', 'tree', 'selectable', 'sortable', 'documentum',
    function ($scope, tree, selectable, sortable, documentum) {
        var baseURL = "https://demo-server.trekflow.com:8443/dctm-rest/repositories/MyRepo";

        var documentumService = new documentum(baseURL);

        $scope.documentumService = documentumService;
        var provider = {
            isLeaf: function (entry) {

                if (entry.content === undefined) {
                    // root node
                    return false;
                }

                if (entry.content.properties.r_object_type == 'dm_cabinet'
                    || entry.content.properties.r_object_type == 'dm_folder') {
                    return false;
                } else {
                    return true;
                }
            },
            getUid: function (entry) {
                if (entry.content === undefined) {
                    // root node
                    return -1;
                }
                return entry.content.properties.r_object_id;
            },

            getChildren: function (entry, success, failure) {

                if (entry.links === undefined) {
                    // root node
                    documentumService.getCabinets(function (data) {
                        success(data.entries);
                    }, function (data) {
                        failure(data);
                    });
                } else  {

                    documentumService.getFolders(entry, function (data) {
                        success(data.entries);
                    }, function (data) {
                        failure(data);
                    });
                }

            }
        };


        $scope.treeFromData = new tree({}, provider, function(node) {
            node.sortableChildren = new sortable(node.children);
        });

        $scope.treeFromData.selectNode($scope.treeFromData.rootNode);
        $scope.treeFromData.expandNode($scope.treeFromData.rootNode);
    }
]);