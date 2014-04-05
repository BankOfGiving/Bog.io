define(['jquery', 'underscorejs', 'backbone'], function ($, _, Backbone) {
    return Backbone.Model.extend({
        urlRoot: 'donations/'
    });
});