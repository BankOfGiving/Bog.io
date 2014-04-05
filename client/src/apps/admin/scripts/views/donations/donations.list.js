define(['jquery', '../../../../../../.', 'backbone', 'modules/bog.site', 'collections/collection.donations', 'text!../../../templates/donations/donations.list.html'],
    function ($, _, Backbone, site, DonationCollection, DonationTemplate) {
        /*        return Backbone.View.extend({
         siteText: {
         pageHeader: {
         title: "My Donations",
         description: "View and modify your existing Donations or create a news Donation starting with the form to the right."
         }
         },
         initialize: function () {
         var self = this;

         var donations = new DonationCollection();
         donations.fetch({
         success: function (donations) {
         self.collection = donations;
         self.render();
         }});

         return this;
         },
         render: function () {
         var self = this;

         var donations = self.collection.toJSON();

         self.$el.empty();

         if (donations.length === 0) {
         self.$el.append(_.template(DonationTemplate, {donations: null, _: _}));
         } else {
         donations = sortByKey(donations, 'title');
         self.$el.append(_.template(DonationTemplate, {donations: donations[0].donations, _: _}));
         }

         site.setPageHeader(self.siteText.pageHeader.title, self.siteText.pageHeader.description);
         site.setActiveNav("donations");

         $('#donations-button-back').click(function () {
         console.log(window.location);
         window.location = '#/';
         });

         $('.addButton').click(function () {
         window.location = '#/donation/add';
         });
         }
         });

         function sortByKey(array, key) {
         return array.sort(function (a, b) {
         var x = a[key];
         var y = b[key];
         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
         });
         }*/
    });