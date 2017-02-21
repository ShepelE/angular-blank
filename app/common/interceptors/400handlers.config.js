/**
 * Created by evgen on 29.06.16.
 */
(function () {
    'use strict';
    angular.module('400handlers.config', [])
        .constant("HANDLERS400_CONFIG", [
            {
                status:401,
                path:'login'
            },
            {//subscribe period ends
                status:426,
                path:'stripe/'
            },
            {//recommendation engine fails: 2 same recipes
                status:601,
                message:'core returned 2 same recipes'
            },
            {//add algorythm fails: 2 same recipes
                status:602,
                message:'algorythm chose 2 same recipes'
            },
            {//on lost connection
                status:-1,
                message:'Connection lost... Try later please!'
            }
        ]);
}());