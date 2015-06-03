'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'documentum.public';
    var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ngRoute', 'ngCookies', 'pdf', 'ui.router', 'ui.bootstrap', 'ui.utils', 'dotjem.angular.tree', 'hljs', 'pascalprecht.translate', 'ngDragDrop', 'ng-puremodels'];

    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();