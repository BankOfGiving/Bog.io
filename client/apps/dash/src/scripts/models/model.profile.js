define(['jquery', 'underscore', 'backbone', 'modules/bog.api'], function ($, _, Backbone, api) {
    return Backbone.Model.extend({
        urlRoot: api.uri.profile,
        defaults: {
            isDirty: false
        },
        initialize: function () {
            // Dirty state handling
            this.on('change', this.markDirty);

        },
        markDirty: function (model, options) {
            if (!this.isDirty) {
                this.isDirty = true;
            }
        }
    });
});