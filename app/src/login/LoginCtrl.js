/**
 * Created by evgen on 07.02.2017.
 */
(function () {
    'use strict';
    angular.module('login', [
        'login.service',
        'loader.service'
    ])
        .controller('LoginCtrl', function ($scope, $state, $cordovaKeyboard, $ionicPlatform, LoginService, LoaderService) {
            LoginService.clearAllData();
            var _loader = LoaderService.initLoader();
            _loader.hide();

            $ionicPlatform.ready(function () {
                if (window.cordova) {
                    $cordovaKeyboard.hideAccessoryBar(true);
                }
            });

            window.addEventListener('native.keyboardshow', keyboardShowHandler);
            function keyboardShowHandler(e){
                console.log('native keyboard show');
                var _inputs = document.getElementsByTagName('input');
                var _selects = document.getElementsByTagName('select');

                var _hide = true;
                for (var i = 0; i < _inputs.length; i++) {
                    if(_inputs[i] === document.activeElement) {
                        _hide = false;
                        break;
                    }
                }
                if (_hide) {
                    for (var i = 0; i < _selects.length; i++) {
                        if(_selects[i] === document.activeElement) {
                            _hide = false;
                            break;
                        }
                    }
                }
                if(cordova.plugins.Keyboard.isVisible && _hide){
                    document.activeElement.blur();
                    _inputs[0].focus();
                }
            }

            $scope.user = {};
            //clear previous error and try again
            $scope.login = function (loginForm) {
                if(loginForm.$valid) {
                    if($scope.user && $scope.user.error) {
                        delete $scope.user.error;
                    }
                    console.log('try to log in user: ', $scope.user);
                    LoginService.login($scope.user).then(_onSuccessLogin.bind(this, $scope.user.email), _onRejectLogin);
                }
            };
            //if success - choose state to go to
            function _onSuccessLogin (email, state) {
                console.log('Success authorization with login:|'+$scope.user.email+'| and password:|'+$scope.user.password+'|');
                $state.go('inAppPurchases');
            }
            //else - write an error
            function _onRejectLogin (errorObj) {
                console.log('Reject authorization with login:|'+$scope.user.email+'| and password:|'+$scope.user.password+'| : ', errorObj);
                if(!errorObj.status || errorObj.status===-1){
                    $scope.user.error = "No response from server";
                } else {
                    if (!errorObj.data.error) {
                        if(errorObj.status === 426) {
                            $scope.user.error = null;
                        }
                    } else {
                        $scope.user.error = errorObj.data.error.message;
                    }
                }
            }
        });
})();