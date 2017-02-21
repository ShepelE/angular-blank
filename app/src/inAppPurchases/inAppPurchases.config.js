/**
 * Created by Konstantin Glushko on 15.11.16.
 */
(function () {
	'use strict';
	angular.module('inAppPurchases.config', [])
		.constant("IN_APP_PURCHASES",
			{
				iOS: [
				]
			}
		)
		.constant("IN_APP_PURCHASES_STRINGS", {
			errorTitle: 'Something went wrong',
			loading: 'Loading Products...',
			purchasing: 'Purchasing...',
			productError: 'Products don\'t exist',
			platformError: 'The platform isn\'t Android or iOS. You can\'t load products',
			selectProduct: 'Please, select one of products',
			successPurchase: 'Purchase was successful!',
			restorePurchases: 'Purchases history wasn\'t restore',
			hasActiveSubscriptions: 'You already have an active subscription',
			noActiveSubscriptions: 'You don\'t have an active subscription',
			cancelSubscription: 'Subscription now is canceled'
		});
}());
