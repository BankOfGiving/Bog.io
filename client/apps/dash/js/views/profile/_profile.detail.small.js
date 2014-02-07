define([ 'jquery', 'underscore', 'backbone', 'bog.i18n'
    , 'text!../../../tmpl/profile/_profile.detail.small.html'
], function ($, _, Backbone, i18n, ProfileTemplate) {
    return Backbone.View.extend({
        container: null,
        model: null,
        screenText: {
            labelName: 'Name',
            labelEmail: 'Email'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var self = this;

            var viewText = i18n.getViewText('_profile_detail_small');

            var compiledTemplate = _.template(ProfileTemplate, { profile: self.model.toJSON(), text: viewText })

            this.$el.empty();
            this.$el.append(compiledTemplate);

            return this;
        }
    });
});