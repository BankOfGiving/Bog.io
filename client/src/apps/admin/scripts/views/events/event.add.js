define(['jquery', '../../../../../../.', 'backbone', 'models/model.event'],
    function ($, _, Backbone, EventModel, AddFormTemplate) {
        return Backbone.View.extend({
            el: $('body'),
            initialize: function () {
                var self = this;
                self.render();
                return this;
            },
            render: function () {
            }
        });
    });