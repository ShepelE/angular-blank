/**
 * Created by evgen on 20.11.15.
 */
(function() {
    'use strict';
    angular.module('regexp.config', [])
        .constant("REGEXP_CONFIG", {
            numberWithTwoDigitsAfterDot:/^[0-9]*\.?[0-9]{0,2}$/,
            numberWithoutDot:/^[0-9]*$/
        });
}());