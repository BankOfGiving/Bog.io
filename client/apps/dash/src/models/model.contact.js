define(['jquery', '../../../../.', 'backbone', 'modules/bog.api' ], function ($, _, Backbone, api) {
    return Backbone.Model.extend({
        urlRoot: 'donations/'
    });
});