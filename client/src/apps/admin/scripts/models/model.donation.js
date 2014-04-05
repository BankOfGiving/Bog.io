define(['jquery', 'under', 'backbone'], function ($, _, Backbone) {
    return Backbone.Model.extend({
        urlRoot: 'donations/'
    });
});