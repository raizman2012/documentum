var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var names = require('./public/modules/documentum/snippets.json');

var dirForSnippets = './public/modules/documentum/';

function capitalizeFirstLetter(string) {
    //console.log(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    generateSamples : function() {
        console.log(names);

        var viewTemplate = fs.readFileSync(dirForSnippets+'sample_view.html.template', 'utf8');
        var controllerTemplate = fs.readFileSync(dirForSnippets+'sample_controller.js.template', 'utf8');

        var res = _.chain(names).keys().each(function(key) {
            var values = names[key];

            try {
                var dirName = dirForSnippets+key;
                //console.log(dirName);
                fs.mkdirSync(dirForSnippets+'/controllers/'+key);
                fs.mkdirSync(dirForSnippets+'/views/'+key);
            } catch(e) {
                if ( e.code != 'EEXIST' ) throw e;
            }


            _.each(values, function(v) {
                var reSampleName = new RegExp('sampleName', 'g');
                var controller = controllerTemplate.replace(reSampleName, v);

                var reSampleController= new RegExp('SampleController', 'g');

                var sampleController = _.map(v.split('_'), capitalizeFirstLetter).join('');
                sampleController += 'Controller';
                controller = controller.replace(reSampleController, sampleController);
                //console.log(controller);

                var view = viewTemplate.replace(reSampleController, sampleController);

                var sampleCategories = v.split('_').join(',');
                view = view.replace('SampleCategories', sampleCategories);

                //console.log(view);
                var jsFilename = dirForSnippets+'/controllers/'+key+'/'+v+'.js';
                if (fs.existsSync(jsFilename)) {
                    return;
                }
                fs.writeFile(jsFilename, controller, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                });
                fs.writeFile(dirForSnippets+'/views/'+key+'/'+v+'.html', view, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                });
            });

            return {

            }
        }).value();

        //console.log(res);
    }
}