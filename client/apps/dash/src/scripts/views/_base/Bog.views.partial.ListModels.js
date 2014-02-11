define([ 'jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    Bog.dash.views.partial = {
        ListModels: Backbone.View.extend({
            tagName: "table",
            itemView: null,
            initialize: function (args) {
                var self = this;

                if (args.collection === null || args.collection == 'undefined') {
                    throw ('Collection must be defined.');
                } else {
                    self.collection = args.collection;
                }

                if (args.itemView === null || args.itemView == 'undefined') {
                    throw ('Item View must be defined.');
                } else {
                    self.itemView = args.itemView;
                }

                if (args.el === null || args.el == 'undefined') {
                    throw ('EL must be defined.');
                } else {
                    self.el = args.el;
                }

                self.collection.bind("reset", this.render, this);
                self.collection.bind("add", this.render, this);
                self.collection.bind("remove", this.render, this);

                return this;
            },
            render: function () {
                var self = this;
                var els = [];
                this.$el.empty();
                this.collection.each(function (item) {
                    var itemView = new self.itemView({ model: item });
                    els.push(itemView.render().el);
                });
                this.$el.append($(this.template).append(els));
                return this;
            }
        })
    };
    return Bog.dash.views.partial.ListModels;
});