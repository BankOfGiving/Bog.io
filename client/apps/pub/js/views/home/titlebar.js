/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'blockui',
    'bog.session',
    'bog.site',
    'text!../../../tmpl/home/titlebar.v1.html',
    'text!../../../tmpl/home/login.options.html'
], function($, _, Backbone, blockui, session, site, titleBarTemplate, loginOptionsTemplate){
    return Backbone.View.extend({
        el: $('body'),
        render: function() {
            this.$el.append(titleBarTemplate);

            $('#main-titlebar-site-title').click(function(){
                window.location = '/';
            });

            session.isAuthenticated(function(authenticated){
                if(authenticated){
                    showAuthenticated();
                }else{
                    showAnonymous();
                }
            });
        }
    });

    var authWindow;
    function LaunchAuth(){
        var uri = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port  + '/auth/fb/';
        authWindow = window.open(uri, "bog-auth-fb", "width=500,height=300");
        checkAuthComplete();
    }
    function checkAuthComplete()
    {
        if(authWindow.closed)
        {
            $.unblockUI();
            window.location.href = window.location.href;
        }
        else
        {
            setTimeout(function(){ checkAuthComplete(); }, 1000);
        }
    }

    function showAnonymous(){
        $('#main-titlebar-account > #Login').css('visibility', 'visible');
        $('#main-titlebar-account > #Account').css('visibility', 'hidden');
        $('#main-titlebar-account').click(function(){
            $.blockUI({
                message: loginOptionsTemplate,
                //message: null,
                // iframeSrc: "http://lptp-win-dev01:5000/auth/login/",
                // forceIframe: true,
                fadeIn: 700,
                fadeOut: 700,
                // timeout: 2000,
                showOverlay: true,
                centerY: true,
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
                },
                onBlock: function() {
                    $('.login-facebook').click(function(){
                        LaunchAuth();
                    });
                    $('.login-google').click(function(){
                        alert('GOOGLE!!');
                    });
                    $('.login-twitter').click(function(){
                        alert('TWITTER!!');
                    });
                }
            });
        });
    }

    function showAuthenticated(){
        $('#main-titlebar-account #Login').css('visibility', 'hidden');
        $('#main-titlebar-account #Account').css('visibility', 'visible').click(function(){
            window.location = '/dash';
        });
    }
});