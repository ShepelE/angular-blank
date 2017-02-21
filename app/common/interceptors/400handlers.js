/**
 * Created by evgen on 10.02.16.
 */
(function () {
    'use strict';
    angular.module('400handlers', [
        '400handlers.config',
        '400handlers.service'
    ])
        .factory('400handlers', function($q, $location, handlersService, HANDLERS400_CONFIG) {
            return {
                responseError: function(response) {
                    //check if we know this error or not...
                    for(var i = 0; i < HANDLERS400_CONFIG.length; i++) {
                        var _error = HANDLERS400_CONFIG[i];

                        if (response.status*1 === _error.status){
                            console.log(_error.status + ' inrerceptor is working');

                            //we need timer to avoid multiple allerts in a second
                            if (!handlersService.getSetting('timer') || Date.now() - handlersService.getSetting('timer') > 5000) {
                                if (_error.path) {
                                    $location.path(_error.path);
                                } else if (_error.message) {
                                    alert(_error.message);
                                }
                                handlersService.setSettings({timer:Date.now()});
                            }
                        }
                    }
                    return $q.reject(response);
                }
            };
        });
})();