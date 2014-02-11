define(['jquery', '../../../../../../.', 'backbone', 'bootstrap', 'moment', 'bog.site', 'models/model.donation', 'text!../../../tmpl/donations/donation.detail.html', 'bog.maps'
], function ($, _, Backbone, bs, moment, site, DonationModel, DetailTemplate, maps) {
    return Backbone.View.extend({
        siteText: {
            pageHeader: {
                title: "My Donations",
                description: "View and modify your existing Donations or create a news Donation starting with the form to the right."
            }
        },
        entityId: null,
        initialize: function (elId, entityId) {
            var self = this;
            self.el = elId;
            self.entityId = entityId;

            site.setPageHeader(self.siteText.pageHeader.title, self.siteText.pageHeader.description);
            site.setActiveNav("donations");

            var donation = new DonationModel({ id: self.entityId});
            donation.fetch({
                success: function (donation) {
                    self.model = donation;

                    self.render();
                }});

            return this;
        },
        render: function () {
            var self = this;

            var donation = self.model.toJSON();

            console.log(donation);

            self.$el.empty();

            _.template.formatDateTime = function (date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            };
            var compiledTemplate = _.template(DetailTemplate, { donation: donation, _: _ });
            self.$el.append(compiledTemplate);

            var map = maps.addMapToCanvas(document.getElementById("small-map"), donation.address.location[1], donation.address.location[0], 16);
            maps.createMarker(map, donation);
        },
        donations: {
            "click #Edit-Button": "edit",
            "click #Cancel-Button": "cancel",
            "click #Delete-Button": "delete"
        },
        cancel: function () {
            history.back();
        },
        edit: function () {
            window.location.href = "#/donation/edit/" + this.entityId;
        },
        delete: function () {
            window.location.href = "#/donation/delete/" + this.entityId;
        }
    });
});