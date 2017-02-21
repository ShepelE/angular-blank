/**
 * Created by evgen on 18.09.15.
 */
(function () {
    'use strict';
    angular.module('inputNumberValidation', [
        'regexp.config'
    ])
        .directive('inputNumberValidator', function (REGEXP_CONFIG) {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    element.bind("keypress", function (event) {
                        var ch;

                        function getChar(event) {
                            console.log('event.which',event.which);
                            console.log('event.charCode',event.charCode);
                            if (event.which !== 0 && event.charCode !== 0) {
                                if (event.which < 32) return null;
                                return String.fromCharCode(event.which);
                            }
                            return null;
                        }

                        ch = getChar(event);
                        var _futureValue = element[0].value + ch;
                        var __regexp;
                        if (attrs.inputNumberValidator) {
                            __regexp = REGEXP_CONFIG.numberWithTwoDigitsAfterDot;
                        } else {
                            __regexp = REGEXP_CONFIG.numberWithoutDot;
                        }
                        if(!__regexp.test(_futureValue)){
                            event.preventDefault();
                        }
                    });
                }
            };
        });
})();