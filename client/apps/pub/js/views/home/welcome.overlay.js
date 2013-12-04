/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'blockui',
    'bog.site',
    'text!../../../tmpl/home/welcome.overlay.html'
], function($, _, Backbone, blockui, site, welcomeOverlayTemplate){
    return Backbone.View.extend({
        el: $('#page-content'),
        render: function() {
        console.log('overlay reder');
        $.blockUI({
            message: welcomeOverlayTemplate,
            fadeIn: 700,
            fadeOut: 700,
            // timeout: 2000,
            showOverlay: true,
            //centerY: true,
            css: {
                top:  ($(window).height() - 360) /2 + 'px',
                left: ($(window).width() - 360) /2 + 'px',
                width: '360px',
                right: '',
                border: 'none',
                padding: '5px',
                backgroundColor: '#000',
                '-webkit-border-radius': '25px',
                '-moz-border-radius': '25px',
                opacity: 1,
                color: '#fff',
                cursor: 'default'
            },
            overlayCSS:  {
                backgroundColor: '#000',
                opacity: 0.6,
                cursor: 'default'
            }
        });

            $("#welcome-menu-showall").click(function(){
                $.unblockUI();
            });

            $("#welcome-menu-showdonations").click(function(){
                window.location = "#/donations";
                site.transitionToSiteDefaultContainer();
                $.unblockUI();
            });

            $("#welcome-menu-showsolicitations").click(function(){
                window.location = "#/solicitations";
                site.transitionToSiteDefaultContainer();
                $.unblockUI();
            });

            $("#welcome-menu-showevents").click(function(){
                window.location = "#/events";
                site.transitionToSiteDefaultContainer();
                $.unblockUI();
            });

            $("#welcome-menu-login").click(function(){
                window.location = "#/login";
                site.transitionToSiteDefaultContainer();
                $.unblockUI();
            });
    }
    });
});