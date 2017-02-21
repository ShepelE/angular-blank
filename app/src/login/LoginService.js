/**
 * Created by evgen on 07.02.2017.
 */
(function () {
    'use strict';
    angular.module('login.service', [
        'LocalStorageModule'
    ])
        .service('LoginService', function ($http, $location, localStorageService) {
            this.login = function (user) {
                localStorageService.set('user', user);
                $http.defaults.headers.common["Authorization"] = user.password;
            };

            this.getUser = function () {
                localStorageService.get('user');
            };

            this.clearAllData = function () {
                localStorageService.clearAll();
                delete $http.defaults.headers.common.Authorization;
            };
        });
})();