define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.donation'
], function ($, _, Backbone, donation) {
    return Backbone.Collection.extend({
        model: donation,
        urlRoot: 'donations/',
        url: 'donations/'
    });
});