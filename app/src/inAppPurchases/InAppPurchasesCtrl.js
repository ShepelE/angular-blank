/**
 * Created by evgen on 07.02.2017.
 */
(function () {
	'use strict';
	angular.module('inAppPurchases', [
		'ionicPopupWrapper.service'
	])
		.controller('InAppPurchasesCtrl', function ($scope, $state, $stateParams, $timeout, IonicPopupWrapperService) {
			var isBlockedSubmit = false;

			$scope.check = function (index) {
				var _checkedPurchase = _.find($scope.IAP, {checked: true});
				if (_checkedPurchase) {
					_checkedPurchase.checked = false;
				}
				$scope.IAP[index].checked = true;
			};

			$scope.submit = function () {
				// block submit button
				if (!isBlockedSubmit) {
					isBlockedSubmit = true;
					//need to find checked subscription
					var _activeSub = _.find($scope.IAP, {checked: true}); //it is already checked if any sub is checked

				}
				// unblock submit button in a second
				$timeout(function () {
					isBlockedSubmit = false;
				}, 1000);
			};
		});
})();
