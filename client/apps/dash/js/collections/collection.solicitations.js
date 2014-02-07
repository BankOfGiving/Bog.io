/**
 * Created by dbaxter on 12/1/13.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/model.solicitation'
], function ($, _, Backbone, solicitation) {
    return Backbone.Collection.extend({
        model: solicitation,
        urlRoot: 'solicitations/',
        url: 'solicitations/'
    });
});