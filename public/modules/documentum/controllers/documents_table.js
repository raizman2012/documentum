'use strict';

/**
 * Angular controller for 'documents_table' snippet
 */
angular.module('documentum').controller('DocumentsTableController', ['$scope', '$http', 'clientMockData',
    function ($scope, $http, clientMockData) {

        var dctmUser = "testuser";
        var dctmPassword = "dm123cloud";

        $scope.loading = false;
        $scope.currentPathAsArray = [];
        $scope.currentData = { entities : [] };
        $scope.currentFolder = { entities : [] };
        $scope.currentFile = undefined;
        $scope.currentError = undefined;

        var baseURL = "https://demo-server.trekflow.com:8443/dctm-rest/repositories/MyRepo";

        $scope.snippetId = 'documents_table';
        console.log($scope.snippetId + ' ok. data:', clientMockData.customers);

        $scope.start = function () {

            $scope.currentPathAsArray = [];
            $scope.getCabinets(function(data) {
                $scope.currentFolder = data;
            });
        }

        $scope.goInObject = function(entry) {

            var existingIndex = _.findIndex($scope.currentPathAsArray, function(entryInPath) {
                try {
                    return entry.content.properties.r_object_id === entryInPath.content.properties.r_object_id;
                } catch (e) {
                    return false;
                }
            });

            if (existingIndex === -1) {
                $scope.currentPathAsArray.push(entry);
            } else {
                $scope.currentPathAsArray = $scope.currentPathAsArray.slice(0, existingIndex+1);
            }

            if (entry.content.properties.r_object_type == 'dm_cabinet' || entry.content.properties.r_object_type == 'dm_folder') {
                $scope.dctmGET("/folders/"+entry.content.properties.r_object_id+'/objects?inline=true', function(data) {
                    $scope.currentFolder = data;
                    $scope.currentFile = undefined;
                });
            } else {
                $scope.currentFile = entry;
                $scope.currentFile.contentURIEncoded = undefined;
                $scope.getACSLink(entry.content.properties.r_object_id, function(data) {

                    for (var key in data.links) {
                        var link = data.links[key];
                        if (link.rel === "http://identifiers.emc.com/linkrel/content-media") {
                            $scope.currentFile.contentURIEncoded = encodeURI(link.href);
                            console.log(link.href);
                            //console.log($scope.currentFile.contentURIEncoded);
                        }
                    }
                });
            }


        };

        $scope.goToFolder = function(entry) {
            $scope.currentPathAsArray.push(entry);
        };

        $scope.getCabinets = function(onSuccess, onError) {
            $scope.dctmGET("/cabinets?inline=true", onSuccess, onError);
        };

        $scope.getACSLink = function getACSLink(objectId, onSuccess) {
            // fixme: get link properly from output
            var resPart = "/objects/"+objectId+"/contents/content?media-url-policy=ALL";
            $scope.dctmGET(resPart, onSuccess);
        };

        $scope.dctmGET = function (resource, onSuccess, onError) {
            $scope.loading = true;

            var aheader = 'Basic ' + btoa(dctmUser + ":" + dctmPassword);

            var url = baseURL + resource;
            $http.get(url, {
                headers: {
                    Authorization: aheader
                }
            }).success(function (data, status, headers, config) {
                console.log('data:', data);
                $scope.loading = false;
                $scope.currentData = data;
                if (onSuccess !== undefined) {
                    onSuccess(data);
                }

            }).
                error(function (data, status, headers, config) {
                    console.log('error:', data);
                    $scope.loading = false;
                    $scope.currentError = data;
                    if (onError !== undefined) {
                        onError(data);
                    }

                });
        }
    }
]);