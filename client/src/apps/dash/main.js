requirejs.config({
    baseUrl: '/dash/',
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

        async: '//cdnjs.cloudflare.com/ajax/libs/requirejs-async/0.1.1/async',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        bootstrap: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery',
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min',
        postal: '//cdnjs.cloudflare.com/ajax/libs/postal.js/0.8.5/postal',
        text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text',
        twitter_fetcher: '/lib/twitterFetcher_v10_min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        jqsteps: '/lib/jquery.steps.min',

        googlemaps: '//maps.googleapis.com/maps/api/js?key=AIzaSyCZjCOZHzKqlOAkBXr1HFrLtY84zVqWZxA&sensor=true'
    }, shim: {
        jquery: {
            exports: '$'
        }, 'bootstrap': {
            deps: [ 'jquery' ], exports: 'bs'
        }, 'underscore': {
            deps: [ 'jquery' ], exports: '_'
        }, 'backbone': {
            deps: [ 'underscore' ], exports: 'Backbone'
        }, 'bog': {
            deps: [ 'jquery', 'underscore', 'backbone' ], exports: 'bog'
        }
    }
});

require([ 'app' ], function (App) {
    var global_view_persistence = {};
    App.initialize();
});