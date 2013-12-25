/**
 * Created by dbaxter on 12/1/13.
 */
requirejs.config({
    baseUrl: 'js/',
    paths: {
        async: 'lib/async',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
        domReady: '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady',
        googlemaps: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZjCOZHzKqlOAkBXr1HFrLtY84zVqWZxA&sensor=true',
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
        blockui: "//cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.66.0-2013.10.09/jquery.blockUI.min",
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min"
    }, shim: {
        jquery: {
            exports: '$'
        }, 'underscore': {
            deps: [ 'jquery' ], exports: '_'
        }, 'backbone': {
            deps: [ 'underscore' ], exports: 'Backbone'
        }
    }
});

require([ 'app' ], function (App) {
    App.initialize();
});