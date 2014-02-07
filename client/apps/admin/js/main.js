/**
 * Created by dbaxter on 12/1/13.
 */
requirejs.config({
    baseUrl: 'js/',
    paths: {
        async: 'lib/async',
        // async: '//cdnjs.cloudflare.com/ajax/libs/async/0.2.7/async.min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
        blockui: '//cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.66.0-2013.10.09/jquery.blockUI.min',
        bootstrap: '/admin/css/bootstrap/js/bootstrap.min',
        domReady: '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady',
        googlemaps: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZjCOZHzKqlOAkBXr1HFrLtY84zVqWZxA&sensor=true',
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min',
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min"
    }, shim: {
        jquery: {
            exports: '$'
        }, 'underscore': {
            deps: [ 'jquery' ], exports: '_'
        }, 'backbone': {
            deps: [ 'underscore' ], exports: 'Backbone'
        }, 'bootstrap': {
            deps: [ 'jquery' ], exports: 'bs'
        }
    }
});

require([ 'app' ], function (App) {
    App.initialize();
});