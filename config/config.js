'use strict';

module.exports = {
	library_name : 'documentum',
	library_distdir : './public/dist',
	app: {
		title: 'Documentum UI',
		description: 'Documentum UI',
		keywords: 'angular, node.js, documentum'
	},
	port: 3000,
	publicStaticContentDir : './public',
	assets : ['./assets/css.js', './assets/javascripts.js','./assets/less.js'],
	templateEngine: 'swig',

	templatesDir : 'public/'
};
