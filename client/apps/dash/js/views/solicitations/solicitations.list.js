define([
    'jquery',
    'underscore',
    'backbone',
    'collections/collection.donations',
    'text!../../../tmpl/donations/donations.list.all.html'
], function($, _, Backbone, DonationCollection, DonationTemplate){
    return Backbone.View.extend({
        render: function(container) {
            var self = this;

            var donations = new DonationCollection();

            donations.fetch({
                success: function (donations) {
                    container.html(_.template(DonationTemplate, {donations: donations.models, _:_}));

                    $('#donations-button-back').click(function(){
                        console.log(window.location);
                        window.location = '#/';
                    });

                    $('#donations-button-create').click(function(){
                        window.location = '#/donations/add';
                    });
                }
            });
        }
    });
});