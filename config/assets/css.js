module.exports = {
    dependencies: [
        {file: './public/lib/bootstrap/dist/css/bootstrap.css'},
        {file: './public/lib/font-awesome/css/font-awesome.css'},
        {file: './public/lib/highlightjs/styles/github.css'},
    ],

    src: [
        {dir: './public/css/*.css'},
        {dir: './public/generated_css/*.css'}
    ],

    generated_src: [
        {dir: './public/generated_css/*.css'}
    ],

    rtl_src: [
        {file: './public/lib/bootstrap/dist/css/bootstrap.css'},
        {dir: './public/css/*.css'},
        {dir: './public/generated_css/*.css'}
    ]
}