/**
 * Created by dbaxter on 12/1/13.
 */
define(['jquery', 'underscore', 'backbone', 'bog.site',
    'text!../../../tmpl/home/titlebar.v1.html'
], function ($, _, Backbone, site, titleBarTemplate) {
    return Backbone.View.extend({
        el: $('body'),
        render: function () {
            this.$el.append(titleBarTemplate);

            $('#main-titlebar-site-title').click(function () {
                window.location = '/';
            });

            $('#main-titlebar-account #Login').css('visibility', 'hidden');
            $('#main-titlebar-account #Account').css('visibility', 'visible').click(function () {
                window.location = '/admin';
            });

        }
    });
});