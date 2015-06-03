'use strict';

var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var glob = require('glob');
var cheerio = require('cheerio');
var _ = require('underscore');
var config = require('./config');

module.exports = {

    // add rtl support
    addRtlCss: function (assets) {

        assets.public.rtl_css = {};
        assets.all.rtl_css = {};

        assets.public.ltr_css = {};
        assets.all.ltr_css = {};

        assets.public.cssjanus = [];
        assets.all.cssjanus = [];

        // run on public
        lodash.forEach(assets.public.css.all, function (cssFile) {
            if (cssFile.indexOf('_rtl.css') !== -1) {
                return;
            }
            var rtl_cssFile = cssFile.replace('.css', '_rtl.css');

            assets.public.rtl_css[cssFile] = rtl_cssFile;
            assets.public.ltr_css[cssFile] = cssFile;
            assets.public.cssjanus.push({'src': cssFile, 'dest': rtl_cssFile});
        });

        // run on not public
        lodash.forEach(assets.all.css.all, function (cssFile) {
            if (cssFile.indexOf('_rtl.css') !== -1) {
                return;
            }

            var rtl_cssFile = cssFile.replace('.css', '_rtl.css');
            assets.all.rtl_css[cssFile] = rtl_cssFile;
            assets.all.ltr_css[cssFile] = cssFile;
            assets.all.cssjanus.push({'src': cssFile, 'dest': rtl_cssFile});
        });

    }
}