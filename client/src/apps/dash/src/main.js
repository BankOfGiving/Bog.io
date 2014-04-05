requirejs.config({
    baseUrl: '/dash/',
    paths: {
        app: 'app',
        main: 'main',
        router: 'router',

        bog: '/lib/bog/bog.pub.min',
        module_base: 'modules/module-base',

        async: '/lib/async/async',
        bootstrap: '/lib/bootstrap/js/bootstrap.min',
        text: '/lib/text/text',

        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
        blockui: '//cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.66.0-2013.10.09/jquery.blockUI.min',
        domReady: '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady',
        googlemaps: '//maps.googleapis.com/maps/api/js?key=AIzaSyCZjCOZHzKqlOAkBXr1HFrLtY84zVqWZxA&sensor=true',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery',
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min',
        postal: '//cdnjs.cloudflare.com/ajax/libs/postal.js/0.8.5/postal',
        underscorejs: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min'
    }, shim: {
        jquery: {
            exports: '$'
        }, 'bootstrap': {
            deps: [ 'jquery' ], exports: 'bs'
        }, 'underscorejs': {
            deps: [ 'jquery' ], exports: '_'
        }, 'backbone': {
            deps: [ 'underscorejs' ], exports: 'Backbone'
        }, 'bog': {
            deps: [ 'jquery', 'googlemaps' ], exports: 'bog'
        }
    }
});

require([ 'app' ], function (App) {
    App.initialize();
});