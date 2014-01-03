/**
 * Created by dbaxter on 12/6/13.
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    Bog.dash.views.partial = {
        ListModel: Backbone.View.extend({
            tagName: "tr",
            render: function () {
                var data = {};
                if (this.model)
                    data = this.model.toJSON();
                var compiled = _.template(this.template, data);
                this.$el.append(compiled);
                return this;
            }
        })
    };
    return Bog.dash.views.partial.ListModel;
});