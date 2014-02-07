/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.event'
], function ($, _, Backbone, event) {
    return Backbone.Collection.extend({
        model: event,
        urlRoot: 'events/',
        url: 'events/'
    });
});