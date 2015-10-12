angular.module('documentum').service('explorer',
    ['$location', 'FileUploader', 'async', 'tree', 'selectable', 'sortable', 'documentum',
        function ($location, FileUploader, async, tree, selectable, sortable, documentum) {
            console.log('in service explorer');

            // object to return
            var res = {};

            var baseURL = "https://demo-server.trekflow.com:8443/dctm-rest/repositories/MyRepo";
            res.asyncMessages = new async();

            var uploader = new FileUploader({
                url: ''
            });

            res.uploader = uploader;

            var documentumService = new documentum(baseURL);

            res.show = {};
            res.show.tree = true;
            res.show.treeAsTree = true;
            res.show.toolbar = true;
            res.show.path = true;
            res.show.upload = false;


            res.documentumService = documentumService;
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
                    } else {

                        documentumService.getFolders(entry, function (data) {
                            success(data.entries);
                        }, function (data) {
                            failure(data);
                        });
                    }

                }
            };


            // recursive
            res.selectNodeByPathAsync = function (parent, ids, index, comparator) {
                // search for matching child in parent

                var id2find = ids[index];
                console.log('id2find:', id2find);
                res.treeFromData.loadNodeChildrenAsync(parent, function () {
                    res.treeFromData.expandNode(parent);
                    console.log('parent.children.length:', parent.children.length);
                    for (var i = 0; i < parent.children.length; i++) {
                        var node = parent.children[i];

                        console.log('node.data.title:', node.data.title);
                        if (node.data.title === id2find) {
                            index++;
                            if (index === ids.length) {
                                // last ids
                                console.log('last');
                                if (!node.leaf) {
                                    res.selectNodeCustom(node);
                                } else {
                                    // do not select leaf, becouse it can open document in separate windows
                                }

                            } else {
                                // recursion
                                console.log('recursion');
                                res.selectNodeByPathAsync(node, ids, index, comparator);
                            }
                        }
                    }
                });
            };

            res.selectNodeByPath = function (idsAsString, comparator) {
                if (idsAsString === undefined) {
                    return;
                }
                var ids = idsAsString.split(',');

                console.log('ids:', ids);
                res.selectNodeByPathAsync(res.treeFromData.rootNode, ids, 0, comparator);
            };

            res.selectNodeCustom = function (node) {
                res.treeFromData.selectNodeAndLoadChildren(node);
                if (node.leaf) {
                    res.documentumService.goInObject(node.data);
                }

                var nodes = res.treeFromData.getNodesBySelectedPath();
                var path = '';

                // start from 1 becouse first node is root node
                for (var i = 1; i < nodes.length; i++) {
                    path += nodes[i].data.title;

                    if (i !== nodes.length - 1) {
                        path += ',';
                    }
                }

                if ($location.search().documentumPath !== path) {
                    $location.search('documentumPath', '' + path);
                }

            };

            res.treeFromData = new tree({}, provider, function (node) {
                node.sortableChildren = new sortable(node.children);
            });

            res.treeFromData.selectNode(res.treeFromData.rootNode);
            res.treeFromData.expandNode(res.treeFromData.rootNode);

            res.hideTree = function () {
                res.show.tree = false;
            }

            res.toggleTree = function () {
                res.show.tree = !res.show.tree;
            }

            res.toggleTreeFolders = function () {
                res.show.treeAsTree = !res.show.treeAsTree;
            }

            res.toggleUploadPanel = function () {
                res.show.upload = !res.show.upload;
            }

            res.selectParent = function (node) {
                var parentNode = res.treeFromData.getParent(res.treeFromData.getSelectedNode());
                //console.log('parentNode:',parentNode);
                res.treeFromData.selectNode(parentNode);
            }

            res.test = function () {
                res.messageId = res.asyncMessages.replaceAndDeleteAfterTimeout('upload', {
                    msg: 'uploaded',
                    type: 'success'
                }, 3);
            }
            // CALLBACKS

            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
                res.messageId = res.asyncMessages.replaceAndDeleteAfterTimeout('upload', {
                    msg: 'Adding failed',
                    type: 'failure'
                }, 6);
            };

            uploader.onAfterAddingFile = function (fileItem) {

                var props = {
                    properties: {
                        object_name: fileItem.file.name,
                        r_object_type: "dm_document"
                    }
                };

                console.log(props, documentumService.currentFolder);

                fileItem.url = documentumService.getUploadUrl(res.treeFromData.getSelectedNode().data.content.properties.r_object_id);
                fileItem.headers['Authorization'] = documentumService.getAuthorizationHeader();
                //console.info('onAfterAddingFile fileItem.formData:', fileItem.formData);
                fileItem.formData.push({"data": JSON.stringify(props)});
                fileItem.folderNode = res.treeFromData.getSelectedNode();
                console.info('onAfterAddingFile', fileItem);

            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function (item) {
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function (fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function (progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };

            uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };

            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
                if (fileItem !== undefined) {
                    fileItem.folderNode.children = undefined; // reload
                    res.treeFromData.loadNodeChildrenAsync(fileItem.folderNode);
                }


                console.log('status:', status);
                if (status === 403) {
                    console.log('status BAD:', status);
                    res.messageId = res.asyncMessages.replaceAndDeleteAfterTimeout('upload', {
                        msg: response.message,
                        type: 'failure'
                    }, 10);
                } else {
                    res.messageId = res.asyncMessages.replaceAndDeleteAfterTimeout('upload', {
                        msg: 'file uploaded',
                        type: 'success'
                    }, 5);
                }
            };

            uploader.onCompleteAll = function () {
                //res.messageId = res.asyncMessages.replaceAndDeleteAfterTimeout('upload', { msg : 'file uploaded', type: 'success'}, 3);
                res.show.upload = false;
                console.info('onCompleteAll');
            };


            return res;
        }]);

