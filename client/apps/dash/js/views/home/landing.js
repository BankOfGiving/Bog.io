/**
 * Created by dbaxter on 12/1/13.
 */
define(['jquery', 'underscore', 'backbone', 'bog.site', 'bog.i18n'
    , 'text!../../../tmpl/home/landing.html'
], function ($, _, Backbone, site, i18n, LandingTemplate) {
    return Backbone.View.extend({
        initialize: function () {
            this.render().localize();
        },
        render: function () {
            this.$el.html(LandingTemplate);
            return this;
        },
        localize: function () {
            i18n.localizeView(this.$el, 'dash_landing');
        }
    });
});