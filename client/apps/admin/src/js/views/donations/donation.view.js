define(['jquery', '../../../../../../.', 'backbone',
    'views/donations/_donation.display',
    'models/model.donation',
    'text!../../../tmpl/donations/donation.view.html',
    'text!../../../tmpl/shared/buttonbar.html'
], function ($, _, Backbone, DisplayView, DonationModel, ViewTemplate, ButtonBar) {
    return Backbone.View.extend({
        el: $('body'),
        container: null,
        model: null,
        modelId: null,
        initialize: function (container, id) {
            var self = this;
            self.container = container;
            self.id = id;

            _.bindAll(this, 'render', 'back', 'edit', 'delete');

            var donation = new DonationModel({id: id});
            donation.fetch({
                success: function (donation) {
                    self.model = donation;
                    self.render();
                }
            });
        },
        render: function () {
            var self = this;

            self.container.html(ViewTemplate);
            self.container.append(ButtonBar);

            $("div#ButtonBar > button.cancelButton").css("display", "none");
            $("div#ButtonBar > button.saveButton").css("display", "none");

            $("div#ButtonBar > button.backButton").css("display", "inline");
            $("div#ButtonBar > button.editButton").css("display", "inline");
            $("div#ButtonBar > button.deleteButton").css("display", "inline");
            return this;
        },
        events: {
            "click button.backButton": "back",
            "click button.cancelButton": "back",
            "click button.editButton": "edit",
            "click button.deleteButton": "delete"
        },
        back: function () {
            history.back();
        },
        edit: function () {
            window.location = '#/donations/edit/' + this.id;
        },
        delete: function () {
            window.location = '#/donations/delete/' + this.id;
        }
    });
});