/**
 * Created by evgen on 12.11.15.
 */
(function () {
    'use strict';
    angular.module('checkConnection.service', [

    ])
        .service('CheckConnectionService', function () {
            this.checkConnection = function () {
                var networkState = navigator.network.connection.type;
                console.log('Network state: ', networkState);

                var states = {};
                states[Connection.UNKNOWN]  = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI]     = 'WiFi connection';
                states[Connection.CELL_2G]  = 'Cell 2G connection';
                states[Connection.CELL_3G]  = 'Cell 3G connection';
                states[Connection.CELL_4G]  = 'Cell 4G connection';
                states[Connection.NONE]     = 'No network connection';

                return networkState !== Connection.NONE;
            }
        });
})();