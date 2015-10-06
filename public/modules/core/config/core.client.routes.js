'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('home', {
                url: '/',
                templateUrl: '/modules/core/views/home.client.view.html'
            }).
            state('explorer', {
                url: '/explorer',
                templateUrl: '/modules/documentum/views/explorer.client.view.html'
            }).
            state('viewer', {
                url: '/viewer',
                templateUrl: '/modules/documentum/views/viewer.client.view.html'
            }).
            state('viewerLocal', {
                url: '/viewer/:objectId',
                templateUrl: '/modules/documentum/views/viewer.client.view.html'
            }).
            state('editor', {
                url: '/editor/:objectId',
                templateUrl: '/modules/documentum/views/editor.client.view.html'
            });
    }
]);
