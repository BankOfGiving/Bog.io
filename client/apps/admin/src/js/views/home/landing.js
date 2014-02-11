define([
    'jquery',
    '../../../../../../.',
    'backbone',
    'bog.site',
    'bog.i18n',
    'text!../../../tmpl/home/landing.html'
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
            i18n.localizeView(this.$el, 'admin_landing');
        }
    });
});