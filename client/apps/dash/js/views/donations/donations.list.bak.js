define([ 'jquery','underscore','backbone',
    'collections/collection.donations',
    'text!../../../tmpl/donations/donations.list.all.html'
], function($, _, Backbone,
            DonationCollection,
            DonationTemplate){
    return Backbone.View.extend({
        collection: new DonationCollection(),
        screenText: {
            page: {
                title:"Donations",
                description: "Use the filters below to browse donations in your area."
            }
        },
        initialize: function(){
            var self = this;
            this.collection.bind("reset", this.render, this);
            this.collection.bind("add", this.render, this);
            this.collection.bind("remove", this.render, this);

            self.collection.fetch({
                success: function (donations) {
                    self.collection = donations;
                }
            });

            this.render();
        },
        render: function() {
            var self = this;
            var donations = self.collection;

            var pageText = self.screenText.page;
            $('#page-title').text(pageText.title);
            $('#page-description').text(pageText.description);

            self.$el.html(_.template(DonationTemplate, {donations: donations.models, _:_}));

            $('#donations-button-back').click(function(){
                console.log(window.location);
                window.location = '#/';
            });

            $('#donations-button-create').click(function(){
                window.location = '#/donations/add';
            });

            return this;
        }
    });
});