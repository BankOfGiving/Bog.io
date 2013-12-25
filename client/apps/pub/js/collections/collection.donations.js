/**
 * Created by dbaxter on 12/1/13.
 */
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