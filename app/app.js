/**
 * Created by evgen on 07.02.2017.
 */
(function () {
    'use strict';
    var __modules = [
        'ngResource',
        'ngCordova',
        'ui.router',
        'LocalStorageModule',
        'ionic',
        'templates',
        // custom
        'login.routes',
        'inAppPurchases.routes',
        '400handlers'
    ];

    angular
        .module('iap', __modules)
        .config(function ($urlRouterProvider, $compileProvider, $resourceProvider, $httpProvider, localStorageServiceProvider) {
            //default page when unknown ulr is entered
            $urlRouterProvider.otherwise("login");

            //prevent 'unsafe' addition for 'content://' img src
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|content|file):/);

            $resourceProvider.defaults.stripTrailingSlashes = false;
            $httpProvider.interceptors.push('400handlers');

            localStorageServiceProvider
                .setPrefix('iap');
        })
        .run(function ($http, $state, $rootScope, $stateParams, $cordovaStatusbar) {
            $state.go("login");

            document.addEventListener("deviceready", onDeviceReady, false);    // device APIs are available
            function onDeviceReady() {
                if (device.platform !== "Android") {
                    StatusBar.overlaysWebView(true);
                    //default value of this in lightContent, so need also to write this in config.xml
                    StatusBar.styleDefault();
                    //this makes statusbar independent from app - NOT under the header of app
                    $cordovaStatusbar.overlaysWebView(true);
                    //need this to prevent showing a black space under the login form while keyboard is appearing
                    cordova.plugins.Keyboard.disableScroll(true);
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
            }
        });
})();
