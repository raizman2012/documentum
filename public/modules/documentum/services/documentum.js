angular.module('documentum').factory('documentum', ['$http', '$sce', function ($http, $sce) {
    var res = function (baseUrl) {

        var _this = this;

        var dctmUser = "testuser";
        var dctmPassword = "dm123cloud";


        _this.baseUrl = baseUrl;

        _this.loading = false;
        _this.currentPathAsArray = [];
        _this.currentData = {entities: []};
        _this.currentFolder = {entities: []};
        _this.currentFile = undefined;
        _this.currentError = undefined;

        _this.goInObject = function (entry) {

            var existingIndex = _.findIndex(_this.currentPathAsArray, function (entryInPath) {
                try {
                    return entry.content.properties.r_object_id === entryInPath.content.properties.r_object_id;
                } catch (e) {
                    return false;
                }
            });

            if (existingIndex === -1) {
                _this.currentPathAsArray.push(entry);
            } else {
                _this.currentPathAsArray = _this.currentPathAsArray.slice(0, existingIndex + 1);
            }

            if (entry.content.properties.r_object_type == 'dm_cabinet' || entry.content.properties.r_object_type == 'dm_folder') {
                _this.dctmGET("/folders/" + entry.content.properties.r_object_id + '/objects?inline=true', function (data) {
                    _this.currentFolder = data;
                    _this.currentFile = undefined;
                });
            } else {
                _this.currentFile = entry;
                _this.currentFile.contentURIEncoded = undefined;
                _this.getACSLink(entry.content.properties.r_object_id, function (data) {

                    for (var key in data.links) {
                        var link = data.links[key];
                        if (link.rel === "http://identifiers.emc.com/linkrel/content-media") {
                            _this.currentFile.contentURIEncoded = encodeURI(link.href);
                            _this.currentFile.trustedResourceUrl= $sce.trustAsResourceUrl(link.href);
                            _this.currentFile.trustedResourceUrlEncoded= encodeURI(_this.currentFile.trustedResourceUrl);

                            var officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+encodeURI(link.href);
                            _this.currentFile.viewOfficeUrl = $sce.trustAsResourceUrl(officeUrl);


                        }
                    }
                });
            }


        };

        _this.goToFolder = function (entry) {
            _this.currentPathAsArray.push(entry);
        };

        _this.getCabinets = function (onSuccess, onError) {
            _this.dctmGET("/cabinets?inline=true", onSuccess, onError);
        };

        _this.getFolders = function (entry, onSuccess, onError) {
            _this.dctmGET("/folders/" + entry.content.properties.r_object_id + '/objects?inline=true', onSuccess, onError);
        };

        _this.getUploadUrl = function(dctmCurrentFolderId) {
            return _this.baseUrl+'/folders/'+dctmCurrentFolderId+'/objects';
        };

        _this.getACSLink = function getACSLink(objectId, onSuccess, onError) {
            // fixme: get link properly from output
            var resPart = "/objects/" + objectId + "/contents/content";
            _this.dctmGET(resPart, onSuccess, onError);
        };

        _this.getObject = function getACSLink(objectId, onSuccess, onError) {

            var resPart = "/objects/" + objectId;
            _this.dctmGET(resPart, onSuccess, onError);
        };

        _this.getAuthorizationHeader = function() {
            var aheader = 'Basic ' + btoa(dctmUser + ":" + dctmPassword);
            return aheader;
        }

        _this.dctmGET = function (resource, onSuccess, onError) {
            _this.loading = true;

            var aheader = 'Basic ' + btoa(dctmUser + ":" + dctmPassword);

            var url = _this.baseUrl + resource;
            console.log('url:', url);
            $http.get(url, {
                headers: {
                    Authorization: aheader
                }
            }).success(function (data, status, headers, config) {
                console.log('data:', data);
                _this.loading = false;
                _this.currentData = data;
                if (onSuccess !== undefined) {
                    onSuccess(data);
                }

            }).
                error(function (data, status, headers, config) {
                    console.log('error:', data);
                    if (data == null) {
                        data = { msg : 'Can not get data from documentum service'}
                    }
                    _this.loading = false;
                    _this.currentError = data;
                    if (onError !== undefined) {
                        onError(data);
                    }

                });
        }
    }
    return res;
}]);