define(['jquery', '../../../../../../.', 'backbone', 'bootstrap', 'moment', 'bog.site', 'bog.maps', 'bog.i18n', 'models/model.event', 'text!../../../tmpl/events/event.detail.html'],
    function ($, _, Backbone, bs, moment, site, maps, i18n, EventModel, DetailTemplate) {
        return Backbone.View.extend({
            siteText: i18n.getViewText('event_detail'),
            initialize: function () {
                var self = this;
                _.bindAll(this, 'cancel', 'edit', 'delete');

                self.model = new ContactModel({ id: self.id});
                self.model.fetch({
                    success: function (model) {
                        self.model = model;
                        self.render().localize();
                    }});
                return this;
            },
            render: function () {
                var self = this;

                self.$el.empty();

                _.template.formatDateTime = function (date) {
                    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
                };

                _.template.isPopulatedArray = function (o) {
                    console.log(o);
                    if (o) {
                        if ($.isArray(o)) {
                            if (o.length > 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                var compiledTemplate = _.template(DetailTemplate, { event: self.model.toJSON(), _: _ });
                self.$el.append(compiledTemplate);

//            var map = maps.addMapToCanvas(document.getElementById("small-map"), event.address.location[1], event.address.location[0], 16);
//            maps.createMarker(map, event);
                return this;
            },
            events: {
                "click #Edit-Button": "edit",
                "click #Cancel-Button": "cancel",
                "click #Delete-Button": "delete"
            },
            localize: function () {
                i18n.localizeView(this.$el, "event_detail");
            },
            cancel: function () {
                window.location.href = "#/events/";
            },
            edit: function () {
                window.location.href = "#/event/" + this.id + "/edit";
            },
            delete: function () {
                window.location.href = "#/event/" + this.id + "/delete";
            }
        });
    });