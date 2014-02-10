define([
    'jquery',
    'underscore',
    'backbone',
    'bog.site',
    'bog.i18n',
    'text!../../../tmpl/home/main.v1.html'
], function ($, _, Backbone, site, i18n, mainTemplate) {
    return Backbone.View.extend({
        initialize: function () {
            var self = this;
        },
        render: function () {
            var self = this;

            self.$el.empty();

            self.$el.append(mainTemplate);

            return this;
        },
        localize: function () {
            i18n.localizeView(this.$el, 'admin_home');
        }
    });
});