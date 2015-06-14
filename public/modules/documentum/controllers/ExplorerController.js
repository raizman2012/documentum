'use strict';

/**
 * Angular controller for 'tree_folder_toolbar_table' snippet
 */
angular.module('documentum').controller('ExplorerController', ['$scope', 'FileUploader', 'async', 'tree', 'selectable',
    'sortable', 'documentum', 'explorer',
    function ($scope, FileUploader, async, tree, selectable, sortable, documentum, explorer) {

        explorer.hello();

        var baseURL = "https://demo-server.trekflow.com:8443/dctm-rest/repositories/MyRepo";
        $scope.asyncMessages = new async();

        var uploader = new FileUploader({
            url : ''
        });

        $scope.uploader = uploader;

        var documentumService = new documentum(baseURL);


        $scope.showTree = true;
        $scope.showTreeAsTree = true;
        $scope.showToolbar = true;
        $scope.showPath = true;
        $scope.showUpload = false;


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


        $scope.selectNodeCustom = function(node) {
            $scope.treeFromData.selectNodeAndLoadChildren(node);
            if (node.leaf) {
                $scope.documentumService.goInObject(node.data);
            }
        };

        $scope.treeFromData = new tree({}, provider, function(node) {
            node.sortableChildren = new sortable(node.children);
        });

        $scope.treeFromData.selectNode($scope.treeFromData.rootNode);
        $scope.treeFromData.expandNode($scope.treeFromData.rootNode);

        $scope.hideTree = function() {
            $scope.showTree = false;
        }
        $scope.toggleTree = function() {
            $scope.showTree = !$scope.showTree;
        }
        $scope.toggleTreeFolders = function() {
            $scope.showTreeAsTree = !$scope.showTreeAsTree;
        }

        $scope.toggleUploadPanel = function() {
            $scope.showUpload = !$scope.showUpload;
        }

        $scope.selectParent = function(node) {
            var parentNode = $scope.treeFromData.getParent($scope.treeFromData.getSelectedNode());
            //console.log('parentNode:',parentNode);
            $scope.treeFromData.selectNode(parentNode);
        }

        $scope.test = function() {
            $scope.messageId = $scope.asyncMessages.replaceAndDeleteAfterTimeout('upload', { msg : 'uploaded', type: 'success'}, 3);
        }
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
            $scope.messageId = $scope.asyncMessages.replaceAndDeleteAfterTimeout('upload', { msg : 'Adding failed', type: 'failure'}, 6);
        };

        uploader.onAfterAddingFile = function(fileItem) {

            var props = { properties:
            { object_name: fileItem.file.name,
                r_object_type: "dm_document"}
            };

            console.log(props, documentumService.currentFolder);

            fileItem.url = documentumService.getUploadUrl($scope.treeFromData.getSelectedNode().data.content.properties.r_object_id);
            fileItem.headers['Authorization'] = documentumService.getAuthorizationHeader();
            //console.info('onAfterAddingFile fileItem.formData:', fileItem.formData);
            fileItem.formData.push({"data" : JSON.stringify(props)});
            fileItem.folderNode = $scope.treeFromData.getSelectedNode();
            console.info('onAfterAddingFile', fileItem);

        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            if (fileItem !== undefined) {
                fileItem.folderNode.children = undefined; // reload
                $scope.treeFromData.loadNodeChildrenAsync(fileItem.folderNode);
            }


            console.log('status:', status);
            if (status === 403) {
                console.log('status BAD:', status);
                $scope.messageId = $scope.asyncMessages.replaceAndDeleteAfterTimeout('upload', { msg : response.message, type: 'failure'}, 10);
            } else {
                $scope.messageId = $scope.asyncMessages.replaceAndDeleteAfterTimeout('upload', { msg : 'file uploaded', type: 'success'}, 5);
            }
        };

        uploader.onCompleteAll = function() {
            //$scope.messageId = $scope.asyncMessages.replaceAndDeleteAfterTimeout('upload', { msg : 'file uploaded', type: 'success'}, 3);
            $scope.showUpload = false;
            console.info('onCompleteAll');
        };
    }
]);