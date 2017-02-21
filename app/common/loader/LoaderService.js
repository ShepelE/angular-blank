/**
 * Created by evgen on 18.09.15.
 */
(function () {
    'use strict';
    angular.module('loader.service', [
        'checkConnection.service',
        'string.config'
    ])
        .service("LoaderService", function ($ionicLoading, CheckConnectionService, STRING_CONFIG) {
            this.initLoader = function () {
                function Loader() {
                    return {
                        show: function () {
                            if(window.device) {
                                var _connection = CheckConnectionService.checkConnection();
                                if (_connection) {
                                    $ionicLoading.show({
                                        template: STRING_CONFIG.loading
                                    });
                                } else {
                                    $ionicLoading.hide();
                                    alert(STRING_CONFIG.disconnect);
                                    return false;
                                }
                            } else {
                                $ionicLoading.show({
                                    template: STRING_CONFIG.loading
                                });
                            }
                        },
                        hide: function () {
                            $ionicLoading.hide();
                        }
                    };
                }

                return new Loader();
            };
        });
}());