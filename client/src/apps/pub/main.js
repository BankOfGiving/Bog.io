requirejs.config({
    baseUrl: '/',
    paths: {
        app: 'app',
        main: 'main',
        router: 'router',
        view_base: 'views/view-base',

        module_base: '/modules/module-base',

        bog: '/lib/bog/bog.pub.min',

        //async: '/lib/async/async',
        //async: '//cdnjs.cloudflare.com/ajax/libs/async/0.6.2/async',
        //text: '/lib/text/text',
        async: '//cdnjs.cloudflare.com/ajax/libs/requirejs-async/0.1.1/async.js',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        bootstrap: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery',
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min',
        postal: '//cdnjs.cloudflare.com/ajax/libs/postal.js/0.8.5/postal',
        text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text',
        underscorejs: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',

        googlemaps: '//maps.googleapis.com/maps/api/js?key=AIzaSyCZjCOZHzKqlOAkBXr1HFrLtY84zVqWZxA&sensor=true'
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