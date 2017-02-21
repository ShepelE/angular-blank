/**
 * Created by evgen on 02.09.16.
 */
(function () {
    'use strict';
    angular.module('400handlers.service', [])
        .service('handlersService', function () {
            var _settings = {};

            this.getSetting = function (key) {
                return _settings[key];
            };
            this.setSettings = function (Obj) {
                if(typeof Obj === 'object') {
                    for (var key in Obj) {
                        if (Obj.hasOwnProperty(key)) {
                            _settings[key] = Obj[key];
                        }
                    }
                }
            };
        });
})();