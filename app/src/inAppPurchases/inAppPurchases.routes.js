/**
 * Created by evgen on 07.02.2017.
 */
(function () {
    'use strict';
    angular.module('inAppPurchases.routes', [
        'inAppPurchases'
    ])
        .config(function ($stateProvider) {
            $stateProvider
                .state('inAppPurchases', {
                    url: "/inAppPurchases",
                    cache: false,
                    clear: true,
                    templateUrl: "src/inAppPurchases/inAppPurchases.html",
                    controller: 'InAppPurchasesCtrl'
                });
        });
})();
