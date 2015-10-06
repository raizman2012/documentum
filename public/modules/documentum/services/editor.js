angular.module('documentum').service('editor', ['$location', 'async', 'selectable', 'sortable', 'documentum',
    function ($location, async, selectable, sortable, documentum) {
        console.log('in service editor');

        var maxLastDocumentsLength = 5;
        var lastDocuments = [];

        function addToLastDocuments(data) {

            var index = _.findIndex(lastDocuments, function(o) {
                return data.content.properties.r_object_id === o.content.properties.r_object_id;
            });

            if (index === -1) {
                lastDocuments.unshift(data);
                if (lastDocuments.length > maxLastDocumentsLength) {
                    lastDocuments.pop();
                }
            } else {
                // switch
                var tmp = lastDocuments[0];
                lastDocuments[0] = lastDocuments[index];
                lastDocuments[index] = tmp;
            }

        }

        // object to return
        var res = {};
        res.lastDocuments = lastDocuments;
        res.addToLastDocuments = addToLastDocuments;
        return res;
    }]);