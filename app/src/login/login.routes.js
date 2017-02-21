/**
 * Created by evgen on 07.02.2017.
 */
(function () {
    'use strict';
    angular.module('login.routes', [
        'login'
    ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: "/login",
                    cache: false,
                    clear: true,
                    templateUrl: "src/login/login.html",
                    controller: 'LoginCtrl'
                });
        });
})();
