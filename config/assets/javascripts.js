module.exports = {

    dependencies: [{
        files: ['./public/lib/jquery/dist/jquery.min.js',
            './public/lib/bootstrap/dist/js/bootstrap.min.js',
            './public/lib/angular/angular.js',
            './public/lib/angular-animate/angular-animate.js',
            './public/lib/angular-route/angular-route.js',
            './public/lib/angular-bootstrap/ui-bootstrap.min.js',
            './public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './public/lib/angular-mocks/angular-mocks.js',
            './public/lib/angular-cookies/angular-cookies.js',
            './public/lib/angular-resource/angular-resource.min.js',
            './public/lib/angular-ui-router/release/angular-ui-router.min.js',
            './public/lib/angular-ui-utils/ui-utils.min.js',
            './public/lib/dotjem-angular-tree/dotjem-angular-tree.js',
            './public/lib/angular-translate/angular-translate.js',
            './public/lib/highlightjs/highlight.pack.js',
            './public/lib/angular-highlightjs/angular-highlightjs.min.js',
            './public/lib/lodash/lodash.min.js',
            './public/lib/postal/lib/postal.min.js',
            './public/lib/angular-dragdrop/src/angular-dragdrop.js',
            './public/lib/pdfjs-dist/build/pdf.js',
            './public/lib/angular-pdf/dist/angular-pdf.js',
            './public/lib/ng-puremodels/puremodels.js',
            './public/lib/jquery-ui/jquery-ui.js']
    }],

    library_src : [
        {file: './public/dev/module.js'},
        {dir: './public/dev/services/*.js'}
    ],

    src: [
        {files: ['./public/config.js', './public/application.js', './public/translations.js']},
        {dir: './public/modules/*/*.js'},
        {dir: './public/modules/*/*/*.js'},
    ],

    tests: [
        {dir: './public/dev/tests/*.js'}
    ]
}