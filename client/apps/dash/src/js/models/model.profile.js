define(['jquery', '../../../../../.', 'backbone'], function ($, _, Backbone) {
    return Backbone.Model.extend({
        urlRoot: 'profile/',
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